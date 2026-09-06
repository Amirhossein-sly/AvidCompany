function Hero() {
  return (
    <section id="hero" className="hero section">
            <div className="container">
                <div className="row gy-4">
                    <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                        <h1 data-aos="fade-up">آوید؛ هوشمندی در فناوری، تحول در کسب‌وکار</h1>
                        <p data-aos="fade-up" data-aos-delay="100">ما در آوید، با بهره‌ گیری از هوش مصنوعی، فناوری‌های ابری و راهکارهای پیشرفته نرم‌افزاری، محصولاتی را ارائه می‌دهیم که به بهینه‌سازی عملیات مالی، افزایش بهره‌وری و تحول دیجیتال کسب‌وکارها کمک می‌کند.</p>
                        <div className="d-flex flex-column flex-md-row" data-aos="fade-up" data-aos-delay="200">
                            <a href="#about" className="btn-get-started"> شروع کنید <i className="bi bi-arrow-left"></i></a>
                            <a href="#" className="glightbox btn-watch-video d-flex align-items-center justify-content-center ms-0 ms-md-4 mt-4 mt-md-0"><i className="bi bi-play-circle"></i> <span>مشاهده ویدیو</span> </a>
                        </div>
                    </div>
                    <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-out">
                        <img src="/assets/img/hero-img.png" className="img-fluid animated" alt="" />
                    </div>
                </div>
            </div>
        </section>
  );
};

export default Hero;