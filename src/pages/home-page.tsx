import LanguageDirectionToggle from "@/components/utils/language-direction-toggle";
import { ThemeToggler } from "@/components/utils/theme-toggler";

export default function HomePage() {
  return (
    <>
      <LanguageDirectionToggle />
      <ThemeToggler variant="icon" />
    </>
  );
}
