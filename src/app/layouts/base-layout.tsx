import Footer from "@/app/componets/layouts/footer";
import Navbar from "@/app/componets/layouts/navbar";
import { Outlet } from "react-router";

export default function BaseLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
