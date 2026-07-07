import AppRoutes from "@/shared/routes/app-routes";
import { Notifications } from "@mantine/notifications";
import Providers from "./app/providers";

export default function App() {
  return (
    <Providers>
      <AppRoutes />
      <Notifications position="top-right" />
    </Providers>
  );
}
