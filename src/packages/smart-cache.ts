type CacheOptions = {
  /** Time to live, in milliseconds. */
  ttl?: number;
};

type CacheItem<T> = {
  value: T;
  expiry?: number;
};

export type CacheConfig = {
  /** Prepended to every key this cache reads/writes. @default "" */
  prefix?: string;
};

let prefix = "";

function isBrowserEnv(): boolean {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

function assertBrowserEnv(fn: string): void {
  if (!isBrowserEnv()) {
    throw new Error(`cache.${fn}() can only be used in a browser environment.`);
  }
}

function prefixedKey(key: string): string {
  return prefix ? `${prefix}${key}` : key;
}

function readItem<T>(key: string): CacheItem<T> | null {
  const raw = localStorage.getItem(prefixedKey(key));
  if (!raw) return null;

  try {
    return JSON.parse(raw) as CacheItem<T>;
  } catch {
    return null;
  }
}

function isExpired(item: CacheItem<unknown>): boolean {
  return item.expiry !== undefined && Date.now() > item.expiry;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

function configure(config: CacheConfig): void {
  prefix = config.prefix ?? "";
}

function set<T>(key: string, value: T, options?: CacheOptions): void {
  assertBrowserEnv("set");
  const item: CacheItem<T> = {
    value,
    expiry: options?.ttl ? Date.now() + options.ttl : undefined,
  };

  try {
    localStorage.setItem(prefixedKey(key), JSON.stringify(item));
  } catch {
    // localStorage can throw (quota exceeded, private-mode restrictions, etc).
    // Caching is best-effort, so fail silently rather than crash the caller.
  }
}

function get<T>(key: string): T | null {
  assertBrowserEnv("get");
  const item = readItem<T>(key);
  if (!item) return null;

  if (isExpired(item)) {
    localStorage.removeItem(prefixedKey(key));
    return null;
  }

  return item.value;
}

function remove(key: string): void {
  assertBrowserEnv("remove");
  localStorage.removeItem(prefixedKey(key));
}

/**
 * Clears this cache's keys — every key under `prefix` when one is set,
 * otherwise all of `localStorage`.
 */
function clear(): void {
  assertBrowserEnv("clear");

  if (!prefix) {
    localStorage.clear();
    return;
  }

  for (let i = localStorage.length - 1; i >= 0; i--) {
    const storedKey = localStorage.key(i);
    if (storedKey?.startsWith(prefix)) {
      localStorage.removeItem(storedKey);
    }
  }
}

function has(key: string): boolean {
  return get(key) !== null;
}

export const smart_cache = {
  /** Sets the key prefix applied globally to every cache read/write. */
  configure,
  set,
  get,
  remove,
  clear,
  has,
};
