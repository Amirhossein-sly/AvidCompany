function Features() {
  return (
    <section id="products" className="features section">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
                <h2>محصولات</h2>
                <p>صندوق فروشگاهی و مدیریت رستوران هوشمند<br /></p>
            </div>{/* End Section Title */}
            <div className="container">
                <div className="row gy-5">
                    <div className="col-xl-6" data-aos="zoom-out" data-aos-delay="100">
                        <img src="/assets/img/features.png" className="img-fluid" alt="نمای صفحه محصول صندوق فروشگاهی و مدیریت رستوران آوید" />
                    </div>
                    <div className="col-xl-6 d-flex">
                        <div className="row align-self-center gy-4">
                            <div className="col-md-6" data-aos="fade-up" data-aos-delay="200">
                                <div className="feature-box d-flex align-items-center">
                                    <i className="bi bi-check"></i>
                                    <h3>یکپارچه با سیستم‌های حسابداری و مالی</h3>
                                </div>
                            </div>{/* End Feature Item */}
                            <div className="col-md-6" data-aos="fade-up" data-aos-delay="300">
                                <div className="feature-box d-flex align-items-center">
                                    <i className="bi bi-check"></i>
                                    <h3>رابط کاربری ساده، کاربرپسند و هوشمند</h3>
                                </div>
                            </div>{/* End Feature Item */}
                            <div className="col-md-6" data-aos="fade-up" data-aos-delay="400">
                                <div className="feature-box d-flex align-items-center">
                                    <i className="bi bi-check"></i>
                                    <h3>مدیریت موجودی و انبار به‌طور هوشمند</h3>
                                </div>
                            </div>{/* End Feature Item */}
                            <div className="col-md-6" data-aos="fade-up" data-aos-delay="500">
                                <div className="feature-box d-flex align-items-center">
                                    <i className="bi bi-check"></i>
                                    <h3>امکان انجام تراکنش‌های سریع و امن</h3>
                                </div>
                            </div>{/* End Feature Item */}
                            <div className="col-md-6" data-aos="fade-up" data-aos-delay="600">
                                <div className="feature-box d-flex align-items-center">
                                    <i className="bi bi-check"></i>
                                    <h3>پشتیبانی از چندین روش پرداخت</h3>
                                </div>
                            </div>{/* End Feature Item */}
                            <div className="col-md-6" data-aos="fade-up" data-aos-delay="700">
                                <div className="feature-box d-flex align-items-center">
                                    <i className="bi bi-check"></i>
                                    <h3>گزارش ‌گیری دقیق و تحلیل عملکرد کسب‌وکار</h3>
                                </div>
                            </div>{/* End Feature Item */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
  );
}

export default Features;