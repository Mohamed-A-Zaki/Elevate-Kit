import LanguageDirectionToggle from "@/shared/components/utils/language-direction-toggle.tsx";
import { ThemeToggler } from "@/shared/components/utils/theme-toggler.tsx";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";

export default function HomePage() {
  return (
    <div className={"w-125 flex gap-2"}>
      <ThemeToggler variant={"select"} />
      <LanguageDirectionToggle />
      <Button
        onClick={() => {
          notifications.show({
            title: "test notification",
            message: "this is a test notification",
            color: "blue",
            position: "bottom-right",
            withBorder: true,
          });
        }}
      >
        test notification
      </Button>
    </div>
  );
}
