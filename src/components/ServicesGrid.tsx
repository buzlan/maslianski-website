import { Link } from "react-router-dom";
import { Section } from "./ui/Section";
import { SectionHeading } from "./ui/SectionHeading";

const services = [
  {
    id: "evlk",
    title: "ЭВЛК — эндовенозная лазерная коагуляция под контролем УЗИ",
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
] as const;

const ServicesGrid: React.FC = () => {
  return (
    <Section id="services-grid">
      <SectionHeading
        eyebrow="Процедуры"
        title="Виды операций и манипуляций"
      />

      <div className="grid gap-5 md:grid-cols-2">
        {services.map((service) => (
          <Link
            key={service.id}
            to={service.link}
            className="group relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-elevated shadow-[0_4px_24px_rgb(28_42_68/0.06)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgb(28_42_68/0.1)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted">
              <img
                src={service.image}
                alt={service.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
              <h3 className="font-display text-xl font-semibold leading-snug text-white md:text-2xl">
                {service.title}
              </h3>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors group-hover:border-accent group-hover:bg-accent">
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
};

export default ServicesGrid;
