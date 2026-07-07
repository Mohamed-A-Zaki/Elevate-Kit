import { endpoint } from "@/shared/api/endpoint";
import { handleError } from "@/shared/utils/handle-error";
import { notifications } from "@mantine/notifications";
import { authAtom } from "../atoms/auth-atom";
import type { RegisterFormData, RegisterResponse } from "../types/auth";

export default async function registerService(
  formData: RegisterFormData,
  onSuccess?: () => void,
) {
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
}
