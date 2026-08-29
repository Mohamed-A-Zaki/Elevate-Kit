import { authAtom } from "@/modules/auth/atoms/auth-atom";
import { smart_cache } from "@/packages/smart-cache";
import axios, { type AxiosResponse } from "axios";
import { BASEURL, CACHE_KEYS, DEFAULT_LOCALE_CODE } from "../constants";

export const endpoint = axios.create({
  baseURL: BASEURL,
  // withCredentials: true,
  headers: {
    "Accept-Language":
      smart_cache.get(CACHE_KEYS.LOCALE_CODE) || DEFAULT_LOCALE_CODE,
    Authorization: `Bearer ${smart_cache.get("token")}`,
  },
});

// endpoint.interceptors.request.use(
//   (config) => {
//     const token = cache.get("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // Accept-Language Header
//     config.headers["Accept-Language"] =
//       cache.get<LocaleCode>(CACHE_KEYS.LOCALE_CODE) || DEFAULT_LOCALE_CODE;

//     return config;
//   },
//   (error) => Promise.reject(error),
// );

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
