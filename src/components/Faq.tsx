import { useState } from "react";
import { Card } from "./ui/Card";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

const FAQ = [
  {
    q: "Обязательно ли оперировать варикоз?",
    a: "Не всегда. Всё зависит от стадии заболевания. В ряде случаев достаточно консервативного лечения и наблюдения.",
  },
  {
    q: "Помогут ли мази и таблетки?",
    a: "Они способны уменьшать симптомы, но не устраняют первопричину. Важно комплексное лечение и контроль у специалиста.",
  },
  {
    q: "Нужен ли компрессионный трикотаж?",
    a: "Да, во многих случаях это обязательный элемент терапии. Тип и степень компрессии подбираются индивидуально.",
  },
  {
    q: "Можно ли заниматься спортом?",
    a: "Обычно умеренная активность полезна. Лучшие варианты — ходьба, плавание, лёгкие динамические нагрузки.",
  },
] as const;

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-accent" : "text-primary"}`}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M2.5 4.5L6 8L9.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="faq">
      <SectionHeading
        eyebrow="Ответы"
        title="Часто задаваемые вопросы"
      />

      <div className="mx-auto max-w-3xl space-y-3">
        {FAQ.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <Card
              key={item.q}
              className={`!p-0 overflow-hidden transition-colors ${isOpen ? "border-accent/40" : ""}`}
              padding="md"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-surface-muted/50 md:px-8"
                aria-expanded={isOpen}
              >
                <span
                  className={`text-base font-semibold text-primary md:text-lg ${isOpen ? "text-accent" : ""}`}
                >
                  {item.q}
                </span>
                <ChevronIcon open={isOpen} />
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <p className="text-body border-t border-border px-6 pb-6 pt-4 md:px-8">
                    {item.a}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
};

export default Faq;
