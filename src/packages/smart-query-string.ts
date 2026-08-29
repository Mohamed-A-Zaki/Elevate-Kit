/**
 * A lightweight TypeScript utility replicating the behavior of the "query-string" npm package.
 */

export type ArrayFormat = "none" | "bracket" | "index" | "comma";

export interface ParseOptions {
  decode?: boolean;
  arrayFormat?: ArrayFormat;
}

export interface StringifyOptions {
  encode?: boolean;
  arrayFormat?: ArrayFormat;
  skipNull?: boolean;
  skipEmptyString?: boolean;
}

export type QueryPrimitive = string | number | boolean;
export type QueryValue = QueryPrimitive | null | undefined | QueryPrimitive[];
export type QueryObject = Record<string, QueryValue>;

const BRACKET_KEY_RE = /^(.+)\[(\d*)\]$/;

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function assertBrowserEnv(fn: string, needsHistory = false): void {
  if (typeof window === "undefined" || typeof window.location === "undefined") {
    throw new Error(
      `queryString.${fn}() can only be used in a browser environment.`,
    );
  }
  if (needsHistory && typeof window.history === "undefined") {
    throw new Error(
      `queryString.${fn}() can only be used in a browser environment.`,
    );
  }
}

function currentPath(): string {
  return window.location.origin + window.location.pathname;
}

function replaceUrl(url: string): void {
  window.history.replaceState(null, "", url);
}

/** Merges a decoded key/value pair into the accumulating result object. */
function assignEntry(
  result: QueryObject,
  key: string,
  value: string,
  arrayFormat: ArrayFormat,
): void {
  if (arrayFormat === "comma" && value.includes(",")) {
    result[key] = value.split(",");
    return;
  }

  const bracketMatch = key.match(BRACKET_KEY_RE);
  if (bracketMatch) {
    const [, name, index] = bracketMatch;
    const arr = (result[name] as string[] | undefined) ?? [];
    if (index) {
      arr[parseInt(index, 10)] = value;
    } else {
      arr.push(value);
    }
    result[name] = arr;
    return;
  }

  const existing = result[key];
  if (existing === undefined) {
    result[key] = value;
  } else if (Array.isArray(existing)) {
    existing.push(value);
  } else {
    result[key] = [existing as QueryPrimitive, value];
  }
}

function serializeValue(
  key: string,
  value: QueryValue,
  arrayFormat: ArrayFormat,
  encode: (s: string) => string,
): string[] {
  if (!Array.isArray(value)) {
    return [`${key}=${encode(String(value))}`];
  }

  switch (arrayFormat) {
    case "bracket":
      return value.map((v) => `${key}[]=${encode(String(v))}`);
    case "index":
      return value.map((v, i) => `${key}[${i}]=${encode(String(v))}`);
    case "comma":
      return [`${key}=${encode(value.join(","))}`];
    case "none":
    default:
      return value.map((v) => `${key}=${encode(String(v))}`);
  }
}

// ---------------------------------------------------------------------------
// Core parse / stringify
// ---------------------------------------------------------------------------

function parse(query: string, options: ParseOptions = {}): QueryObject {
  const { decode = true, arrayFormat = "none" } = options;
  const queryString = query.startsWith("?") ? query.slice(1) : query;
  if (!queryString.trim()) return {};

  const result: QueryObject = {};
  const params = new URLSearchParams(queryString);

  params.forEach((rawValue, rawKey) => {
    const key = decode ? decodeURIComponent(rawKey) : rawKey;
    const value = decode ? decodeURIComponent(rawValue) : rawValue;
    assignEntry(result, key, value, arrayFormat);
  });

  return result;
}

function stringify(obj: QueryObject, options: StringifyOptions = {}): string {
  const {
    encode = true,
    arrayFormat = "none",
    skipNull = true,
    skipEmptyString = true,
  } = options;
  const encodeValue = encode ? encodeURIComponent : (s: string) => s;

  const parts: string[] = [];

  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (value == null && skipNull) continue;
    if (value === "" && skipEmptyString) continue;

    const encodedKey = encodeValue(key);
    parts.push(...serializeValue(encodedKey, value, arrayFormat, encodeValue));
  }

  return parts.join("&");
}

function parseUrl(
  url: string,
  options?: ParseOptions,
): { url: string; query: QueryObject } {
  const [base, query = ""] = url.split("?");
  return { url: base, query: parse(query, options) };
}

function stringifyUrl(
  input: { url: string; query?: QueryObject },
  options?: StringifyOptions,
): string {
  const { url, query = {} } = input;
  const queryString = stringify(query, options);
  return queryString ? `${url}?${queryString}` : url;
}

// ---------------------------------------------------------------------------
// Browser-only helpers (read/write window.location)
// ---------------------------------------------------------------------------

function get(options?: ParseOptions): QueryObject {
  assertBrowserEnv("get");
  return parse(window.location.search || "", options);
}

function set(query: QueryObject, options?: StringifyOptions): void {
  assertBrowserEnv("set", true);
  const queryString = stringify(query, options);
  replaceUrl(queryString ? `${currentPath()}?${queryString}` : currentPath());
}

function update(updates: QueryObject, options?: StringifyOptions): void {
  assertBrowserEnv("update", true);
  set({ ...get(), ...updates }, options);
}

function remove(): void {
  assertBrowserEnv("remove", true);
  replaceUrl(currentPath());
}

function removeKeys(keys: string[], options?: StringifyOptions): void {
  assertBrowserEnv("removeKeys", true);
  const current = get();
  for (const key of keys) delete current[key];
  set(current, options);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export const queryString = {
  parse,
  stringify,
  parseUrl,
  stringifyUrl,
  get,
  set,
  update,
  remove,
  removeKeys,
};
