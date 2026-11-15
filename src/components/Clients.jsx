import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const clients = [
  { id: 1, image: "/assets/img/clients/enmarket-logo-light.webp", name: "نوین بازار" },
  { id: 2, image: "/assets/img/clients/novintech.svg", name: "نوین تک" },
  { id: 3, image: "/assets/img/clients/logoDentoral.svg", name: "درندانپزشکی زهرا" },
  { id: 4, image: "/assets/img/clients/bpums.png", name: "دانشگاه علوم پزشکی بوشهر" },
];

const SWIPER_BREAKPOINTS = {
  320: { slidesPerView: 2, spaceBetween: 15 },
  480: { slidesPerView: 2, spaceBetween: 25 },
  640: { slidesPerView: 3, spaceBetween: 30 },
  992: { slidesPerView: 4, spaceBetween: 40 },
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
