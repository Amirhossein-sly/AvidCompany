import { useEffect } from "react";
import Isotope from "isotope-layout";
import imagesLoaded from "imagesloaded";

function useIsotope() {
  useEffect(() => {
    // Guards the imagesLoaded async callback below: if the component
    // unmounts before images finish loading, we must not create an
    // Isotope instance bound to DOM that no longer exists — otherwise
    // it leaks and keeps running against a detached container.
    let cancelled = false;

    const isotopeElements = document.querySelectorAll(".isotope-layout");
    const instances = [];
    const listenerCleanups = [];

    isotopeElements.forEach((isotopeElement) => {
      const container =
        isotopeElement.querySelector(".isotope-container");

      if (!container) return;

      const layout =
        isotopeElement.getAttribute("data-layout") ?? "masonry";

      const filter =
        isotopeElement.getAttribute("data-default-filter") ?? "*";

      const sort =
        isotopeElement.getAttribute("data-sort") ?? "original-order";

      let isotopeInstance;

      imagesLoaded(container, () => {
        if (cancelled) return; // component unmounted while images were loading

        isotopeInstance = new Isotope(container, {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter,
          sortBy: sort,
        });

        instances.push(isotopeInstance);
      });

      const filters = isotopeElement.querySelectorAll(
        ".isotope-filters li"
      );

      filters.forEach((filterElement) => {
        const handleFilterClick = () => {
          if (!isotopeInstance) return;

          const currentActive = isotopeElement.querySelector(
            ".isotope-filters .filter-active"
          );

          if (currentActive) {
            currentActive.classList.remove("filter-active");
          }

          filterElement.classList.add("filter-active");

          isotopeInstance.arrange({
            filter: filterElement.getAttribute("data-filter"),
          });

          // اگر AOS فعال است، بعد از تغییر فیلتر
          // انیمیشن‌ها دوباره محاسبه شوند
          window.AOS?.refresh();
        };

        filterElement.addEventListener("click", handleFilterClick);
        listenerCleanups.push(() =>
          filterElement.removeEventListener("click", handleFilterClick)
        );
      });
    });

    return () => {
      cancelled = true;
      listenerCleanups.forEach((cleanup) => cleanup());
      instances.forEach((instance) => {
        if (instance && typeof instance.destroy === "function") {
          instance.destroy();
        }
      });
    };
  }, []);
}

export default useIsotope;