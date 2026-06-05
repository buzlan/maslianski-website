import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import person from "../images/person.jpeg";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleContactsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const contactsElement = document.getElementById("contacts");
        if (contactsElement) {
          contactsElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const contactsElement = document.getElementById("contacts");
      if (contactsElement) {
        contactsElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="top"
      className="hero-bg pt-16 md:pt-24 pb-20 md:pb-28"
    >
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-[60%_40%] gap-12 items-start">
        
        <div>
          <p className="inline-flex items-center gap-2 bg-white/80 px-4 py-1 rounded-full text-gray-600 text-sm shadow">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Приём врача-флеболога
          </p>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1C2A44] mt-4 mb-6 leading-tight">
            <span className="block">Врач флеболог в Минске</span>
            <hr className="my-3 border-t-2 border-[#C5A572] w-11/12" />
            <span className="block">Забота о здоровье вен</span>
            <span className="block">и внимательный подход</span>
          </h1>

          <div className="text-gray-700 text-base md:text-lg max-w-lg mb-6 space-y-4">
            <p>
              Маслянский Вячеслав Борисович — врач-флеболог, специализирующийся на диагностике и лечении острых и хронических заболеваний вен.
            </p>
            <p>
              Современные методики и индивидуальная тактика лечения.
            </p>
            <p>
              Внимательно разбирает жалобы, особенности образа жизни и наследственные факторы.
            </p>
            <p>
              Доступно объясняет пациенту, что происходит с венами и какие варианты лечения подходят именно ему.
            </p>
            <p>
              В работе придерживается современного доказательного подхода с акцентом на профилактику осложнений и улучшение качества жизни.
            </p>
          </div>

          <div>
            <a
              href="#contacts"
              onClick={handleContactsClick}
              className="inline-block px-6 py-3 rounded-full bg-[#1C2A44] text-white font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
            >
              Записаться
            </a>
          </div>
        </div>

        <div className="flex justify-center md:justify-end md:mt-10">
            <div className="bg-white rounded-3xl shadow-xl border border-white/70 overflow-hidden w-[320px] md:w-[380px] lg:w-[420px]">
            <div className="w-full bg-white flex justify-center">
              <img
                src={person}
                alt="Маслянский Вячеслав Борисович"
                className="w-full object-contain"
              />
            </div>

            <div className="p-6">
              <p className="font-serif text-xl text-[#1C2A44] mt-1">
                Маслянский Вячеслав Борисович
              </p>

              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              Врач-флеболог, Член Ассоциации Флебологов России, Член Белорусской  Ассоциации ангиологов и сосудистых хирургов.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
