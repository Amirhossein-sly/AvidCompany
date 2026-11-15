import { Link, useLocation } from "react-router-dom";

/**
 * لینک به یک سکشن صفحه‌ی اصلی (مثل #about)
 *  - در صفحه‌ی اصلی: همان لینک hash معمولی (رفتار قبلی بدون تغییر)
 *  - در بقیه‌ی صفحه‌ها: به /#about می‌رود (بدون رفرش) و ScrollManager تا سکشن اسکرول می‌کند
 */
function SiteLink({ hash, children, ...props }) {
  const { pathname } = useLocation();

  if (pathname === "/") {
    return (
      <a href={hash} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link to={{ pathname: "/", hash }} {...props}>
      {children}
    </Link>
  );
}

export default SiteLink;
