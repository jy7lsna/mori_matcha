import React, { useEffect } from "react";
import Hero from "../components/Hero.jsx";
import Marquee from "../components/Marquee.jsx";
import About from "../components/About.jsx";
import Menu from "../components/Menu.jsx";
import Feature from "../components/Feature.jsx";
import Specials from "../components/Specials.jsx";
import Testimonial from "../components/Testimonial.jsx";
import Hours from "../components/Hours.jsx";
import ContactForm from "../components/ContactForm.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Hero />
      <Marquee />
      <About />
      <Menu />
      <Feature />
      <Specials />
      <Testimonial />
      <Hours />
      <ContactForm />
      <Footer />
    </main>
  );
};

export default Home;
