import { useLocation } from "react-router-dom";
import SiteLink from "./SiteLink";
import useHeaderScroll from "../hooks/useHeaderScroll";
import useMobileMenu from "../hooks/useMobileMenu";
import useScrollSpy from "../hooks/useScrollSpy";

const navLinks = [
    { href: "#hero", label: "خانه"},
    { href: "#about", label: "درباره ما"},
    { href: "#products", label: "محصولات"},
    { href: "#services", label: "خدمات"},
    { href: "#portfolio", label: "چشم انداز"},
    { href: "#contact", label: "تماس با ما"},
]

// Module-level constants (stable references across renders) so useScrollSpy's
// effect doesn't re-run/re-attach its scroll listener on every render.
const HOME_HASHES = navLinks.map((link) => link.href);
// خارج از صفحه‌ی اصلی سکشنی برای رصد کردن وجود ندارد
const NO_HASHES = [];

function Header() {

    const { pathname } = useLocation();
    const isHome = pathname === "/";

    /*mobile Menu */
    const {
        mobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu,
        } = useMobileMenu();

    /*toggle Scrolled*/
    useHeaderScroll();

    /*Nav menu link activate — returns the hash of the section currently
      in view, driven by React state rather than direct classList mutation,
      so it survives Header re-renders (e.g. when the mobile menu toggles). */
    const spyHash = useScrollSpy(isHome ? HOME_HASHES : NO_HASHES);

    // در صفحه‌های محصول، گزینه‌ی «محصولات» فعال نشان داده می‌شود
    const activeHash = isHome ? spyHash : pathname.startsWith("/products") ? "#products" : "";

    // فقط یک h1 در هر صفحه: در صفحه‌های داخلی عنوان خود صفحه h1 است، نه لوگو
    const LogoTag = isHome ? "h1" : "div";

    return (
        <header id="header" className="header d-flex align-items-center fixed-top">
        {/* Skip link: hidden until keyboard-focused, lets keyboard/screen-reader
            users jump straight past the nav to the main content. */}
        <a href={isHome ? "#hero" : "#main-content"} className="visually-hidden-focusable">
            رفتن به محتوای اصلی
        </a>

        <div className="container-fluid container-xl position-relative d-flex align-items-center">
            <SiteLink hash="#about" className="btn-getstarted flex-md-shrink-0">شروع کنید</SiteLink>

            <nav id="navmenu" className="navmenu"
            onClick={(e) => {
                if (e.target.closest("a")) {
                    closeMobileMenu();
                }
            }}
            >
                <ul>
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <SiteLink
                                hash={link.href}
                                className={activeHash === link.href ? "active" : ""}
                                aria-current={activeHash === link.href ? (isHome ? "page" : "true") : undefined}
                            >
                                {link.label}
                            </SiteLink>
                        </li>
                    ))}
                </ul>
                <i className={`mobile-nav-toggle d-xl-none bi ${
                mobileMenuOpen ? "bi-x" : "bi-list"
                }`}
                onClick={toggleMobileMenu}
                role="button"
                tabIndex={0}
                aria-label={mobileMenuOpen ? "بستن منو" : "باز کردن منو"}
                aria-expanded={mobileMenuOpen}
                aria-controls="navmenu"
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleMobileMenu();
                    }
                }}
                ></i>
            </nav>

            <LogoTag className="sitename logo d-flex align-items-center me-auto">
                <SiteLink hash="#hero">
                    <img src="/assets/img/LOGO-AVID.png" alt="شرکت فناوری های هوشمند آوید" />
                </SiteLink>
            </LogoTag>
        </div>
    </header>
    );
    
};

export default Header;