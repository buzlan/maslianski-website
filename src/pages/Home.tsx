import { useLayoutEffect, useEffect } from "react"
import { useLocation } from "react-router-dom"
import Header from "../components/Header"
import Hero from "../components/Hero"
import WhenToSee from "../components/WhenToSee"
import Services from "../components/Services"
import ServicesGrid from "../components/ServicesGrid"
import Approach from "../components/Approach"
import Faq from "../components/Faq"
import ContactSection from "../components/ContactSection"
import Footer from "../components/Footer"
import ScrollAnimation from "../components/ScrollAnimation"

const Home: React.FC = () => {
  const location = useLocation();

  const scrollToServices = () => {
    const servicesGridElement = document.getElementById("services-grid");
    if (servicesGridElement) {
      servicesGridElement.scrollIntoView({ behavior: "auto" });
      return true;
    }
    return false;
  };

  useLayoutEffect(() => {
    // Если пришли с флагом scrollToServices, сразу прокручиваем к карточкам
    // useLayoutEffect выполняется синхронно перед отрисовкой
    if (location.state?.scrollToServices) {
      scrollToServices();
    }
  }, [location.state]);

  useEffect(() => {
    // Резервная попытка, если элемент еще не отрендерился
    if (location.state?.scrollToServices) {
      requestAnimationFrame(() => {
        if (!scrollToServices()) {
          // Еще одна попытка через минимальную задержку
          requestAnimationFrame(() => {
            scrollToServices();
          });
        }
      });
    }
  }, [location.state]);

  return (
    <>
      <Header />

      <main className="flex-1">
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
  )
}

export default Home

