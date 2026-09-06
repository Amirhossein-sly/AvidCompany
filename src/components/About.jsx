function About() {
    return(
        <section id="about" className="about section">
            <div className="container" data-aos="fade-up">
                <div className="row gx-0">
                    <div className="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
                        <div className="content">
                            <h3>درباره آوید </h3>
                            <h2>ما به دنبال توسعه راهکارهای مبتنی بر دانش در حوزه های پرداخت، مالی، هوش مصنوعی و تکنولوژی های نوین هستیم</h2>
                            <p>
                                ما توانسته ایم با کمک  تیم هایی از بهترین متخصصین حوزه فناوری با تجاربی بیش از دو دهه، طی سالهای گذشته محصولاتی را در حوزه های هوش مصنوعی، دستیار هوشمند، سامانه های هوشمند مالی، سامانه های پرداخت، حسابداری، صندوق های فروشگاهی و همچنین مدیریت رستوران  توسعه بدهیم که محصولاتی ارزشمند و قابل اتکا هستند.

                            </p>
                            <div className="text-center text-lg-start">
                                <a href="#" className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
                                    <span>بیشتر بدانید</span>
                                    <i className="bi bi-arrow-left"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
                        <img src="/assets/img/about.jpg" className="img-fluid" alt="تیم فناوری آوید در حال کار روی راهکارهای نرم‌افزاری" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;