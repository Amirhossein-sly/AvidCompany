import { Link } from "react-router-dom";

// تعداد مشخصاتی که روی کارت صفحه اصلی نشان داده می‌شود (طرح ۲×۲)
const MAX_HIGHLIGHTS = 4;

function ProductCard({ product, ctaLabel }) {
  const { slug, icon, title, summary, image, imageAlt, highlights } = product;

  return (
    <article className="product-card">
      <div className="product-card__media">
        <img src={image} alt={imageAlt} loading="lazy" decoding="async" />
      </div>

      <div className="product-card__body">
        <span className="product-card__icon" aria-hidden="true">
          <i className={`bi ${icon}`}></i>
        </span>

        <h3 className="product-card__title">{title}</h3>
        <p className="product-card__summary">{summary}</p>

        <ul className="product-card__highlights">
          {highlights.slice(0, MAX_HIGHLIGHTS).map((item) => (
            <li className="product-card__highlight" key={item.title}>
              <i className={`bi ${item.icon}`} aria-hidden="true"></i>
              <span>{item.title}</span>
            </li>
          ))}
        </ul>

        <Link to={`/products/${slug}`} className="product-card__cta">
          {ctaLabel}
          <i className="bi bi-arrow-left" aria-hidden="true"></i>
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;