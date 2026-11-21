import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import { Link, useParams } from "react-router-dom";
import { getCategoriesOfProduct, products } from "../../data/products.data";
import "./product-detail.css";

const toFa = (n) => n.toLocaleString("fa-IR");

const toProducts = { pathname: "/", hash: "#products" };
const toContact = { pathname: "/", hash: "#contact" };

/* رزولوشن‌های کوچک‌تر از md بوت‌استرپ (۷۶۸px) را موبایل در نظر می‌گیریم */
const MOBILE_QUERY = "(max-width: 767.98px)";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (event) => setMatches(event.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/* عنوان سکشن؛ همان ساختار .section-title سراسری سایت */
function SectionTitle({ label, title }) {
  return (
    <div className="container section-title" data-aos="fade-up">
      <h2>{label}</h2>
      <p>{title}</p>
    </div>
  );
}

/* سکشن لیستی (مزایا / کاربردها) به سبک باکس‌های Features
   هر آیتم یا متن ساده است یا { title, text }؛ block.intro (اختیاری) جمله‌ی معرفی بالای لیست */
function ChecklistSection({ label, block, icon = "bi-check" }) {
  return (
    <section className="pd-checklist section">
      <SectionTitle label={label} title={block.title} />
      <div className="container">
        {block.intro && (
          <p className="pd-checklist__intro" data-aos="fade-up">
            {block.intro}
          </p>
        )}
        <div className="row pd-grid justify-content-center">
          {block.items.map((item, i) => {
            const detailed = typeof item === "object";
            const heading = detailed ? item.title : item;

            return (
              <div
                className="col-md-6 col-xl-4"
                key={heading}
                data-aos="fade-up"
                data-aos-delay={100 + (i % 3) * 100}
              >
                <div className={`pd-box${detailed ? " pd-box--detailed" : ""}`}>
                  <i className={`bi ${icon}`} aria-hidden="true"></i>
                  {detailed ? (
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  ) : (
                    <h3>{heading}</h3>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* عنوان کارت امکانات؛ در موبایل دکمه‌ی باز و بسته کردن (آکاردئون) است */
function GroupHead({ group, index, collapsible, open, onToggle, bodyId }) {
  const content = (
    <>
      <span className="pd-card__num" aria-hidden="true">{toFa(index + 1)}</span>
      <span className="pd-card__titles">
        <span className="pd-card__title">{group.title}</span>
        {group.titleEn && <span className="pd-card__en" dir="ltr">{group.titleEn}</span>}
      </span>
    </>
  );

  if (!collapsible) {
    return <h3 className="pd-card__head">{content}</h3>;
  }

  return (
    <h3 className="pd-card__head pd-card__head--toggle">
      <button type="button" aria-expanded={open} aria-controls={bodyId} onClick={onToggle}>
        {content}
        <i className="bi bi-chevron-down pd-card__chevron" aria-hidden="true"></i>
      </button>
    </h3>
  );
}

function ProductDetail() {
  const { slug } = useParams();
  const index = products.findIndex((p) => p.slug === slug);
  const product = products[index];

  const isMobile = useMediaQuery(MOBILE_QUERY);
  const [openGroup, setOpenGroup] = useState(0);
  const pageRef = useRef(null);

  // اگر هدر سایت fixed باشد، ارتفاعش را می‌خوانیم تا بالای صفحه زیر آن نرود.
  // اگر هدر نباشد یا fixed نباشد، فاصله‌ی اضافه‌ای ایجاد نمی‌شود.
  useEffect(() => {
    const update = () => {
      const header = document.querySelector("#header, .header");
      const fixed = header && getComputedStyle(header).position === "fixed";
      pageRef.current?.style.setProperty("--pd-header-offset", `${fixed ? header.offsetHeight : 0}px`);
    };

    update();
    const timer = setTimeout(update, 300); // اگر هدر کمی دیرتر رندر شد
    window.addEventListener("resize", update);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", update);
    };
  }, [slug]);

  // با ورود به این صفحه (یا تغییر محصول): AOS المان‌های جدید را پیدا کند و آکاردئون به حالت اول برگردد
  useEffect(() => {
    AOS.refreshHard();
    setOpenGroup(0);
  }, [slug]);

  // عنوان و توضیحات صفحه برای تب مرورگر و سئو
  useEffect(() => {
    if (!product) return undefined;

    const prevTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const prevDescription = meta ? meta.getAttribute("content") : null;

    document.title = `${product.title} | آوید`;
    if (meta) meta.setAttribute("content", product.summary);

    return () => {
      document.title = prevTitle;
      if (meta && prevDescription !== null) meta.setAttribute("content", prevDescription);
    };
  }, [product]);

  if (!product) {
    return (
      <main id="main-content" className="main product-detail" ref={pageRef}>
        <section className="pd-hero section">
          <div className="container">
            <div className="pd-notfound">
              <h1>محصول مورد نظر پیدا نشد</h1>
              <p>آدرس این صفحه معتبر نیست یا محصول حذف شده است.</p>
              <Link className="pd-btn pd-btn--primary" to={toProducts}>
                بازگشت به محصولات
                <i className="bi bi-arrow-left" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const { title, titleEn, summary, icon, image, imageAlt, highlights, details } = product;
  const { intro, featuresTitle, features, benefits, useCases, example, audience, closing } = details;

  const prev = products[index - 1];
  const next = products[index + 1];

  const singleGroup = features.length === 1 && !features[0].title;
  const groupCols = features.length === 4 ? "col-md-6" : "col-md-6 col-xl-4";
  // آکاردئون فقط در موبایل و وقتی چند گروه عنوان‌دار داریم
  const accordion = isMobile && !singleGroup;

  return (
    // key: با تغییر محصول، صفحه از نو ساخته می‌شود تا انیمیشن‌های AOS دوباره اجرا شوند
    <main id="main-content" className="main product-detail" key={product.slug} ref={pageRef}>
      {/* ------------------------------------------------------------ Hero */}
      <section className="pd-hero section">
        <div className="container">
          <nav className="pd-crumbs" aria-label="مسیر صفحه">
            <ol>
              <li><Link to="/">خانه</Link></li>
              <li><Link to={toProducts}>محصولات</Link></li>
              <li aria-current="page">{title}</li>
            </ol>
          </nav>

          {/* موبایل: عنوان ← تصویر ← توضیحات | دسکتاپ: متن راست، تصویر چپ */}
          <div className="pd-hero__grid">
            <div className="pd-hero__text">
              <div className="pd-hero__head" data-aos="fade-up" data-aos-delay="100">
                <div className="pd-tags">
                  {getCategoriesOfProduct(product.slug).map((category) => (
                    <span className="pd-tag" key={category.key}>{category.label}</span>
                  ))}
                </div>
                <h1>{title}</h1>
                <p className="pd-title-en" dir="ltr">{titleEn}</p>
              </div>

              <div className="pd-hero__body" data-aos="fade-up" data-aos-delay="200">
                <p className="pd-hero__summary">{summary}</p>

                <ul className="pd-points">
                  {highlights.map((item) => (
                    <li key={item.title}>
                      <i className={`bi ${item.icon}`} aria-hidden="true"></i>
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>

                <div className="pd-hero__actions">
                  <Link className="pd-btn pd-btn--primary" to={toContact}>
                    درخواست مشاوره
                    <i className="bi bi-arrow-left" aria-hidden="true"></i>
                  </Link>
                  <a className="pd-btn pd-btn--ghost" href="#pd-features">
                    مشاهده امکانات
                  </a>
                </div>
              </div>
            </div>

            <div className="pd-hero__media" data-aos="zoom-out" data-aos-delay="150">
              <div className="pd-hero__visual">
                <span className="pd-hero__badge" aria-hidden="true">
                  <i className={`bi ${icon}`}></i>
                </span>
                <img src={image} alt={imageAlt} decoding="async" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- معرفی */}
      <section className="pd-overview section">
        <SectionTitle label="معرفی محصول" title={intro.heading} />
        <div className="container">
          <div className="pd-prose" data-aos="fade-up" data-aos-delay="100">
            {intro.paragraphs.map((paragraph, i) => (
              <p key={paragraph} className={i === 0 ? "pd-prose__lead" : undefined}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- امکانات */}
      <section id="pd-features" className="pd-features section">
        <SectionTitle label="امکانات" title={featuresTitle} />
        <div className="container">
          <div className="row pd-grid justify-content-center">
            {features.map((group, i) => {
              const bodyId = `pd-group-${i}`;
              const collapsed = accordion && openGroup !== i;

              return (
                <div
                  className={singleGroup ? "col-12" : groupCols}
                  key={group.title || i}
                  data-aos="fade-up"
                  data-aos-delay={100 + (i % 3) * 100}
                >
                  <div className={`pd-card${accordion ? " pd-card--collapsible" : ""}`}>
                    {group.title && (
                      <GroupHead
                        group={group}
                        index={i}
                        collapsible={accordion}
                        open={!collapsed}
                        bodyId={bodyId}
                        onToggle={() => setOpenGroup(openGroup === i ? -1 : i)}
                      />
                    )}
                    <div id={bodyId} className={`pd-card__body${collapsed ? " is-collapsed" : ""}`}>
                      <div className="pd-card__inner">
                        <ul className={`pd-list${singleGroup ? " pd-list--cols" : ""}`}>
                          {group.items.map((item) => (
                            <li key={item}>
                              <i className="bi bi-check2-circle" aria-hidden="true"></i>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --------------------------------- مزایا و کاربردها (اختیاری) */}
      {benefits && <ChecklistSection label="مزایا" block={benefits} />}
      {useCases && <ChecklistSection label="کاربردها" block={useCases} />}

      {/* ------------------------------------- نمونه اجرایی (اختیاری) */}
      {example && (
        <section className="pd-example-section section">
          <SectionTitle label="نمونه اجرایی" title={example.title} />
          <div className="container">
            <div className="pd-example" data-aos="fade-up" data-aos-delay="100">
              <div className="pd-example__text">
                {example.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {(example.url || example.note) && (
                <aside className="pd-example__aside">
                  {example.url && (
                    <div className="pd-site">
                      <div className="pd-site__row">
                        <span className="pd-site__icon" aria-hidden="true">
                          <i className="bi bi-globe2"></i>
                        </span>
                        <span>
                          <span className="pd-site__label">وب‌سایت پروژه</span>
                          <span className="pd-site__url" dir="ltr">{example.urlLabel}</span>
                        </span>
                      </div>
                      <a
                        className="pd-btn pd-btn--primary pd-btn--block"
                        href={example.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        مشاهده وب‌سایت
                        <i className="bi bi-box-arrow-up-left" aria-hidden="true"></i>
                      </a>
                    </div>
                  )}

                  {example.note && (
                    <div className="pd-status">
                      <span className="pd-status__label">
                        <i className="bi bi-hourglass-split" aria-hidden="true"></i>
                        {example.note.label}
                      </span>
                      <p>{example.note.text}</p>
                    </div>
                  )}
                </aside>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------ مخاطبان */}
      {audience && (
        <section className="pd-audience section">
          <SectionTitle label="مناسب برای" title={audience.title} />
          <div className="container">
            {audience.text && (
              <div className="pd-audience__text" data-aos="fade-up" data-aos-delay="100">
                <span className="pd-audience__icon" aria-hidden="true">
                  <i className="bi bi-people"></i>
                </span>
                <p>{audience.text}</p>
              </div>
            )}

            {audience.items && (
              <div className="row pd-grid justify-content-center">
                {audience.items.map((item, i) => (
                  <div
                    className="col-md-6 col-xl-4"
                    key={item}
                    data-aos="fade-up"
                    data-aos-delay={100 + (i % 3) * 100}
                  >
                    <div className="pd-box">
                      <i className="bi bi-bullseye" aria-hidden="true"></i>
                      <h3>{item}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ------------------------------ متن پایانی و دعوت به اقدام */}
      <section className="pd-cta section">
        <div className="container" data-aos="fade-up">
          <div className="pd-cta__card">
            <div>
              <h2>برای این راهکار با ما صحبت کنید</h2>
              {closing && <p>{closing}</p>}
            </div>
            <div className="pd-cta__actions">
              <Link className="pd-btn pd-btn--primary" to={toContact}>
                درخواست مشاوره
                <i className="bi bi-arrow-left" aria-hidden="true"></i>
              </Link>
              <Link className="pd-btn pd-btn--ghost" to={toProducts}>
                مشاهده سایر محصولات
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------- محصول قبلی / بعدی */}
      {(prev || next) && (
        <section className="pd-pager section">
          <div className="container">
            <div className="pd-pager__grid">
              {prev && (
                <Link className="pd-pager__item" to={`/products/${prev.slug}`}>
                  <i className="bi bi-chevron-right" aria-hidden="true"></i>
                  <span>
                    <span className="pd-pager__label">محصول قبلی</span>
                    <span className="pd-pager__title">{prev.title}</span>
                  </span>
                </Link>
              )}
              {next && (
                <Link className="pd-pager__item pd-pager__item--next" to={`/products/${next.slug}`}>
                  <span>
                    <span className="pd-pager__label">محصول بعدی</span>
                    <span className="pd-pager__title">{next.title}</span>
                  </span>
                  <i className="bi bi-chevron-left" aria-hidden="true"></i>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default ProductDetail;