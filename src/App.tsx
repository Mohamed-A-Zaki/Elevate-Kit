import Providers from "@/shared/providers";
import AppRoutes from "@/shared/routes/app-routes";
import { Notifications } from "@mantine/notifications";

export default function App() {
  return (
    <Providers>
      <AppRoutes />
      <Notifications position="top-right" />
    </Providers>
  );
}
