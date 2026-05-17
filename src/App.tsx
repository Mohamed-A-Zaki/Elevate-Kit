import AppRoutes from "@/shared/routes/app-routes";
import { Notifications } from "@mantine/notifications";
import Providers from "./shared/providers";

export default function App() {
  return (
    <Providers>
      <AppRoutes />
      <Notifications position="top-right" />
    </Providers>
  );
}
