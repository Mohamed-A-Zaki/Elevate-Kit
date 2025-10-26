import Endpoint from "@mongez/http";
import { type AxiosResponse } from "axios";
import { authAtom } from "../atoms/app/auth-atom.ts";
import { cache } from "../packages/cache.ts";
import type { LocaleCode } from "../types/localization.ts";
import { baseUrl, defaultLocaleCode } from "./flags.ts";

export const endpoint = new Endpoint({
  baseURL: baseUrl,

  setAuthorizationHeader: () => {
    const token = cache.get("token");

    if (token) {
      return `Bearer ${token}`;
    }
  },

  headers: {
    "Accept-Language":
      (cache.get("locale-code") as LocaleCode) || defaultLocaleCode,
  },
});

endpoint.events.onError((response: AxiosResponse) => {
  if (response.data.status_code === 401) {
    authAtom.change("user", null);
    authAtom.change("token", "");
  }
});
