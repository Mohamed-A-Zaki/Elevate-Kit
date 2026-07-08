import Providers from "@/app/providers";
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
