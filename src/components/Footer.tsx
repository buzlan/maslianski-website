import React from "react";
import YandexMap from "./YandexMap";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f9f8f6] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">

        <div>
          <h3 className="font-serif text-2xl text-[#1C2A44] mb-2">
            Маслянский Вячеслав Борисович
          </h3>

          <p className="text-gray-500 mb-4">Врач-флеболог</p>

          <p className="text-gray-700 leading-relaxed mb-4 max-w-md">
            Диагностика и лечение заболеваний вен. Индивидуальный подход,
            современная флебология и уважение к каждому пациенту.
          </p>

          <p className="text-gray-700">
            <strong>Адрес:</strong> г. Минск, ул. Героев 120-й дивизии, 3а
          </p>
        </div>

        <YandexMap />

      </div>

      <div className="text-center text-gray-500 text-sm mt-10">
        © 2025 Все права защищены
      </div>
    </footer>
  );
};

export default Footer;
