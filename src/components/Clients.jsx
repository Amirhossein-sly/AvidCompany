import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const clients = [
  { id: 1, image: "/assets/img/clients/client-1.png", name: "مشتری ۱" },
  { id: 2, image: "/assets/img/clients/client-2.png", name: "مشتری ۲" },
  { id: 3, image: "/assets/img/clients/client-3.png", name: "مشتری ۳" },
  { id: 4, image: "/assets/img/clients/client-4.png", name: "مشتری ۴" },
  { id: 5, image: "/assets/img/clients/client-5.png", name: "مشتری ۵" },
  { id: 6, image: "/assets/img/clients/client-6.png", name: "مشتری ۶" },
  { id: 7, image: "/assets/img/clients/client-7.png", name: "مشتری ۷" },
  { id: 8, image: "/assets/img/clients/client-8.png", name: "مشتری ۸" },
];

const SWIPER_BREAKPOINTS = {
  320: { slidesPerView: 2, spaceBetween: 40 },
  480: { slidesPerView: 3, spaceBetween: 60 },
  640: { slidesPerView: 4, spaceBetween: 80 },
  992: { slidesPerView: 6, spaceBetween: 120 },
};

function Clients() {
  return (
    <section id="clients" className="clients section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>مشتریان آوید</h2>
        <p>
          برخی از بهترین مشتریان آوید
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
          wrapperClass="swiper-wrapper align-items-center"
        >
          {clients.map((client) => (
            <SwiperSlide key={client.id}>
              <img
                src={client.image}
                className="img-fluid"
                alt={client.name}
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Clients;
