import { authAtom } from "@/modules/auth/atoms/auth-atom";
import {
  BASEURL,
  CACHE_KEYS,
  DEFAULT_LOCALE_CODE,
} from "@/shared/configurations";
import { cache } from "@/shared/packages/cache/cache";
import type { LocaleCode } from "@/shared/types/global";
import axios, { type AxiosResponse } from "axios";

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
