import { useEffect, useState } from "react";
import { Card } from "./ui/Card";
import { BulletList } from "./ui/BulletList";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

const PHOTOS = [
  {
    image: "/images/factor-risk-pregnancy.png",
    caption: "Беременность как фактор риска развития варикоза",
  },
  {
    image: "/images/factor-risk-travel.jpeg",
    caption: "Длительные перелёты и поездки",
  },
  {
    image: "/images/factor-risk-obesity.jpeg",
    caption: "Избыточная масса тела и ожирение",
  },
] as const;

const VISIBLE_CHANGES = [
  "Варикозные узлы",
  "Телеангиоэктазии («сосудистые звёздочки» и «капиллярные сетки»)",
  "Пигментация (участки потемнения кожи)",
];

const DISCOMFORT = [
  "Отёки и тяжесть в ногах",
  "Судороги",
  "Боль",
  "Парестезии (жжение, онемение)",
];

const RISK_FACTORS = [
  "Отягощённая наследственность",
  "Врождённые аномалии и дефициты",
  "Беременность",
  "Возраст",
  "Избыточная масса тела",
  "Приём гормональных препаратов",
  "Перенесённый венозный тромбоз",
  "Частые перелёты и длительные поездки",
  "Травмы и операции",
  "Работа, связанная с длительным стоянием или сидением",
];

function CarouselButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface-elevated/95 text-primary transition-colors hover:border-accent hover:text-accent ${direction === "prev" ? "left-3" : "right-3"}`}
      aria-label={direction === "prev" ? "Предыдущее фото" : "Следующее фото"}
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={direction === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
        />
      </svg>
    </button>
  );
}

const WhenToSee: React.FC = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const currentPhoto = PHOTOS[currentPhotoIndex];

  useEffect(() => {
    PHOTOS.forEach((photo) => {
      const img = new Image();
      img.src = photo.image;
    });
  }, []);

  useEffect(() => {
    if (PHOTOS.length <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % PHOTOS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section id="when">
      <SectionHeading
        eyebrow="Симптомы"
        title="Когда стоит обратиться"
        description="Чем раньше выявлено нарушение венозного оттока — тем проще лечение и ниже риск осложнений."
      />

      <div className="grid items-start gap-8 lg:grid-cols-[1fr_340px] xl:gap-12">
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <h3 className="card-title mb-4">Видимые изменения</h3>
              <BulletList items={VISIBLE_CHANGES} />
            </Card>
            <Card>
              <h3 className="card-title mb-4">Неприятные ощущения</h3>
              <BulletList items={DISCOMFORT} />
            </Card>
          </div>

          <Card>
            <h3 className="card-title mb-5 text-center md:text-left">
              Факторы риска
            </h3>
            <ul className="grid gap-x-8 gap-y-2.5 md:grid-cols-2">
              {RISK_FACTORS.map((item) => (
                <li key={item} className="text-body flex items-start gap-3">
                  <span
                    className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="mx-auto w-full max-w-[340px] shrink-0 lg:mx-0">
          <Card className="overflow-hidden" padding="none">
            <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-surface-muted">
              {PHOTOS.map((photo, index) => (
                <img
                  key={photo.image}
                  src={photo.image}
                  alt={index === currentPhotoIndex ? photo.caption : ""}
                  aria-hidden={index !== currentPhotoIndex}
                  loading="eager"
                  decoding="async"
                  className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ${
                    index === currentPhotoIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              {PHOTOS.length > 1 && (
                <>
                  <CarouselButton
                    direction="prev"
                    onClick={() =>
                      setCurrentPhotoIndex(
                        (prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length,
                      )
                    }
                  />
                  <CarouselButton
                    direction="next"
                    onClick={() =>
                      setCurrentPhotoIndex((prev) => (prev + 1) % PHOTOS.length)
                    }
                  />
                </>
              )}
            </div>
            <p className="text-body-sm flex h-28 shrink-0 items-center justify-center border-t border-border px-4 py-3 text-center md:h-24">
              {currentPhoto.caption}
            </p>
          </Card>
        </div>
      </div>
    </Section>
  );
};

export default WhenToSee;
