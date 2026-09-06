import { useEffect } from "react";

function useHeaderScroll() {
  useEffect(() => {
    document.body.classList.add("index-page");

    const toggleScrolled = () => {
      const header = document.querySelector("#header");

      if (!header) return;

      const isSticky =
        header.classList.contains("scroll-up-sticky") ||
        header.classList.contains("sticky-top") ||
        header.classList.contains("fixed-top");

      if (!isSticky) return;

      document.body.classList.toggle(
        "scrolled",
        window.scrollY > 100
      );
    };

    window.addEventListener("scroll", toggleScrolled);

    toggleScrolled();

    return () => {
      window.removeEventListener("scroll", toggleScrolled);
      document.body.classList.remove("scrolled");
      document.body.classList.remove("index-page");
    };
  }, []);
}

export default useHeaderScroll;