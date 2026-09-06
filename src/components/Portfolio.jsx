import useIsotope from "../hooks/useIsotope";
import useGLightbox from "../hooks/useGlightbox";


const portfolioFilters = [
  { filter: "*", label: "همه موارد" },
  { filter: ".filter-product", label: "توسعه محصول" },
  { filter: ".filter-AI", label: "هوش مصنوعی" },
  { filter: ".filter-Data", label: "تحلیل داده" },
  { filter: ".filter-security", label: "امنیت اطلاعات" },
];


const portfolioItems = [
  {
    id: 1,
    filter: "filter-security",
    image: "/assets/img/portfolio/app-1.jpg",
    title: "امنیت اطلاعات",
    description: "محصول امنیت اطلاعات شبکه",
    gallery: "portfolio-gallery-app",
    imageTitle: "App 1",
  },
  {
    id: 2,
    filter: "filter-product",
    image: "/assets/img/portfolio/product-1.jpg",
    title: "صندوق فروشگاهی",
    description: "مدیریت کسب و کار فروشگاهی",
    gallery: "portfolio-gallery-product",
    imageTitle: "Product 1",
  },
  {
    id: 3,
    filter: "filter-AI",
    image: "/assets/img/portfolio/branding-1.jpg",
    title: "هوش مصنوعی",
    description: "چت بات هوشمند",
    gallery: "portfolio-gallery-branding",
    imageTitle: "Branding 1",
  },
  {
    id: 4,
    filter: "filter-Data",
    image: "/assets/img/portfolio/books-1.jpg",
    title: "تحلیل داده",
    description: "داشبورد تحلیل و گزارش‌گیری داده",
    gallery: "portfolio-gallery-book",
    imageTitle: "Data 1",
  },
  {
    id: 5,
    filter: "filter-security",
    image: "/assets/img/portfolio/app-2.jpg",
    title: "امنیت اطلاعات",
    description: "محصول امنیت اطلاعات آوید",
    gallery: "portfolio-gallery-app",
    imageTitle: "App 2",
  },
  {
    id: 6,
    filter: "filter-product",
    image: "/assets/img/portfolio/product-2.jpg",
    title: "صندوق فروشگاهی",
    description: "محصول مدیریت رستوران",
    gallery: "portfolio-gallery-product",
    imageTitle: "Product 2",
  },
  {
    id: 7,
    filter: "filter-AI",
    image: "/assets/img/portfolio/branding-2.jpg",
    title: "هوش مصنوعی",
    description: "محصول هوشمند چت بات",
    gallery: "portfolio-gallery-branding",
    imageTitle: "Branding 2",
  },
  {
    id: 8,
    filter: "filter-Data",
    image: "/assets/img/portfolio/books-2.jpg",
    title: "تحلیل داده",
    description: "ابزار هوشمند تحلیل داده",
    gallery: "portfolio-gallery-book",
    imageTitle: "Branding 2",
  },
  {
    id: 9,
    filter: "filter-security",
    image: "/assets/img/portfolio/app-3.jpg",
    title: "امنیت اطلاعات",
    description: "محصول امنیت اطلاعات",
    gallery: "portfolio-gallery-app",
    imageTitle: "App 3",
  },
  {
    id: 10,
    filter: "filter-product",
    image: "/assets/img/portfolio/product-3.jpg",
    title: "محصول حسابداری",
    description: "حسابداری و مدیریت مالی شرکت",
    gallery: "portfolio-gallery-product",
    imageTitle: "Product 3",
  },
  {
    id: 11,
    filter: "filter-AI",
    image: "/assets/img/portfolio/branding-3.jpg",
    title: "هوش مصنوعی",
    description: "تشخیص تقلب با هوش مصنوعی",
    gallery: "portfolio-gallery-branding",
    imageTitle: "Branding 3",
  },
  {
    id: 12,
    filter: "filter-Data",
    image: "/assets/img/portfolio/books-3.jpg",
    title: "تحلیل داده",
    description: "تحلیل هوشمند داده های بزرگ",
    gallery: "portfolio-gallery-book",
    imageTitle: "Branding 3",
  },
];

function Portfolio() {

    useGLightbox()
    useIsotope();

    return(
        <section id="portfolio" className="portfolio section">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
                <h2>چشم انداز</h2>
                <p>چشم انداز آوید در راه توسعه</p>
            </div>{/* End Section Title */}
            <div className="container">
                <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
                    <ul
                        className="portfolio-filters isotope-filters"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        {portfolioFilters.map((item, index) => (
                            <li
                                key={item.filter}
                                data-filter={item.filter}
                                className={index === 0 ? "filter-active" : ""}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>{/* End Portfolio Filters */}
                    <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
                        {portfolioItems.map((item) => (
                            <div
                                key={item.id}
                                className={`col-lg-4 col-md-6 portfolio-item isotope-item ${item.filter}`}
                            >
                                <div className="portfolio-content h-100">
                                    <img
                                        src={item.image}
                                        className="img-fluid"
                                        alt={item.title}
                                        loading="lazy"
                                    />

                                    <div className="portfolio-info">
                                        <h4>{item.title}</h4>

                                        <p>{item.description}</p>

                                        <a
                                        href={item.image}
                                        title={item.imageTitle}
                                        data-gallery={item.gallery}
                                        className="glightbox preview-link"
                                        >
                                            <i className="bi bi-zoom-in"></i>
                                        </a>

                                        <a
                                        href="#"
                                        title="More Details"
                                        className="details-link"
                                        >
                                        <i className="bi bi-link-45deg"></i>
                                        </a>
                                    </div>
                                    </div>
                                </div>
                            ))}
                    </div>{/* End Portfolio Container */}
                </div>
            </div>
        </section>
    )
}

export default Portfolio