import { Outlet } from "react-router";
import Footer from "./footer";
import Navbar from "./navbar";

export default function BaseLayout() {
  return (
    <div className="container">
      <div className="flex min-h-screen flex-col gap-5 py-2">
        <Navbar />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}
