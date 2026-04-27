import { authAtom } from "@/apps/auth/atoms/auth-atom.ts";
import type { LocaleCode } from "@/shared/types/global.ts";
import axios, { type AxiosResponse } from "axios";
import { cache } from "smart-cache-ts";
import { BASEURL, CACHE_KEYS, DEFAULT_LOCALE_CODE } from "./flags.ts";

export const endpoint = axios.create({
  baseURL: BASEURL,
  // withCredentials: true,
  // headers: {
  //   "Accept-Language": cache.get(localeCodeCacheKey) || defaultLocaleCode,
  // },
});

endpoint.interceptors.request.use(
  (config) => {
    // Accept-Language Header
    config.headers["Accept-Language"] =
      cache.get<LocaleCode>(CACHE_KEYS.LOCALE_CODE) || DEFAULT_LOCALE_CODE;

    return config;
  },
  (error) => Promise.reject(error),
);

endpoint.interceptors.response.use(
  (response) => response,
  (error) => {
    const response: AxiosResponse | undefined = error.response;

    if (response?.data?.status_code === 401) {
      authAtom.change("user", null);
    }

    return Promise.reject(error);
  },
);
