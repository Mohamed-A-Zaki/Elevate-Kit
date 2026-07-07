import LanguageDirectionToggle from "@/shared/components/language-direction-toggle";
import { ThemeToggler } from "@/shared/components/theme-toggler";
import { trans } from "@/shared/utils/trans";
import { URLS } from "@/shared/utils/urls";
import { Button } from "@mantine/core";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between p-3 border m-3 rounded-md">
      <div className="w-125 max-w-full flex items-center gap-4">
        <LanguageDirectionToggle />
        <div className="flex-1">
          <ThemeToggler variant="select" />
        </div>
      </div>

      <div className="flex gap-2">
        <Button>
          <Link to={URLS.home}>{trans("common.home")}</Link>
        </Button>
        <Button>
          <Link to={URLS.about}>{trans("common.about")}</Link>
        </Button>
      </div>
    </div>
  );
}
