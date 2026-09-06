const values = [
  {
    id: 1,
    image: "/assets/img/values-1.png",
    alt: "نماد رضایت مشتریان آوید",
    title: "رضایت مشتریان",
    text: "در آوید، رضایت مشتریان فقط یک هدف نیست، بلکه تعهدی است که در هر راهکار هوشمند، هر محصول و هر خدمت ما جاریست!",
  },
  {
    id: 2,
    image: "/assets/img/values-2.png",
    alt: "نماد خلق ارزش برای مشتریان آوید",
    title: "خلق ارزش برای مشتری",
    text: "ما در آوید، فقط محصولات را نمی‌سازیم، بلکه آینده‌ای هوشمندتر و کارآمدتر و با ارزش تر برای شما خلق می‌کنیم",
  },
  {
    id: 3,
    image: "/assets/img/values-3.png",
    alt: "نماد امنیت و سادگی در محصولات آوید",
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
                                <img src={value.image} className="img-fluid" alt={value.alt} loading="lazy" />
                                <h3>{value.title}</h3>
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