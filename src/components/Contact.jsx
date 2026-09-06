import { useState } from "react";


function Contact() {


    const [ contactLoading, setContactLoading] = useState(false);
    const [ contactError, setContactError ] = useState("");
    const [ contactSent, setContactSent] = useState(false);

        /*email form handler */
    const handleContactSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const action = form.getAttribute("action");

    if (!action) {
        setContactError("The form action property is not set!");
        return;
    }

    // Honeypot spam check: real visitors never see or fill this field
    // (hidden via CSS below), so if it has a value the submission is
    // almost certainly from a bot. Pretend success and stop silently
    // instead of telling the bot its submission was rejected.
    const honeypotValue = form.elements["website"]?.value;
    if (honeypotValue) {
        setContactSent(true);
        form.reset();
        return;
    }

    setContactLoading(true);
    setContactError("");
    setContactSent(false);

    const formData = new FormData(form);

    try {
        const response = await fetch(action, {
            method: "POST",
            body: formData,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
        });

        if (!response.ok) {
            throw new Error(
                `${response.status} ${response.statusText} ${response.url}`
            );
        }

        const data = await response.text();

        if (data.trim() === "OK") {
            setContactSent(true);
            form.reset();
        } else {
            throw new Error(
                data ||
                `Form submission failed and no error message returned from: ${action}`
            );
        }
    } catch (error) {
        setContactError(error.message);
    } finally {
        setContactLoading(false);
    }
};




    return (
        <section id="contact" className="contact section">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
                <h2>تماس با ما</h2>
                <p>با ما در تماس باشید</p>
            </div>{/* End Section Title */}
            <div className="container" data-aos="fade-up" data-aos-delay="100">
                <div className="row gy-4">
                    <div className="col-lg-6">
                        <div className="row gy-4">
                            <div className="col-md-6">
                                <div className="info-item" data-aos="fade" data-aos-delay="200">
                                    <i className="bi bi-geo-alt" aria-hidden="true"></i>
                                    <h3>آدرس دفتر مرکزی</h3>
                                    <p>ایران - تهران</p>
                                    <p> خیابان ولیعصر پلاک 110</p>
                                </div>
                            </div>{/* End Info Item */}
                            <div className="col-md-6">
                                <div className="info-item" data-aos="fade" data-aos-delay="300">
                                    <i className="bi bi-telephone" aria-hidden="true"></i>
                                    <h3>تلفن</h3>
                                    <p style={{direction: "ltr", textAlign: "right"}}>+98 21 8878 8878</p>
                                    <p style={{direction: "ltr", textAlign: "right"}}>+98 21 8878 8878</p>
                                </div>
                            </div>{/* End Info Item */}
                            <div className="col-md-6">
                                <div className="info-item" data-aos="fade" data-aos-delay="400">
                                    <i className="bi bi-envelope" aria-hidden="true"></i>
                                    <h3>پست الکترونیک</h3>
                                    <p>info@AvidCompany.ir</p>
                                    <p>contact@AvidCompany.ir</p>
                                </div>
                            </div>{/* End Info Item */}
                            <div className="col-md-6">
                                <div className="info-item" data-aos="fade" data-aos-delay="500">
                                    <i className="bi bi-clock" aria-hidden="true"></i>
                                    <h3>ساعات کار</h3>
                                    <p>شنبه - چهارشنبه</p>
                                    <p>9:00AM - 05:00PM</p>
                                </div>
                            </div>{/* End Info Item */}
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <form action="forms/contact.php" method="post" className="php-email-form" data-aos="fade-up" data-aos-delay="200" onSubmit={handleContactSubmit}>
                            {/* Honeypot: hidden from real users, bots often fill every field. */}
                            <input
                                type="text"
                                name="website"
                                tabIndex="-1"
                                autoComplete="off"
                                style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
                                aria-hidden="true"
                            />
                            <div className="row gy-4">
                                <div className="col-md-6">
                                    <label htmlFor="contact-name" className="visually-hidden">نام و نام خانوادگی</label>
                                    <input id="contact-name" type="text" name="name" className="form-control" placeholder="نام و نام خانوادگی" required />
                                </div>
                                <div className="col-md-6 ">
                                    <label htmlFor="contact-email" className="visually-hidden">آدرس ایمیل</label>
                                    <input id="contact-email" type="email" className="form-control" name="email" placeholder="آدرس ایمیل" required />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="contact-subject" className="visually-hidden">موضوع</label>
                                    <input id="contact-subject" type="text" className="form-control" name="subject" placeholder="موضوع" required />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="contact-message" className="visually-hidden">متن پیام</label>
                                    <textarea id="contact-message" className="form-control" name="message" rows="6" placeholder="متن پیام" required></textarea>
                                </div>
                                <div className="col-12 text-center">
                                    <div className={`loading ${contactLoading ? "d-block" : ""}`} role="status" aria-live="polite">
                                        Loading
                                    </div>

                                    <div className={`error-message ${contactError ? "d-block" : ""}`} role="alert" aria-live="assertive">
                                        {contactError}
                                    </div>

                                    <div className={`sent-message ${contactSent ? "d-block" : ""}`} role="status" aria-live="polite">
                                       پیام شما ارسال شد، با تشکر
                                    </div>
                                    <button type="submit" disabled={contactLoading}>
                                        {contactLoading ? "در حال ارسال..." : "ارسال پیام"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>{/* End Contact Form */}
                </div>
            </div>
        </section>
    );
};

export default Contact;