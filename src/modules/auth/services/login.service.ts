import { endpoint } from "@/shared/api/endpoint";
import { CACHE_KEYS } from "@/shared/constants";
import { handleError } from "@/shared/utils/handle-error";
import { notifications } from "@mantine/notifications";
import { authAtom } from "../atoms/auth-atom";
import type { LoginFormData, LoginResponse } from "../types/auth";

export default async function loginService(
  formData: LoginFormData,
  onSuccess?: () => void,
) {
  try {
    authAtom.change("loading", true);

    const { data } = await endpoint.post<LoginResponse>("/login", formData);

    authAtom.change(CACHE_KEYS.USER, data.data.user);
    authAtom.change(CACHE_KEYS.TOKEN, data.data.token);

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
}
