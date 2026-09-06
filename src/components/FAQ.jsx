import { useState } from "react";

const faqs = [
  {
    question: "آیا میتوانم توسعه بازار محصولم را به آوید واگذار کنم؟",
    answer:
      "بله، ما با ایجاد شبکه گسترده ای در کشور میتوانیم محصولات نرم افزاری شما را با نام شما در کشور بازاریابی کرده و بازار شما را توسعه دهیم.",
  },
  {
    question: "ایا محصولات آوید در زمینه هوش مصنوعی هستند؟",
    answer:
      "بله، آوید با کمک تیمی از بهترین متخصصان هوش مصنوعی اقدام به توسعه محصولات دانش محور بر پایه هوش مصنوعی و یادگیری ماشین کرده است.",
  },
  {
    question: "آیا میتوانم از خدمات مشاوره آوید در شرکتم بهره ببرم؟",
    answer:
      "بله، شرکت شما میتواند از توان فنی و تخصصی آوید برای مشاوره در حوزه های پرداخت، مالی، تولید محصول، تحلیل داده و سایر حوزه های تخصصی آوید استفاده نماید.",
  },
  {
    question: "قیمت محصول آوید به چه صورت هست؟",
    answer:
      "غالب محصولات آوید به صورت سفارشی شده مشتریان تولید شده اند و میتوانید با تماس با مدیران فروش اطلاعات لازم را کسب کنید.",
  },
  {
    question: "آیا آوید در شهرستانها نیز نمایندگی داشته و خدمات ارائه میدهد؟",
    answer:
      "بله، آوید در تلاش هست با راه اندازی دفاتر استانی، بزودی شبکه خدمات را در سطح کل کشور گسترش دهد.",
  },
  {
    question: "چطور میتوانم محصول صندوق فروشگاهی شما را استفاده کنم؟",
    answer:
      "شما می توانید درخواست خود را از طریق وبسایت ما ثبت کنید یا با تماس با دفاتر ما، کارشناسان، شما را راهنمایی خواهند کرد.",
  },
];

// Split into two visual columns, matching the original two-column layout.
const half = Math.ceil(faqs.length / 2);
const columns = [faqs.slice(0, half), faqs.slice(half)];

function FaqItem({ faq, index, activeFaq, setActiveFaq }) {
  const isActive = activeFaq === index;
  const toggle = () => setActiveFaq(isActive ? null : index);

  return (
    <div className={`faq-item ${isActive ? "faq-active" : ""}`}>
      <h3 onClick={toggle}>{faq.question}</h3>
      <div className="faq-content">
        <p>{faq.answer}</p>
      </div>
      <i className="faq-toggle bi bi-chevron-right" onClick={toggle}></i>
    </div>
  );
}

function FAQ() {
  const [activeFaq, setActiveFaq] = useState(0);

  return (
    <section id="faq" className="faq section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>بیشتر بدانید</h2>
        <p>پرسش های متداول درباره آوید</p>
      </div>
      {/* End Section Title */}
      <div className="container">
        <div className="row">
          {columns.map((columnFaqs, columnIndex) => (
            <div
              key={columnIndex}
              className="col-lg-6"
              data-aos="fade-up"
              data-aos-delay={100 * (columnIndex + 1)}
            >
              <div className="faq-container">
                {columnFaqs.map((faq, i) => {
                  const globalIndex = columnIndex * half + i;
                  return (
                    <FaqItem
                      key={globalIndex}
                      faq={faq}
                      index={globalIndex}
                      activeFaq={activeFaq}
                      setActiveFaq={setActiveFaq}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;