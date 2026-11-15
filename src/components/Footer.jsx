import SiteLink from "./SiteLink";

function Footer() {
    return (
        <footer id="footer" className="footer">
        {/* (جوین برای اخبار (شاید بعدا نیاز شود*/}
        {/*<div className="footer-newsletter">
            <div className="container">
                <div className="row justify-content-center text-center">
                    <div className="col-lg-6">
                        <h4>Join Our Newsletter</h4>
                        <p>Subscribe to our newsletter and receive the latest news about our products and services!</p>
                        <form action="forms/newsletter.php" method="post" className="php-email-form">
                            <div className="newsletter-form"><input type="email" name="email" /><input type="submit" value="Subscribe" /></div>
                            <div className="loading">Loading</div>
                            <div className="error-message"></div>
                            <div className="sent-message">Your subscription request has been sent. Thank you!</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>*/}
        <div className="footer-top">
            <div className="container ">
                <div className="row gy-4">
                    <div className="col-lg-3 col-md-6 footer-about">
                            <SiteLink hash="#hero" className="d-flex ">
                                <span className="sitename"><img style={{maxHeight: "36px"}} src="/assets/img/LOGO-AVID-T.png" alt="شرکت فناوری هوشمند آوید" /></span>
                            </SiteLink>
                            <div className="footer-contact pt-3">
                                <p>ایران - تهران</p>
                                <p> خیابان ولیعصر پلاک 110</p>
                                <p className="mt-3" style={{direction: "ltr", textAlign: "right"}}> <span>+98 21 88787878</span> <strong>:تلفن</strong></p>
                                <p><strong>ایمیل:</strong> <span>info@AvidCompany.ir</span></p>
                            </div>
                    </div>
                    <div className="col-lg-2 col-md-3 footer-links">
                        <h4>معرفی آوید</h4>
                        <ul>
                            <li><i className="bi bi-chevron-right"></i> <SiteLink hash="#hero">خانه</SiteLink></li>
                            <li><i className="bi bi-chevron-right"></i> <SiteLink hash="#about">درباره ما</SiteLink></li>
                            <li><i className="bi bi-chevron-right"></i> <SiteLink hash="#services">خدمات</SiteLink></li>
                            <li><i className="bi bi-chevron-right"></i> <SiteLink hash="#products">محصولات</SiteLink></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-3 footer-links">
                        <h4>خدمات آوید</h4>
                        <ul>
                            <li><i className="bi bi-chevron-right"></i> <a href="#">مشاوره فنی تخصصی</a></li>
                            <li><i className="bi bi-chevron-right"></i> <a href="#">توسعه راهکارهای نرم افزاری</a></li>
                            <li><i className="bi bi-chevron-right"></i> <a href="#">تحلیل و پردازش داده</a></li>
                            <li><i className="bi bi-chevron-right"></i> <a href="#">خدمات دانش بنیان</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <h4>شبکه های اجتماعی</h4>
                        <p>ما را در شبکه های اجتماعی دنبال کنید و آخرین اخبار ما را رصد کنید</p>
                        <div className="social-links d-flex">
                            {/* TODO: replace with the real profile URLs once available */}
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="توییتر آوید"><i className="bi bi-twitter-x"></i></a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="فیسبوک آوید"><i className="bi bi-facebook"></i></a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="اینستاگرام آوید"><i className="bi bi-instagram"></i></a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="لینکدین آوید"><i className="bi bi-linkedin"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container copyright text-center mt-4">
                
                <div className="credits" >
                    <p style={{textAlign: "center"}}>
                        کلیه حقوق برای شرکت گسترش فناوری های هوشمند
                        <a href="https://avidcompany.ir"><strong className="px-1 sitename">آوید</strong></a>
                        محفوظ می باشد.
                    </p>
                    <br / >
                    <p style={{direction: "ltr", textAlign: "center"}}>
                        Copyright © 2025 
                        <a href="https://avidcompany.ir">
                            <strong className="px-1 sitename"> Avid</strong>
</a>
                            AI Technology ® , All Rights Reserved.
</p>
                </div>
            </div>
        </div>
      
    </footer>
    );
    
};

export default Footer;