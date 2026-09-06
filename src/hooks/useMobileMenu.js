import { useEffect, useState } from "react";

function useMobileMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle(
      "mobile-nav-active",
      mobileMenuOpen
    );

    return () => {
      document.body.classList.remove("mobile-nav-active");
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return {
    mobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  };
}

export default useMobileMenu;