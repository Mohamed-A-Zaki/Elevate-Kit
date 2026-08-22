import Providers from "@/shared/providers";
import AppRoutes from "@/shared/routes/app-routes";
import { Notifications } from "@mantine/notifications";
import { getCurrentDirection } from "./shared/utils/functions";

export default function App() {
  return (
    <Providers>
      <AppRoutes />
      <Notifications
        position={getCurrentDirection() === "ltr" ? "top-right" : "top-left"}
      />
    </Providers>
  );
}
