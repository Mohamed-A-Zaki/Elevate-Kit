import axios, { type AxiosResponse } from "axios";
import { cache } from "smart-cache-ts";
import { authAtom } from "../atoms/app/auth-atom.ts";
import { baseUrl, defaultLocaleCode, localeCodeCacheKey } from "./flags.ts";

export const endpoint = axios.create({
  baseURL: baseUrl,
  // withCredentials: true,
  // headers: {
  //   "Accept-Language": cache.get(localeCodeCacheKey) || defaultLocaleCode,
  // },
});

endpoint.interceptors.request.use(
  (config) => {
    // Accept-Language Header
    config.headers["Accept-Language"] =
      cache.get(localeCodeCacheKey) || defaultLocaleCode;

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
