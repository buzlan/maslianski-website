import { Card } from "./ui/Card";
import { BulletList } from "./ui/BulletList";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

const DIRECTIONS = [
  {
    eyebrow: "Консультации",
    title: "Первичная консультация флеболога",
    content:
      "Подробный разбор жалоб, факторов риска, осмотр и ультразвуковой скрининг вен, формирование диагноза и рекомендаций.",
  },
  {
    eyebrow: "Лечение",
    title: "Индивидуальный план лечения и профилактики",
    items: [
      "Выбор оптимальной методики, либо сочетание методик лечения для каждого конкретного пациента",
      "Сеансы склеротерапии",
      "Рациональная фармакотерапия и подбор компрессионного трикотажа",
    ],
  },
  {
    eyebrow: "Наблюдение",
    title: "Повторный и контрольный приём",
    content:
      "Оценка динамики, коррекция схемы лечения, ответы на вопросы пациента.",
    items: [
      "оценка эффективности терапии",
      "корректировка рекомендаций",
      "профилактическое наблюдение",
    ],
  },
] as const;

const Services: React.FC = () => {
  return (
    <Section id="services" variant="muted">
      <SectionHeading
        eyebrow="Направления"
        title="Разделы и направления работы"
        description="Современная диагностика и лечение заболеваний вен: от первичной консультации до профилактики."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {DIRECTIONS.map((direction) => (
          <Card key={direction.title}>
            <p className="card-eyebrow">{direction.eyebrow}</p>
            <h3 className="card-title mb-4">{direction.title}</h3>
            {"content" in direction && direction.content ? (
              <p className="text-body mb-4">{direction.content}</p>
            ) : null}
            {"items" in direction && direction.items ? (
              <BulletList items={[...direction.items]} />
            ) : null}
          </Card>
        ))}
      </div>

      <p className="text-body-sm mt-8">
        План лечения формируется индивидуально на очной консультации.
      </p>
    </Section>
  );
};

export default Services;
