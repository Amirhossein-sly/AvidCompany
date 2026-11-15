import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollTop from "./ScrollTop";

/* هدر، فوتر و دکمه‌ی برگشت به بالا برای همه‌ی صفحه‌ها مشترک است؛ هر صفحه داخل <Outlet /> رندر می‌شود */
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ScrollTop />
    </>
  );
}

export default Layout;
