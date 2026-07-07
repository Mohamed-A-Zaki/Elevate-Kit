import { Outlet } from "react-router";
import Footer from "./footer";
import Navbar from "./navbar";

export default function BaseLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
