import type {
  LoginFormData,
  LoginResponse,
  LogoutResponse,
  RegisterFormData,
  RegisterResponse,
  User,
} from "@/types/auth.ts";
import { endpoint } from "@/utils/endpoints.ts";
import { handleError } from "@/utils/handle-error.ts";
import { notifications } from "@mantine/notifications";
import { atom } from "@mongez/react-atom";
import { cache } from "smart-cache-ts";

type AuthAtom = {
  /** user */
  user: User | null;
  /** token */
  token: string | null;
  /** loading */
  loading: boolean;
};

type AuthAtomActions = {
  /** login */
  login: (formData: LoginFormData, onSuccess?: () => void) => void;
  /** logout */
  logout: (onSuccess?: () => void) => void;
  /** register */
  register: (formData: RegisterFormData, onSuccess?: () => void) => void;
};

export const authAtom = atom<AuthAtom, AuthAtomActions>({
  key: "authAtom",

  default: {
    user: cache.get("user"),
    token: cache.get("token"),
    loading: false,
  },

  beforeUpdate(newValue) {
    cache.set("user", newValue.user);
    cache.set("token", newValue.token);
    return newValue;
  },

  actions: {
    async login(formData: LoginFormData, onSuccess?: () => void) {
      try {
        authAtom.change("loading", true);

        const { data } = await endpoint.post<LoginResponse>("/login", formData);

        authAtom.change("user", data.data.user);
        authAtom.change("token", data.data.token);

        onSuccess?.();

        notifications.show({
          title: "Success",
          message: data.message,
        });
      } catch (error) {
        handleError(error);
      } finally {
        authAtom.change("loading", false);
      }
    },

    async logout(onSuccess?: () => void) {
      try {
        authAtom.change("loading", true);

        const { data } = await endpoint.post<LogoutResponse>("/logout");

        authAtom.change("user", null);
        authAtom.change("token", "");

        onSuccess?.();

        notifications.show({
          title: "Success",
          message: data.message,
        });
      } catch (error) {
        handleError(error);
      } finally {
        authAtom.change("loading", false);
      }
    },

    async register(formData: RegisterFormData, onSuccess?: () => void) {
      try {
        authAtom.change("loading", true);

        const { data } = await endpoint.post<RegisterResponse>(
          "/register",
          formData,
        );

        authAtom.change("user", data.data.user);
        authAtom.change("token", data.data.token);

        onSuccess?.();

        notifications.show({
          title: "Success",
          message: data.message,
        });
      } catch (error) {
        handleError(error);
      } finally {
        authAtom.change("loading", false);
      }
    },
  },
});
