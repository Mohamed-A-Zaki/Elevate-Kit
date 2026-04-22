import { Outlet } from "react-router";
import Footer from "./components/footer";
import Navbar from "./components/navbar";

export default function BaseLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
