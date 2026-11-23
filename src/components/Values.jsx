import "./values-icon.css";

const values = [
  {
    id: 1,
    icon: "bi-hand-thumbs-up",
    title: "رضایت مشتریان",
    text: "در آوید، رضایت مشتریان فقط یک هدف نیست، بلکه تعهدی است که در هر راهکار هوشمند، هر محصول و هر خدمت ما جاریست!",
  },
  {
    id: 2,
    icon: "bi-gem",
    title: "خلق ارزش برای مشتری",
    text: "ما در آوید، فقط محصولات را نمی‌سازیم، بلکه آینده‌ای هوشمندتر و کارآمدتر و با ارزش تر برای شما خلق می‌کنیم",
  },
  {
    id: 3,
    icon: "bi-shield-check",
    title: "امنیت، توسعه و سادگی در کنار هم",
    text: "ما در آوید، پیچیدگی‌ها را کنار می‌زنیم تا شما با خیالی آسوده، کسب و کارتان را توسعه دهید و رشد کنید!",
  },
];

function Values() {
    return (
        <section id="values" className="values section">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
                <h2>ارزش های آوید</h2>
                <p>آنچه که برای ما ارزش دارد<br /></p>
            </div>{/* End Section Title */}
            <div className="container">
                <div className="row gy-4">
                    {values.map((value, index) => (
                        <div
                            key={value.id}
                            className="col-lg-4"
                            data-aos="fade-up"
                            data-aos-delay={100 * (index + 1)}
                        >
                            <div className="card">
                                <div className="values-head">
                                    <span className="values-icon" aria-hidden="true">
                                        <i className={`bi ${value.icon}`}></i>
                                    </span>
                                    <h3>{value.title}</h3>
                                </div>
                                <p>{value.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Values;