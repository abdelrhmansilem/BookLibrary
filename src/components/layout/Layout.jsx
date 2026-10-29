import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

/** Every route change starts at the top of the page. */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main id="main" className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
