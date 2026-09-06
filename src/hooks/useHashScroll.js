import { useEffect } from "react";

function useHashScroll() {
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;

      if (!hash) return;

      const section = document.querySelector(hash);

      if (!section) return;

      setTimeout(() => {
        const scrollMarginTop = parseInt(
          getComputedStyle(section).scrollMarginTop,
          10
        ) || 0;

        window.scrollTo({
          top: section.offsetTop - scrollMarginTop,
          behavior: "smooth",
        });
      }, 100);
    };

    // If the page (including images) has already finished loading by
    // the time this effect runs, the "load" event has already fired
    // and a listener added now would never trigger — so run directly
    // in that case instead of waiting for an event that already happened.
    if (document.readyState === "complete") {
      handleHashScroll();
    } else {
      window.addEventListener("load", handleHashScroll);
    }

    // Also handle hash changes that happen after the initial load,
    // e.g. clicking an in-page anchor link.
    window.addEventListener("hashchange", handleHashScroll);

    return () => {
      window.removeEventListener("load", handleHashScroll);
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, []);
}

export default useHashScroll;