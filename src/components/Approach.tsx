import { Card } from "./ui/Card";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

const PRINCIPLES = [
  {
    title: "Доказательная медицина",
    text: "Работа строго по современным белорусским и международным клиническим протоколам и рекомендациям.",
  },
  {
    title: "Индивидуальный подход",
    text: "Терапия подбирается с учётом особенностей пациента, образа жизни и сопутствующих заболеваний.",
  },
  {
    title: "Доступное объяснение",
    text: "Пациент должен понимать, что происходит с венами и почему назначается тот или иной метод лечения.",
  },
] as const;

const Approach: React.FC = () => {
  return (
    <Section id="approach" variant="muted">
      <SectionHeading
        eyebrow="Философия"
        title="Подход к лечению"
        description="Задача флеболога — не только устранить эстетические или физические проявления варикоза, но и обеспечить долгосрочный результат, снизить риск осложнений и улучшить качество жизни пациента."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {PRINCIPLES.map((item) => (
          <Card key={item.title}>
            <h3 className="card-title mb-3">{item.title}</h3>
            <p className="text-body">{item.text}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Approach;
