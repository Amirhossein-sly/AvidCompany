import useCountUp from "../hooks/useCountUp";

const stats = [
  { id: "clients", icon: "bi-emoji-smile color-blue", end: 27, label: "مشتریان نهایی" },
  { id: "projects", icon: "bi-journal-richtext color-orange", end: 11, label: "پروژه ها", color: "#ee6c20" },
  { id: "services", icon: "bi-headset color-green", end: 15, label: "انواع خدمات", color: "#15be56" },
  { id: "products", icon: "bi-people color-pink", end: 6, label: "محصولات", color: "#bb0852" },
];

function StatItem({ icon, end, label, color }) {
  const [count, ref] = useCountUp(end);

  return (
    <div className="col-lg-3 col-md-6">
      <div className="stats-item d-flex align-items-center w-100 h-100">
        <i
          className={`bi ${icon} flex-shrink-0`}
          style={color ? { color } : undefined}
        ></i>
        <div>
          <span ref={ref}>{count}</span>
          <p>{label}</p>
        </div>
      </div>
    </div>
  );
}

function Stats() {
  return (
    <section id="stats" className="stats section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          {stats.map((item) => (
            <StatItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;