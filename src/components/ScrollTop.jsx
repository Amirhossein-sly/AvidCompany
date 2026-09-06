import { useEffect } from "react";

function ScrollTop() {
    useEffect(() => {
        const scrollTop = document.querySelector(".scroll-top");

        if (!scrollTop) return;

        const toggleScrollTop = () => {
            if (window.scrollY > 100) {
                scrollTop.classList.add("active");
            } else {
                scrollTop.classList.remove("active");
            }
        };

        const handleClick = (e) => {
            e.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        };

        window.addEventListener("scroll", toggleScrollTop);
        scrollTop.addEventListener("click", handleClick);

        toggleScrollTop();

        return () => {
            window.removeEventListener("scroll", toggleScrollTop);
            scrollTop.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <a
            href="#"
            id="scroll-top"
            className="scroll-top d-flex align-items-center justify-content-center"
        >
            <i className="bi bi-arrow-up-short"></i>
        </a>
    );
}

export default ScrollTop;