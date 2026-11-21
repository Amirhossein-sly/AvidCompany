import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { categories, getProductsByCategory, productsSection } from "../../data/products.data";
import "./products.css";

const toFa = (n) => n.toLocaleString("fa-IR");

function Products() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);

  // فقط دسته‌هایی که حداقل یک محصول دارند
  const tabs = useMemo(
    () => [
      { key: "all", label: productsSection.allLabel },
      ...categories.filter((category) => getProductsByCategory(category.key).length > 0),
    ],
    []
  );

  const visibleProducts = useMemo(() => getProductsByCategory(activeCategory), [activeCategory]);

  const total = visibleProducts.length;

  // تشخیص اسلایدی که الان در دید است (برای دکمه‌ها و نقطه‌ها؛ با سوایپ هم کار می‌کند)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.dataset.index));
          }
        });
      },
      { root: track, threshold: 0.6 }
    );

    Array.from(track.children).forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [visibleProducts]);

  // جابه‌جایی افقی؛ هم در RTL و هم LTR درست کار می‌کند
  const goTo = useCallback((index) => {
    const track = trackRef.current;
    const slide = track?.children[index];
    if (!slide) return;

    const style = getComputedStyle(track);
    const trackRect = track.getBoundingClientRect();
    const slideRect = slide.getBoundingClientRect();
    const padding = parseFloat(style.paddingInlineStart) || 0;
    const delta =
      style.direction === "rtl"
        ? slideRect.right - (trackRect.right - padding)
        : slideRect.left - (trackRect.left + padding);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    track.scrollBy({ left: delta, behavior: reduceMotion ? "auto" : "smooth" });
  }, []);

  const handleFilter = (key) => {
    if (key === activeCategory) return;
    setActiveCategory(key);
    setActiveIndex(0);
  };

  return (
    <section id="products" className="products-section section">
      {/* Section Title (همان ساختار بقیه سکشن‌ها) */}
      <div className="container section-title" data-aos="fade-up">
        <h2>{productsSection.title}</h2>
        <p>{productsSection.subtitle}</p>
      </div>
      {/* End Section Title */}

      <div className="container">
        <div
          className="products-filter"
          role="group"
          aria-label="دسته‌بندی محصولات"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`products-filter__btn${activeCategory === tab.key ? " is-active" : ""}`}
              aria-pressed={activeCategory === tab.key}
              onClick={() => handleFilter(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          className="products-carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="محصولات آوید"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="products-stage">
            {/* key: با تغییر فیلتر، اسلایدر از اولین محصول شروع می‌شود */}
            <div className="products-track" key={activeCategory} ref={trackRef} tabIndex={0}>
              {visibleProducts.map((product, index) => (
                <div
                  className="products-slide"
                  key={product.slug}
                  data-index={index}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${toFa(index + 1)} از ${toFa(total)}`}
                >
                  <ProductCard product={product} ctaLabel={productsSection.ctaLabel} />
                </div>
              ))}
            </div>

            {total > 1 && (
              <>
                {/* فلش‌ها کنار کارت‌ها هستند. RTL: راست = قبلی، چپ = بعدی */}
                <button
                  type="button"
                  className="products-arrow products-arrow--prev"
                  onClick={() => goTo(activeIndex - 1)}
                  disabled={activeIndex === 0}
                  aria-label="محصول قبلی"
                >
                  <i className="bi bi-chevron-right" aria-hidden="true"></i>
                </button>
                <button
                  type="button"
                  className="products-arrow products-arrow--next"
                  onClick={() => goTo(activeIndex + 1)}
                  disabled={activeIndex === total - 1}
                  aria-label="محصول بعدی"
                >
                  <i className="bi bi-chevron-left" aria-hidden="true"></i>
                </button>
              </>
            )}
          </div>

          {total > 1 && (
            <div className="products-controls">
              <div className="products-controls__dots">
                {visibleProducts.map((product, index) => (
                  <button
                    key={product.slug}
                    type="button"
                    className={`products-controls__dot${index === activeIndex ? " is-active" : ""}`}
                    aria-label={`رفتن به محصول ${toFa(index + 1)}`}
                    aria-current={index === activeIndex}
                    onClick={() => goTo(index)}
                  ></button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Products;