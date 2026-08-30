import NavbarExample from "@/app/example-componets/navbar-example";
import { Outlet } from "react-router";
import Footer from "./footer";
import Navbar from "./navbar";

export default function BaseLayout() {
  return (
    <div className="container">
      <NavbarExample />

      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
