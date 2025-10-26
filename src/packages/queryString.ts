/**
 * A lightweight TypeScript utility replicating the behavior of the "query-string" npm package.
 */

export interface ParseOptions {
  decode?: boolean;
  arrayFormat?: "none" | "bracket" | "index" | "comma";
}

export interface StringifyOptions {
  encode?: boolean;
  arrayFormat?: "none" | "bracket" | "index" | "comma";
  skipNull?: boolean;
  skipEmptyString?: boolean;
}

export type QueryValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | (string | number | boolean)[];

export type QueryObject = Record<string, QueryValue>;

function parse(query: string, options: ParseOptions = {}): QueryObject {
  const { decode = true, arrayFormat = "none" } = options;
  const queryString = query.startsWith("?") ? query.slice(1) : query;
  if (!queryString.trim()) return {};

  const params = new URLSearchParams(queryString);
  const result: QueryObject = {};

  params.forEach((value, key) => {
    const decodedKey = decode ? decodeURIComponent(key) : key;
    const decodedValue = decode ? decodeURIComponent(value) : value;

    if (arrayFormat === "comma" && decodedValue.includes(",")) {
      result[decodedKey] = decodedValue.split(",");
      return;
    }

    const bracketMatch = decodedKey.match(/(.+)\[(\d*)\]$/);
    if (bracketMatch) {
      const [, name, index] = bracketMatch;
      if (!result[name]) result[name] = [];
      if (index) {
        (result[name] as any[])[parseInt(index, 10)] = decodedValue;
      } else {
        (result[name] as any[]).push(decodedValue);
      }
      return;
    }

    if (result[decodedKey] !== undefined) {
      if (Array.isArray(result[decodedKey])) {
        (result[decodedKey] as any[]).push(decodedValue);
      } else {
        result[decodedKey] = [result[decodedKey] as string, decodedValue];
      }
    } else {
      result[decodedKey] = decodedValue;
    }
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

  const encodeValue = (val: string) => (encode ? encodeURIComponent(val) : val);

  const parts: string[] = [];

  for (const key in obj) {
    const value = obj[key];
    if (value == null && skipNull) continue;
    if (value === "" && skipEmptyString) continue;

    const encodedKey = encodeValue(key);

    if (Array.isArray(value)) {
      switch (arrayFormat) {
        case "bracket":
          value.forEach((v) =>
            parts.push(`${encodedKey}[]=${encodeValue(String(v))}`),
          );
          break;
        case "index":
          value.forEach((v, i) =>
            parts.push(`${encodedKey}[${i}]=${encodeValue(String(v))}`),
          );
          break;
        case "comma":
          parts.push(`${encodedKey}=${encodeValue(value.join(","))}`);
          break;
        default:
          value.forEach((v) =>
            parts.push(`${encodedKey}=${encodeValue(String(v))}`),
          );
      }
    } else {
      parts.push(`${encodedKey}=${encodeValue(String(value))}`);
    }
  }

  return parts.join("&");
}

function parseUrl(
  url: string,
  options?: ParseOptions,
): { url: string; query: QueryObject } {
  const [base, query] = url.split("?");
  return { url: base, query: parse(query || "", options) };
}

function stringifyUrl(
  input: { url: string; query?: QueryObject },
  options?: StringifyOptions,
): string {
  const { url, query = {} } = input;
  const queryString = stringify(query, options);
  return queryString ? `${url}?${queryString}` : url;
}

function get(options?: ParseOptions): QueryObject {
  if (typeof window === "undefined" || typeof window.location === "undefined") {
    throw new Error(
      "queryString.get() can only be used in a browser environment.",
    );
  }
  return parse(window.location.search || "", options);
}

function set(query: QueryObject, options?: StringifyOptions): void {
  if (typeof window === "undefined" || typeof window.history === "undefined") {
    throw new Error(
      "queryString.set() can only be used in a browser environment.",
    );
  }
  const currentUrl = window.location.origin + window.location.pathname;
  const queryString = stringify(query, options);
  const newUrl = queryString ? `${currentUrl}?${queryString}` : currentUrl;
  window.history.replaceState(null, "", newUrl);
}

function update(updates: QueryObject, options?: StringifyOptions): void {
  const current = get();
  const merged = { ...current, ...updates };
  set(merged, options);
}

function remove(): void {
  if (typeof window === "undefined" || typeof window.history === "undefined") {
    throw new Error(
      "queryString.remove() can only be used in a browser environment.",
    );
  }
  const newUrl = window.location.origin + window.location.pathname;
  window.history.replaceState(null, "", newUrl);
}

function removeKeys(keys: string[], options?: StringifyOptions): void {
  const current = get();
  for (const key of keys) delete current[key];
  set(current, options);
}

/**
 * ✅ Exported unified object API
 */
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
