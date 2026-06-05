import { useLayoutEffect, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import WhenToSee from "../components/WhenToSee";
import Services from "../components/Services";
import ServicesGrid from "../components/ServicesGrid";
import Approach from "../components/Approach";
import Faq from "../components/Faq";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import ScrollAnimation from "../components/ScrollAnimation";
import { scrollToSectionId } from "../lib/scroll";

const Home: React.FC = () => {
  const location = useLocation();

  const targetSectionId = location.state?.scrollToServices
    ? "services-grid"
    : location.state?.scrollTo;

  useLayoutEffect(() => {
    if (targetSectionId) {
      scrollToSectionId(targetSectionId);
    }
  }, [targetSectionId]);

  useEffect(() => {
    if (!targetSectionId) return;

    requestAnimationFrame(() => {
      scrollToSectionId(targetSectionId);
    });
  }, [targetSectionId]);

  return (
    <>
      <Header />

      <main className="min-w-0 flex-1 w-full">
        <Hero />
        <ScrollAnimation delay={100}>
          <WhenToSee />
        </ScrollAnimation>
        <ScrollAnimation delay={200}>
          <Services />
        </ScrollAnimation>
        <ScrollAnimation delay={100}>
          <ServicesGrid />
        </ScrollAnimation>
        <ScrollAnimation delay={200}>
          <Approach />
        </ScrollAnimation>
        <ScrollAnimation delay={200}>
          <Faq />
        </ScrollAnimation>
        <ScrollAnimation delay={100}>
          <ContactSection />
        </ScrollAnimation>
      </main>

      <Footer />
    </>
  );
};

export default Home;
