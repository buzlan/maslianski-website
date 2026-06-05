import React, { useEffect, useMemo, useState } from "react";
import CountryFlag from "./CountryFlag";

interface Country {
  code: string;
  name: string;
  phoneCode: string;
  mask: string;
  placeholder: string;
}

const countries: Country[] = [
  { code: "RU", name: "Россия", phoneCode: "+7", mask: "+7 (###) ###-##-##", placeholder: "(999) 123-45-67" },
  { code: "BY", name: "Беларусь", phoneCode: "+375", mask: "+375 (##) ###-##-##", placeholder: "(29) 123-45-67" },
  { code: "KZ", name: "Казахстан", phoneCode: "+7", mask: "+7 (###) ###-##-##", placeholder: "(777) 123-45-67" },
  { code: "AM", name: "Армения", phoneCode: "+374", mask: "+374 (##) ###-###", placeholder: "(91) 123-456" },
  { code: "GE", name: "Грузия", phoneCode: "+995", mask: "+995 (###) ###-###", placeholder: "(555) 123-456" },
];

const getLocalDigits = (value: string, country: Country): string => {
  let digits = value.replace(/\D/g, "");
  const codeDigits = country.phoneCode.replace("+", "");

  if (digits.startsWith(codeDigits)) {
    digits = digits.slice(codeDigits.length);
  }

  return digits;
};

