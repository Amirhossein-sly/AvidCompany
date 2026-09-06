import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Values from "../components/Values";
import Stats from "../components/Stats";
import Features from "../components/Features";
import AltFeatures from "../components/AltFeatures";
import Services from "../components/Services";
import FAQ from "../components/FAQ";
import Portfolio from "../components/Portfolio";
import Testimonials from "../components/Testimonials";
import Clients from "../components/Clients";
import Contact from "../components/Contact";
import ScrollTop from "../components/ScrollTop";

export default function Home() {  

  return (
    <>

    <Header/>
    
    <main className="main">
        <Hero/>

        <About/>

        <Values/>

        <Stats/>

        <Features/>

        <AltFeatures/>

        <Services/>

        <FAQ/>

        <Portfolio/>

        <Testimonials/>

        <Clients/>

        <Contact/>

    </main>

    <Footer/>

    <ScrollTop/>

    </>
  );
};
