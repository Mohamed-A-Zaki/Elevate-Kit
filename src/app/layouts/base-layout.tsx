import Footer from "@/app/componets/layouts/footer";
import Navbar from "@/app/componets/layouts/navbar";
import useLocaleCode from "@/shared/hooks/use-locale-code";
import { Outlet } from "react-router";

export default function BaseLayout() {
  /***
   * This hook is used to set the locale code for the application. It is used to set the language of the application based on the user's preference. It is also used to set the direction of the text based on the language. For example, if the language is Arabic, the direction will be set to RTL (Right to Left). If the language is English, the direction will be set to LTR (Left to Right).
   */
  useLocaleCode();

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
