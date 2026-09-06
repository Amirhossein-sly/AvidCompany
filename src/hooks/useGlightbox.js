import { useEffect } from "react";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";

function useGLightbox() {
  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });

    return () => {
      if (lightbox && typeof lightbox.destroy === "function") {
        lightbox.destroy();
      }
    };
  }, []);
}

export default useGLightbox;