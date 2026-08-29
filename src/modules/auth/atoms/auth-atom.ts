import type {
  LoginFormData,
  RegisterFormData,
  User,
} from "@/modules/auth/types/auth";
import { cache } from "@/packages/smart-cache";
import { atom } from "@mongez/react-atom";
import loginService from "../services/login.service";
import logoutService from "../services/logout.service";
import registerService from "../services/register.service";

type AuthAtom = {
  /**
   * user object
   */
  user: User | null;
  /***
   * token string
   */
  token: string | null;
  /**
   * loading state
   */
  loading: boolean;
};

type AuthAtomActions = {
  /**
   * login service
   */
  login: (formData: LoginFormData, onSuccess?: () => void) => void;
  /**
   * logout service
   */
  logout: (onSuccess?: () => void) => void;
  /***
   * register service
   */
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
    /***
     * login service
     */
    login: loginService,
    /***
     * logout service
     */
    logout: logoutService,
    /**
     * register service
     */
    register: registerService,
  },
});
