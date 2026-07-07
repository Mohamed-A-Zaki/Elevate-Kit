import Footer from "@/app/components/layouts/footer";
import Navbar from "@/app/components/layouts/navbar";
import { Outlet } from "react-router";

function BaseLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default BaseLayout;
