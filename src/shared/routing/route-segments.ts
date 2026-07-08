import { URLS } from "./urls";

// Strip leading slash so URLS paths map 1:1 to React Router `path` props.
const routeSegment = (path: string) => path.replace(/^\//, "");

/**
 * Recursively mirrors a URLS-like object, converting every string leaf into
 * a router-relative segment via `routeSegment`. Function leaves (e.g. path
 * builders like `blogDetailsPath`) are dropped since they aren't route
 * definitions. Nested objects (e.g. `auth`) are walked recursively.
 */
type RouteSegmentsOf<T> = {
  [K in keyof T as T[K] extends (...args: never[]) => unknown
    ? never
    : K]: T[K] extends string
    ? string
    : T[K] extends Record<string, unknown>
      ? RouteSegmentsOf<T[K]>
      : never;
};

function toRouteSegments<T extends Record<string, unknown>>(
  obj: T,
): RouteSegmentsOf<T> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "function") continue;

    result[key] =
      typeof value === "string"
        ? routeSegment(value)
        : toRouteSegments(value as Record<string, unknown>);
  }

  return result as RouteSegmentsOf<T>;
}

// `home` ("/") is intentionally excluded — it's the index route, not a
// nameable segment — matching the original ROUTE_SEGMENTS shape.
const { home: _home, ...routableUrls } = URLS;

export const ROUTE_SEGMENTS = toRouteSegments(routableUrls);
