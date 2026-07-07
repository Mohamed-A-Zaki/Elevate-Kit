import { endpoint } from "@/shared/api/endpoint";
import { handleError } from "@/shared/utils/handle-error";
import { notifications } from "@mantine/notifications";
import { authAtom } from "../atoms/auth-atom";
import type { LogoutResponse } from "../types/auth";

export default async function logoutService(onSuccess?: () => void) {
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
}
