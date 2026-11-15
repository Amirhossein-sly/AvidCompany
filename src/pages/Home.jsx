import Hero from "../components/Hero";
import About from "../components/About";
import Values from "../components/Values";
import Stats from "../components/Stats";
import Services from "../components/Services";
import FAQ from "../components/FAQ";
import Portfolio from "../components/Portfolio";
import Testimonials from "../components/Testimonials";
import Clients from "../components/Clients";
import Contact from "../components/Contact";
import Products from "../components/Products/Products";

// هدر، فوتر و ScrollTop حالا در components/Layout.jsx هستند و بین همه‌ی صفحه‌ها مشترک‌اند
export default function Home() {

  return (
    <main className="main">
        <Hero/>

        <About/>

        <Values/>

        <Stats/>

        <Products/>

        <Services/>

        <FAQ/>

        <Portfolio/>

        <Testimonials/>

        <Clients/>

        <Contact/>

    </main>
  );
};