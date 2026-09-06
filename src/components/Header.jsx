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

// Module-level constant (stable reference across renders) so useScrollSpy's
// effect doesn't re-run/re-attach its scroll listener on every render.
const NAV_HASHES = navLinks.map((link) => link.href);

function Header() {

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
    const activeHash = useScrollSpy(NAV_HASHES);
    
    return (
        <header id="header" className="header d-flex align-items-center fixed-top">
        {/* Skip link: hidden until keyboard-focused, lets keyboard/screen-reader
            users jump straight past the nav to the main content. */}
        <a href="#hero" className="visually-hidden-focusable">
            رفتن به محتوای اصلی
        </a>

        <div className="container-fluid container-xl position-relative d-flex align-items-center">
            <a className="btn-getstarted flex-md-shrink-0" href="#about">شروع کنید</a>

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
                            <a
                                href={link.href}
                                className={activeHash === link.href ? "active" : ""}
                                aria-current={activeHash === link.href ? "page" : undefined}
                            >
                                {link.label}
                            </a>
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

            <h1 className="sitename logo d-flex align-items-center me-auto">
                <a href="#hero" >
                    <img src="/assets/img/LOGO-AVID.png" alt="شرکت فناوری های هوشمند آوید" />
                </a>
                </h1>
        </div>
    </header>
    );
    
};

export default Header;