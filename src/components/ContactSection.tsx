import { useEffect, useMemo, useState } from "react";
import CountryFlag from "./CountryFlag";
import { buttonClassName } from "./ui/buttonStyles";
import { Card } from "./ui/Card";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

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
    if (numbers.length <= 3) return numbers ? `(${numbers}` : "";
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    if (numbers.length <= 8) return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 8)}-${numbers.slice(8, 10)}`;
  }

  if (country.code === "BY") {
    if (numbers.length <= 2) return numbers ? `(${numbers}` : "";
    if (numbers.length <= 5) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 5)}-${numbers.slice(5)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 5)}-${numbers.slice(5, 7)}-${numbers.slice(7, 9)}`;
  }

  if (country.code === "AM") {
    if (numbers.length <= 2) return numbers ? `(${numbers}` : "";
    if (numbers.length <= 5) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 5)}-${numbers.slice(5, 8)}`;
  }

  if (country.code === "GE") {
    if (numbers.length <= 3) return numbers ? `(${numbers}` : "";
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 9)}`;
  }

  return numbers;
};

const getFullPhone = (localPhone: string, country: Country): string => {
  const formatted = formatLocalPhone(localPhone, country);
  return formatted ? `${country.phoneCode} ${formatted}` : "";
};

function ContactLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
      {children}
    </p>
  );
}

const ContactSection: React.FC = () => {
  const defaultCountry = useMemo(
    () => countries.find((country) => country.code === "BY") ?? countries[0],
    [],
  );
  const [selectedCountry, setSelectedCountry] = useState<Country>(defaultCountry);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    personalData: false,
    newsletter: false,
  });
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
    [],
  );

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const fallbackEmail = "igorbuzlanov44@gmail.com";
  const toEmail = useMemo(
    () => import.meta.env.VITE_NOTIFICATION_EMAIL || fallbackEmail,
    [],
  );
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

  const handleChange =
    (field: "name" | "phone" | "email" | "message") =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (field === "phone") {
        handlePhoneChange(event as React.ChangeEvent<HTMLInputElement>);
      } else {
        setForm((prev) => ({ ...prev, [field]: event.target.value }));
      }
    };

  const handleCheckboxChange =
    (field: "personalData" | "newsletter") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.checked }));
    };

  const validateEmail = (email: string): boolean =>
    email.includes("@") && email.length > 3;

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
        headers: { "Content-Type": "application/json" },
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

      if (!response.ok) throw new Error("Ошибка отправки формы");

      setStatus("success");
      setForm({
        name: "",
        phone: "",
        email: "",
        message: "",
        personalData: false,
        newsletter: false,
      });
      setSelectedCountry(defaultCountry);
    } catch (err) {
      setStatus("error");
      setError("Не удалось отправить сообщение. Попробуйте позже.");
      console.error(err);
    }
  };

  return (
    <Section id="contacts" variant="muted">
      <div className="grid min-w-0 gap-10 md:grid-cols-2 md:gap-12">
        <div className="min-w-0">
          <SectionHeading
            eyebrow="Связь"
            title="Контакты и запись"
            description="Вы можете записаться на приём к Маслянскому Вячеславу Борисовичу по телефону или оставить заявку через форму."
          />

          <Card>
            <div className="mb-6">
              <ContactLabel>Телефоны</ContactLabel>
              <div className="space-y-2">
                {clinicContacts.phones.map((phone) => (
                  <div
                    key={phone.href}
                    className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
                  >
                    <span className="min-w-[88px] text-xs text-muted">
                      {phone.label}
                    </span>
                    <a
                      href={phone.href}
                      className="text-lg font-medium text-primary transition-colors hover:text-accent"
                    >
                      {phone.display}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <ContactLabel>Клиника</ContactLabel>
              <p className="text-body">{clinicContacts.clinicName}</p>
            </div>

            <div className="mb-6">
              <ContactLabel>Адрес</ContactLabel>
              <p className="text-body">
                {clinicContacts.addressShort}
              </p>
            </div>

            <div>
              <ContactLabel>Время работы</ContactLabel>
              <div className="text-body space-y-1">
                {clinicContacts.hours.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <Card padding="lg" className="overflow-hidden">
          <h3 className="card-title mb-2">Обратная связь</h3>
          <p className="text-body-sm mb-6">
            Оставьте заявку, и мы отправим уведомление на почту врача.
          </p>

          <form className="w-full min-w-0 space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ваше имя"
              value={form.name}
              onChange={handleChange("name")}
              className="input-field"
            />

            <div className="relative w-full min-w-0">
              <div className="flex h-12 w-full min-w-0 items-stretch overflow-hidden rounded-[var(--radius-button)] border border-border bg-surface-muted transition-colors focus-within:border-accent focus-within:bg-surface-elevated">
                <div className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setIsCountryDropdownOpen(!isCountryDropdownOpen)
                    }
                    className="flex h-full items-center gap-1.5 border-r border-border px-2.5 transition-colors hover:bg-surface-muted sm:gap-2 sm:px-3 md:px-4"
                  >
                    <CountryFlag
                      code={selectedCountry.code}
                      className="h-3 w-4 sm:h-4 sm:w-5"
                    />
                    <span className="text-sm text-primary">
                      {selectedCountry.phoneCode}
                    </span>
                    <svg
                      className="h-3 w-3 text-muted"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isCountryDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsCountryDropdownOpen(false)}
                      />
                      <div className="absolute top-full left-0 z-20 mt-1 max-h-60 w-[min(16rem,calc(100vw-2rem))] overflow-y-auto rounded-[var(--radius-card)] border border-border bg-surface-elevated py-1 shadow-[0_8px_30px_rgb(28_42_68/0.08)]">
                        {countries.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => handleCountrySelect(country)}
                            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-surface-muted ${
                              selectedCountry.code === country.code
                                ? "bg-surface-muted"
                                : ""
                            }`}
                          >
                            <CountryFlag code={country.code} className="h-4 w-5" />
                            <span className="flex-1 text-sm text-primary">
                              {country.name}
                            </span>
                            <span className="text-sm text-muted">
                              {country.phoneCode}
                            </span>
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
                  className="min-w-0 flex-1 border-0 bg-transparent px-3 text-[1.0625rem] text-primary outline-none sm:px-4 md:text-lg"
                />
              </div>
            </div>

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange("email")}
              className="input-field"
            />

            <textarea
              rows={4}
              placeholder="Опишите вашу ситуацию"
              value={form.message}
              onChange={handleChange("message")}
              className="input-field resize-none"
            />

            <div className="space-y-3">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={form.personalData}
                  onChange={handleCheckboxChange("personalData")}
                  className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-accent"
                />
                <span className="text-body-sm">
                  Согласен на обработку персональных данных
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={form.newsletter}
                  onChange={handleCheckboxChange("newsletter")}
                  className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-accent"
                />
                <span className="text-body-sm">
                  Хочу получать рассылку на почту
                </span>
              </label>
            </div>

            {error && (
              <div className="rounded-[var(--radius-button)] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {status === "success" && (
              <div
                className={`rounded-[var(--radius-button)] border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 transition-opacity duration-700 ${
                  fadeOut ? "opacity-0" : "opacity-100"
                }`}
              >
                Сообщение отправлено. Мы свяжемся с вами в ближайшее время.
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className={buttonClassName("primary", "md", "w-full")}
            >
              {status === "loading" ? "Отправляем..." : "Отправить"}
            </button>
          </form>
        </Card>
      </div>
    </Section>
  );
};

export default ContactSection;
