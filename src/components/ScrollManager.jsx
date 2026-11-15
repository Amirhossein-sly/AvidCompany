import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * با هر تغییر مسیر:
 *  - اگر آدرس hash دارد (مثل /#products) به همان سکشن می‌رود
 *  - در غیر این صورت به بالای صفحه برمی‌گردد
 * داخل <BrowserRouter> و بالای <Routes> قرار بگیرد.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // کمی صبر تا صفحه مقصد رندر شود
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView();
      }, 100);
      return () => clearTimeout(timer);
    }

    // بدون انیمیشن (در main.css برای کل صفحه scroll-behavior: smooth تنظیم شده)
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    return undefined;
  }, [pathname, hash]);

  return null;
}

export default ScrollManager;
