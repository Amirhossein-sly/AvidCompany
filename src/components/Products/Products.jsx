import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import "swiper/css";
import ProductCard from "./ProductCard";
import { categories, getProductsByCategory, productsSection } from "../../data/products.data";
import "./products.css";

// هر چند میلی‌ثانیه یک بار خودکار به محصول بعدی می‌رود
const AUTOPLAY_DELAY = 4000;
// فاصله‌ی بین اسلایدها (باید از padding سایه‌ی .products-swiper در products.css بزرگ‌تر باشد)
const SLIDE_GAP = 64;
// مدت محو شدن کارت‌های قبلی هنگام عوض شدن فیلتر (باید با .products-body.is-switching در products.css یکی باشد)
const SWITCH_OUT_MS = 200;
// مدت انیمیشن ارتفاع هنگام عوض شدن فیلتر (باید با transition ارتفاع .products-body یکی باشد)
const HEIGHT_MS = 400;

const toFa = (n) => n.toLocaleString("fa-IR");

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Products() {
  // activeCategory: تب انتخاب‌شده (فوراً فعال می‌شود)
  // shownCategory: محصولاتی که الان نمایش داده می‌شوند (بعد از محو شدن کارت‌های قبلی عوض می‌شود)
  const [activeCategory, setActiveCategory] = useState("all");
  const [shownCategory, setShownCategory] = useState("all");
  const [isSwitching, setIsSwitching] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion] = useState(prefersReducedMotion);
  const swiperRef = useRef(null);
  const carouselRef = useRef(null);
  const bodyRef = useRef(null);
  const switchTimer = useRef(null);
  const heightBeforeSwitch = useRef(null);

  // فقط دسته‌هایی که حداقل یک محصول دارند
  const tabs = useMemo(
    () => [
      { key: "all", label: productsSection.allLabel },
      ...categories.filter((category) => getProductsByCategory(category.key).length > 0),
    ],
    []
  );

  const visibleProducts = useMemo(() => getProductsByCategory(shownCategory), [shownCategory]);

  const total = visibleProducts.length;
  const canLoop = total > 1;
  // کاربرانی که حرکت کم را در سیستم‌عامل انتخاب کرده‌اند، حرکت خودکار ندارند
  const shouldAutoplay = canLoop && !reduceMotion;

  // وقتی بخش محصولات از صفحه بیرون است، حرکت خودکار متوقف می‌شود
  useEffect(() => {
    const element = carouselRef.current;
    if (!element || !shouldAutoplay) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const player = swiperRef.current?.autoplay;
        if (!player) return;
        if (entry.isIntersecting) player.start();
        else player.stop();
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shownCategory, shouldAutoplay]);

  // ارتفاع بخش بعد از تعویض محصولات به‌جای پرش، نرم تغییر می‌کند
  useLayoutEffect(() => {
    const element = bodyRef.current;
    const from = heightBeforeSwitch.current;
    heightBeforeSwitch.current = null;
    if (!element || from === null) return undefined;

    element.style.height = "auto";
    const to = element.offsetHeight;
    if (Math.abs(to - from) < 2) {
      element.style.height = "";
      return undefined;
    }

    element.style.height = `${from}px`;
    void element.offsetHeight; // reflow: شروع انیمیشن از ارتفاع قبلی
    element.style.height = `${to}px`;

    const timer = setTimeout(() => {
      element.style.height = "";
    }, HEIGHT_MS + 50);

    return () => {
      clearTimeout(timer);
      element.style.height = "";
    };
  }, [shownCategory]);

  useEffect(() => () => clearTimeout(switchTimer.current), []);

  const goPrev = () => swiperRef.current?.slidePrev();
  const goNext = () => swiperRef.current?.slideNext();
  const goTo = (index) => swiperRef.current?.slideToLoop(index);

  // با فوکوس کیبورد روی دکمه‌ها (نه کلیک ماوس) حرکت خودکار موقتاً می‌ایستد
  const pauseOnKeyboardFocus = (event) => {
    if (event.target.matches?.(":focus-visible")) swiperRef.current?.autoplay?.pause?.();
  };
  const resumeAfterBlur = () => swiperRef.current?.autoplay?.resume?.();

  // تعویض فیلتر: کارت‌های قبلی نرم محو می‌شوند، محصولات دسته‌ی جدید جایگزین و نرم ظاهر می‌شوند
  const handleFilter = (key) => {
    if (key === activeCategory) return;

    setActiveCategory(key);
    setActiveIndex(0);
    clearTimeout(switchTimer.current);

    if (reduceMotion) {
      setShownCategory(key);
      return;
    }

    heightBeforeSwitch.current = bodyRef.current ? bodyRef.current.offsetHeight : null;
    setIsSwitching(true);
    switchTimer.current = setTimeout(() => {
      setShownCategory(key);
      setActiveIndex(0);
      setIsSwitching(false);
    }, SWITCH_OUT_MS);
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
          ref={carouselRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="محصولات آوید"
          data-aos="fade-up"
          data-aos-delay="200"
          onFocus={pauseOnKeyboardFocus}
          onBlur={resumeAfterBlur}
        >
          <div
            ref={bodyRef}
            className={`products-body${isSwitching ? " is-switching" : ""}`}
          >
          <div className="products-stage">
            {/* key: با تغییر فیلتر، اسلایدر از اولین محصول آن دسته شروع می‌شود */}
            <Swiper
              key={shownCategory}
              className="products-swiper"
              dir="rtl"
              modules={[A11y, Autoplay, Keyboard]}
              slidesPerView={1}
              spaceBetween={SLIDE_GAP}
              speed={reduceMotion ? 0 : 600}
              loop={canLoop}
              autoplay={
                shouldAutoplay
                  ? { delay: AUTOPLAY_DELAY, disableOnInteraction: false, pauseOnMouseEnter: true }
                  : false
              }
              keyboard={{ enabled: true, onlyInViewport: true }}
              a11y={{
                prevSlideMessage: "محصول قبلی",
                nextSlideMessage: "محصول بعدی",
                slideLabelMessage: "{{index}} از {{slidesLength}}",
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
              {visibleProducts.map((product) => (
                <SwiperSlide key={product.slug} className="products-slide">
                  <ProductCard product={product} ctaLabel={productsSection.ctaLabel} />
                </SwiperSlide>
              ))}
            </Swiper>

            {canLoop && (
              <>
                {/* فلش‌ها کنار کارت‌ها هستند. RTL: راست = قبلی، چپ = بعدی (بعد از آخرین محصول دوباره اولی می‌آید) */}
                <button
                  type="button"
                  className="products-arrow products-arrow--prev"
                  onClick={goPrev}
                  aria-label="محصول قبلی"
                >
                  <i className="bi bi-chevron-right" aria-hidden="true"></i>
                </button>
                <button
                  type="button"
                  className="products-arrow products-arrow--next"
                  onClick={goNext}
                  aria-label="محصول بعدی"
                >
                  <i className="bi bi-chevron-left" aria-hidden="true"></i>
                </button>
              </>
            )}
          </div>

          {canLoop && (
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
      </div>
    </section>
  );
}

export default Products;