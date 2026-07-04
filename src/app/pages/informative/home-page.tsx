import LanguageDirectionToggle from "@/shared/components/utils/language-direction-toggle";
import { ThemeToggler } from "@/shared/components/utils/theme-toggler";

export default function HomePage() {
  return (
    <div>
      <LanguageDirectionToggle />
      <ThemeToggler variant="icon" />
    </div>
  );
}
