import React from "react";
import { Link } from "react-router-dom";

interface ServiceCard {
  id: string;
  title: string;
  image: string;
  link: string;
}

const services: ServiceCard[] = [
  {
    id: "evlk",
    title: "ЭВЛК - Эндовенозная лазерная коагуляция под контролем УЗИ",
    image: "/images/evlkMain.jpeg",
    link: "/services/evlk",
  },
  {
    id: "phlebectomy",
    title: "Минифлебэктомия",
    image: "/images/miniflebectomia-main.png",
    link: "/services/phlebectomy",
  },
  {
    id: "sclerotherapy",
    title: "Склеротерапия",
    image: "/images/sclero-main.png",
    link: "/services/sclerotherapy",
  },
  {
    id: "telangiectasia",
    title: "Телеангиоэктазии (сосудистые звёздочки)",
    image: "/images/telangiectasia.jpeg",
    link: "/services/telangiectasia",
  },
];

const ServicesGrid: React.FC = () => {
  return (
    <section id="services-grid" className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-serif text-4xl md:text-5xl text-[#1C2A44] mb-12">
          Виды операций и манипуляций
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              to={service.link}
              className="group relative overflow-hidden rounded-3xl shadow-xl border border-gray-200 bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 active:scale-[0.98] active:translate-y-0"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/80" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 transition-transform duration-300 group-hover:translate-y-[-4px]">
                <h3 className="text-white font-semibold text-base md:text-lg leading-tight drop-shadow-lg transition-all duration-300 group-hover:text-[#C5A572]">
                  {service.title}
                </h3>
              </div>

              <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                <svg className="w-5 h-5 text-[#1C2A44]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;

