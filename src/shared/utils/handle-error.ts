import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";

/**
 * Handle axios and general errors with toast
 */
export function handleError(error: unknown) {
  if (error instanceof AxiosError) {
    notifications.show({
      title: "Error",
      message: error.response?.data.message || "Request failed",
      color: "red",
      withBorder: true,
    });
  } else {
    notifications.show({
      title: "Error",
      message: (error as Error).message,
      color: "red",
      withBorder: true,
    });
  }
}
