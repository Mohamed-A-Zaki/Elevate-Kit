import Footer from "@/components/layout-componets/footer";
import Navbar from "@/components/layout-componets/navbar";
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
