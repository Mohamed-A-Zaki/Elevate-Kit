type CacheOptions = {
  ttl?: number; // time to live in milliseconds
};

type CacheItem<T> = {
  value: T;
  expiry?: number;
};

export const cache = {
  set<T>(key: string, value: T, options?: CacheOptions) {
    const item: CacheItem<T> = {
      value,
      expiry: options?.ttl ? Date.now() + options.ttl : undefined,
    };
    localStorage.setItem(key, JSON.stringify(item));
  },

  get<T>(key: string): T | null {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    try {
      const item: CacheItem<T> = JSON.parse(raw);

      // check expiry
      if (item.expiry && Date.now() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }

      return item.value;
    } catch {
      return null;
    }
  },

  remove(key: string) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },

  has(key: string): boolean {
    return this.get(key) !== null;
  },
};
