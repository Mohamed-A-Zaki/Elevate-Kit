import LocaleSwitcher from "@/shared/components/locale-switcher";
import { ThemeToggler } from "@/shared/components/theme-toggler";
import { preferredLocalePath, URLS } from "@/shared/routing";
import { trans } from "@/shared/utils/trans";
import { Button } from "@mantine/core";
import { Link } from "react-router";

export default function NavbarExample() {
  return (
    <div className="flex items-center justify-between p-3 border m-5 rounded-md">
      <div className="flex gap-2">
        <Button component={Link} to={preferredLocalePath(URLS.home)}>
          {trans("common.home")}
        </Button>
        <Button component={Link} to={preferredLocalePath(URLS.about)}>
          {trans("common.about")}
        </Button>
        <Button component={Link} to={preferredLocalePath(URLS.blog)}>
          {trans("common.blog")}
        </Button>
      </div>

      <div className="text-xl">
        {trans("common.greeting", {
          firstName: "Mohamed",
          lastName: "Zaki",
        })}
      </div>

      <div className="flex items-center gap-4">
        <LocaleSwitcher />
        <div className="flex-1">
          <ThemeToggler variant="select" />
        </div>
      </div>
    </div>
  );
}
