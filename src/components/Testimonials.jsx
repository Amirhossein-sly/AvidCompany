import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    text: "با اینکه قبلا تجربه استفاده از یک نرم افزار صندوق فروشگاهی رو داشتم، زمانیکه محصول صندوق فروشگاهی آوید-پیشگامان رو استفاده کردم متوجه کارکردهای قابل توجه آن نسبت به محصول قبلی شدم و به شدت آنرا توصیه میکنم.",
    image: "/assets/img/testimonials/maziarRazavi.jpg",
    name: "مازیار رضوی",
    role: "مدیر فروش",
  },
  {
    id: 2,
    text: "ما با توجه به تعدد صندوق های فروش، مدیریت فروش و تامین محصول پیچیده ای داشتیم که بدون استفاده از محصول هوشمند صندوق فروشگاهی آوید-پیشگامان نمی توانستیم از پس مشکلات بر بیاییم.",
    image: "/assets/img/testimonials/nazaninmehrabani.jpg",
    name: "نازنین مهربانی",
    role: "مدیر فروشگاه",
  },
  {
    id: 3,
    text: "مشاوره های شرکت آوید و راهکارهایی که ارائه کردند خیلی سریع تونست ما رو پیش ببره و کارهایی که شاید چندین ماه زمان می برد، فقط در چند هفته انجام شد.",
    image: "/assets/img/testimonials/maryamTehrani.png",
    name: "مریم تهرانی",
    role: "مدیر رستوران",
  },
  {
    id: 4,
    text: "تصور می کنم شرکت آوید با کمک نیروهای متخصص و خبره ای که داره، آینده درخشانی داشته باشه و باید این نام رو از الان در ذهنمون جا بندازیم و بزودی زیاد درباره ش می شنویم.",
    image: "/assets/img/testimonials/yasharmohseni.jpg",
    name: "یاشار محسنی",
    role: "بازاریاب دیجیتال",
  },
  {
    id: 5,
    text: "دانش شرکت آوید در حوزه محصولات هوش مصنوعی به همراه جدیت و تیم قوی و با انگیزه، قطعا یک برگ برنده برای این شرکت هست که میتواند بازار خوبی برای آن ایجاد کند. ما از همکاری با آوید لذت بردیم.",
    image: "/assets/img/testimonials/ahmadyarjani.jpg",
    name: "احمد یارجانی",
    role: "کارآفرین",
  },
];

// Breakpoints kept as constants outside the component so they aren't
// re-created on every render.
const SWIPER_BREAKPOINTS = {
  320: { slidesPerView: 1, spaceBetween: 40 },
  1200: { slidesPerView: 3, spaceBetween: 20 }, // note: original had spaceBetween: 1 (likely a typo)
};

function Testimonials() {
  return (
    <section id="testimonials" className="testimonials section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>رضایتنامه ها</h2>
        <p>
          دیگران درباره آوید چه می گویند
          <br />
        </p>
      </div>
      {/* End Section Title */}

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <Swiper
          modules={[Autoplay, Pagination]}
          loop
          speed={600}
          autoplay={{ delay: 5000 }}
          slidesPerView="auto"
          pagination={{ clickable: true }}
          breakpoints={SWIPER_BREAKPOINTS}
          className="init-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="testimonial-item">
                <div className="stars" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <i key={index} className="bi bi-star-fill"></i>
                  ))}
                </div>

                <p>{testimonial.text}</p>

                <div className="profile mt-auto">
                  <img
                    src={testimonial.image}
                    className="testimonial-img"
                    alt={testimonial.name}
                    loading="lazy"
                  />
                  <h3>{testimonial.name}</h3>
                  <h4>{testimonial.role}</h4>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Testimonials;
