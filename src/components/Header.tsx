import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleServiceMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const scrollToSection = () => {
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        const headerHeight = 80; // Высота хедера
        const offset = 20; // Дополнительный отступ для красоты
        const elementPosition = sectionElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "auto"
        });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToSection, 100);
    } else {
      scrollToSection();
    }
  };

  const handleMobileMenuClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const scrollToSection = () => {
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        const headerHeight = 80;
        const offset = 20;
        const elementPosition = sectionElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "auto"
        });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToSection, 100);
    } else {
      scrollToSection();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl shadow-[0_2px_6px_rgba(0,0,0,0.04)] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">

          <div className="flex items-center gap-4 group/logo cursor-default">
            <img 
              src="/images/logo.jpeg" 
              alt="Маслянский Вячеслав Борисович - Врач-флеболог"
              className="h-12 w-12 rounded-2xl object-cover shadow transition-transform duration-300 group-hover/logo:scale-105"
            />

            <div className="leading-tight">
              <div className="font-serif text-[18px] text-[#1C2A44] font-semibold transition-colors duration-300 group-hover/logo:text-[#C5A572]">
                Маслянский Вячеслав Борисович
              </div>
              <div className="text-xs text-gray-500 tracking-wide">
                врач-флеболог
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-[#1C2A44]">

            <div className="relative group">
              <button className="inline-flex items-center gap-1 hover:text-[#C5A572] transition-all duration-300 hover:-translate-y-0.5">
                <span className="relative">
                  Услуги
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C5A572] transition-all duration-300 group-hover:w-full"></span>
                </span>
                <span className="text-xs transition-transform duration-300 group-hover:rotate-180">▼</span>
              </button>

              <div className="absolute left-0 mt-2 w-52 rounded-xl bg-white shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-[-10px]">
                <a 
                  href="#when" 
                  onClick={(e) => handleServiceMenuClick(e, "when")}
                  className="block px-4 py-2 hover:bg-gray-50 transition-all duration-200 hover:translate-x-1"
                >
                  Когда обращаться
                </a>
                <a 
                  href="#services" 
                  onClick={(e) => handleServiceMenuClick(e, "services")}
                  className="block px-4 py-2 hover:bg-gray-50 transition-all duration-200 hover:translate-x-1"
                >
                  Диагностика и лечение
                </a>
                <a 
                  href="#approach" 
                  onClick={(e) => handleServiceMenuClick(e, "approach")}
                  className="block px-4 py-2 hover:bg-gray-50 transition-all duration-200 hover:translate-x-1"
                >
                  Подход
                </a>
                <a 
                  href="#faq" 
                  onClick={(e) => handleServiceMenuClick(e, "faq")}
                  className="block px-4 py-2 hover:bg-gray-50 transition-all duration-200 hover:translate-x-1"
                >
                  FAQ
                </a>
              </div>
            </div>

            <a 
              href="#contacts" 
              onClick={(e) => handleServiceMenuClick(e, "contacts")}
              className="relative group/link hover:text-[#C5A572] transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="relative">
                Контакты
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C5A572] transition-all duration-300 group-hover/link:w-full"></span>
              </span>
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* <a
              href="https://prodoctorov.ru/moskva/vrach/1316162-maslyanskiy/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#1C2A44] text-[#1C2A44] px-6 py-2.5 text-sm font-semibold hover:bg-[#1C2A44] hover:text-white transition-all duration-300 hover:scale-105"
            >
              Отзыв
            </a> */}
            <a
              href="#contacts"
              onClick={handleContactsClick}
              className="rounded-full bg-[#C5A572] text-white px-6 py-2.5 text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 hover:scale-105"
            >
              Запись
            </a>
          </div>

          {/* Мобильное меню кнопка */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#1C2A44] hover:text-[#C5A572] transition-all duration-300 hover:rotate-90"
            aria-label="Меню"
          >
            <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

        </div>

        {/* Мобильное меню */}
        <div className={`md:hidden border-t border-gray-200 overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-[800px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
        }`}>
            <nav className="flex flex-col space-y-4">
              <div className="space-y-2">
                <div className="text-[#1C2A44] font-semibold py-2">Услуги</div>
                <a
                  href="#when"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMobileMenuClick("when");
                  }}
                  className="block text-gray-600 hover:text-[#C5A572] transition-all duration-300 py-2 pl-4 hover:translate-x-1"
                >
                  Когда обращаться
                </a>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMobileMenuClick("services");
                  }}
                  className="block text-gray-600 hover:text-[#C5A572] transition-all duration-300 py-2 pl-4 hover:translate-x-1"
                >
                  Диагностика и лечение
                </a>
                <a
                  href="#approach"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMobileMenuClick("approach");
                  }}
                  className="block text-gray-600 hover:text-[#C5A572] transition-all duration-300 py-2 pl-4 hover:translate-x-1"
                >
                  Подход
                </a>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMobileMenuClick("faq");
                  }}
                  className="block text-gray-600 hover:text-[#C5A572] transition-all duration-300 py-2 pl-4 hover:translate-x-1"
                >
                  FAQ
                </a>
              </div>

              <a
                href="#contacts"
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileMenuClick("contacts");
                }}
                className="text-[#1C2A44] hover:text-[#C5A572] transition-all duration-300 py-2 hover:translate-x-1"
              >
                Контакты
              </a>

              <div className="pt-4 space-y-3 border-t border-gray-200">
                {/* <a
                  href="https://prodoctorov.ru/moskva/vrach/1316162-maslyanskiy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center rounded-full border border-[#1C2A44] text-[#1C2A44] px-6 py-2.5 text-sm font-semibold hover:bg-[#1C2A44] hover:text-white transition-all duration-300 active:scale-95"
                >
                  Отзыв
                </a> */}
                <a
                  href="#contacts"
                  onClick={(e) => {
                    e.preventDefault();
                    handleContactsClick(e);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block text-center rounded-full bg-[#C5A572] text-white px-6 py-2.5 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
                >
                  Запись
                </a>
              </div>
            </nav>
          </div>
      </div>
    </header>
  );
};

export default Header;