const formatLocalPhone = (value: string, country: Country): string => {
  const numbers = getLocalDigits(value, country);

  if (country.code === "RU" || country.code === "KZ") {
    if (numbers.length <= 3) {
      return numbers ? `(${numbers}` : "";
    }
    if (numbers.length <= 6) {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    }
    if (numbers.length <= 8) {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
    }
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 8)}-${numbers.slice(8, 10)}`;
  }

  if (country.code === "BY") {
    if (numbers.length <= 2) {
      return numbers ? `(${numbers}` : "";
    }
    if (numbers.length <= 5) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }
    if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 5)}-${numbers.slice(5)}`;
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 5)}-${numbers.slice(5, 7)}-${numbers.slice(7, 9)}`;
  }

  if (country.code === "AM") {
    if (numbers.length <= 2) {
      return numbers ? `(${numbers}` : "";
    }
    if (numbers.length <= 5) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 5)}-${numbers.slice(5, 8)}`;
  }

  if (country.code === "GE") {
    if (numbers.length <= 3) {
      return numbers ? `(${numbers}` : "";
    }
    if (numbers.length <= 6) {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    }
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 9)}`;
  }

  return numbers;
};

const getFullPhone = (localPhone: string, country: Country): string => {
  const formatted = formatLocalPhone(localPhone, country);
  return formatted ? `${country.phoneCode} ${formatted}` : "";
};

const ContactSection: React.FC = () => {
  const defaultCountry = useMemo(() => countries.find((country) => country.code === "BY") ?? countries[0], []);
  const [selectedCountry, setSelectedCountry] = useState<Country>(defaultCountry);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", personalData: false, newsletter: false });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

  const clinicContacts = useMemo(
    () => ({
      clinicName: "Клиника в Уручье",
      addressShort: "г. Минск, ул. Героев 120-й дивизии, 3а",
      phones: [
        { label: "Короткий", display: "7095", href: "tel:7095" },
        { label: "A1", display: "+375 (44) 538-70-95", href: "tel:+375445387095" },
        { label: "МТС", display: "+375 (29) 508-70-95", href: "tel:+375295087095" },
        { label: "Городской", display: "+375 (17) 370-00-05", href: "tel:+375173700005" },
      ],
      hours: ["Пн–Пт: 08:00–21:00", "Сб: 08:00–20:00", "Вс и праздничные: 09:00–18:00"],
    }),
    []
  );

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const fallbackEmail = "igorbuzlanov44@gmail.com";
  const toEmail = useMemo(() => import.meta.env.VITE_NOTIFICATION_EMAIL || fallbackEmail, []);

  const isEmailConfigured = Boolean(serviceId && templateId && publicKey);

  useEffect(() => {
    if (status !== "success") return;
    setFadeOut(false);

    const fadeTimer = setTimeout(() => setFadeOut(true), 3200);
    const hideTimer = setTimeout(() => setStatus("idle"), 4000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [status]);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
    setForm((prev) => ({ ...prev, phone: "" }));
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatLocalPhone(event.target.value, selectedCountry);
    setForm((prev) => ({ ...prev, phone: formatted }));
  };

  const handleChange = (field: "name" | "phone" | "email" | "message") => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (field === "phone") {
      handlePhoneChange(event as React.ChangeEvent<HTMLInputElement>);
    } else {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    }
  };

  const handleCheckboxChange = (field: "personalData" | "newsletter") => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.checked }));
  };

  const validateEmail = (email: string): boolean => {
    return email.includes("@") && email.length > 3;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("idle");
    setError(null);

    const fullPhone = getFullPhone(form.phone, selectedCountry);

    if (!form.name || !fullPhone || !form.email || !form.message) {
      setError("Заполните все поля формы.");
      return;
    }

    if (!validateEmail(form.email)) {
      setError("Введите корректный email адрес.");
      return;
    }

    if (!form.personalData) {
      setError("Необходимо согласие на обработку персональных данных.");
      return;
    }

    if (!isEmailConfigured) {
      setError("Отправка временно недоступна. Настройте почтовый сервис.");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            to_email: toEmail,
            user_name: form.name,
            user_phone: fullPhone,
            user_email: form.email,
            message: form.message,
            personal_data: form.personalData ? "Да" : "Нет",
            newsletter: form.newsletter ? "Да" : "Нет",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки формы");
      }

      setStatus("success");
      setForm({ name: "", phone: "", email: "", message: "", personalData: false, newsletter: false });
      setSelectedCountry(defaultCountry);
    } catch (err) {
      setStatus("error");
      setError("Не удалось отправить сообщение. Попробуйте позже.");
      console.error(err);
    }
  };

  return (
    <section id="contacts" className="py-24 bg-[#f9f8f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-12">

        <div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1C2A44] mb-6">
            Контакты и запись
          </h2>

          <p className="text-gray-700 text-lg mb-8 max-w-lg leading-relaxed">
            Вы можете записаться на приём к Маслянскому Вячеславу Борисовичу по телефону.
          </p>

          <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-white/70">

            <div className="mb-6">
              <p className="text-xs uppercase text-gray-500 mb-1">Телефоны</p>
              <div className="space-y-2">
                {clinicContacts.phones.map((phone) => (
                  <div key={phone.href} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-xs text-gray-500 min-w-[88px]">{phone.label}</span>
                    <a className="text-lg font-medium text-[#1C2A44] hover:text-[#C5A572] transition-colors" href={phone.href}>
                      {phone.display}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs uppercase text-gray-500 mb-1">Клиника</p>
              <p className="text-gray-700">
                {clinicContacts.clinicName}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-xs uppercase text-gray-500 mb-1">Адрес</p>
              <p className="text-gray-700 leading-relaxed">
                {clinicContacts.addressShort}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-500 mb-1">Время работы</p>
              <div className="text-gray-700 space-y-1">
                {clinicContacts.hours.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div>
          <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-white/70">

            <h3 className="text-xl font-semibold text-[#1C2A44] mb-2">
              Обратная связь
            </h3>

            <p className="text-gray-600 text-sm mb-6">
              Оставьте заявку, и мы отправим уведомление на почту врача.
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>

              <div>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={handleChange("name")}
                  className="w-full border rounded-xl px-3 sm:px-4 py-3 bg-gray-50 focus:bg-white focus:border-[#C5A572] outline-none transition text-sm sm:text-base"
                />
              </div>

              <div className="relative">
                <div className="flex items-stretch h-11 sm:h-12 rounded-xl border bg-gray-50 transition focus-within:bg-white focus-within:border-[#C5A572]">
                  <div className="relative shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      className="flex h-full items-center gap-1 sm:gap-2 border-r px-2 sm:px-3 md:px-4 py-0 hover:bg-gray-100 outline-none transition text-sm sm:text-base leading-none"
                    >
                      <CountryFlag code={selectedCountry.code} className="w-4 h-3 sm:w-5 sm:h-4" />
                      <span className="text-xs sm:text-sm text-gray-700 leading-none">{selectedCountry.phoneCode}</span>
                      <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isCountryDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setIsCountryDropdownOpen(false)}
                        />
                        <div className="absolute top-full left-0 mt-1 w-56 sm:w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-20 max-h-60 overflow-y-auto">
                          {countries.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => handleCountrySelect(country)}
                              className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors ${
                                selectedCountry.code === country.code ? "bg-gray-50" : ""
                              }`}
                            >
                              <CountryFlag code={country.code} className="w-5 h-4" />
                              <span className="flex-1 text-left text-sm text-gray-700">{country.name}</span>
                              <span className="text-sm text-gray-500">{country.phoneCode}</span>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder={selectedCountry.placeholder}
                    value={form.phone}
                    onChange={handleChange("phone")}
                    className="flex-1 min-w-0 border-0 bg-transparent px-3 sm:px-4 py-0 outline-none transition text-sm sm:text-base leading-none h-full"
                  />
                </div>
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange("email")}
                  className="w-full border rounded-xl px-3 sm:px-4 py-3 bg-gray-50 focus:bg-white focus:border-[#C5A572] outline-none transition text-sm sm:text-base"
                />
              </div>

              <div>
                <textarea
                  rows={4}
                  placeholder="Опишите вашу ситуацию"
                  value={form.message}
                  onChange={handleChange("message")}
                  className="w-full border rounded-xl px-3 sm:px-4 py-3 bg-gray-50 focus:bg-white focus:border-[#C5A572] outline-none transition text-sm sm:text-base resize-none"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.personalData}
                    onChange={handleCheckboxChange("personalData")}
                    className="mt-1 w-4 h-4 text-[#1C2A44] border-gray-300 rounded focus:ring-[#C5A572] cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">
                    Согласен на обработку персональных данных
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.newsletter}
                    onChange={handleCheckboxChange("newsletter")}
                    className="mt-1 w-4 h-4 text-[#1C2A44] border-gray-300 rounded focus:ring-[#C5A572] cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">
                    Хочу получать рассылку на почту
                  </span>
                </label>
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              {status === "success" && (
                <div
                  className={`text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-4 py-3 transition-all duration-700 ${
                    fadeOut ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
                  }`}
                >
                  Сообщение отправлено. Мы свяжемся с вами в ближайшее время.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-[#1C2A44] text-white py-3 rounded-xl font-semibold hover:-translate-y-0.5 transition shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Отправляем..." : "Отправить"}
              </button>

            </form>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
