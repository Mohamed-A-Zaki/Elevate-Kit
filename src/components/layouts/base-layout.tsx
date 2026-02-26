import { Outlet } from "react-router";
import Footer from "../layout-componets/footer";
import Navbar from "../layout-componets/navbar";

export default function BaseLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
