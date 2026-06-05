import person from "../images/person.jpeg";
import { useScrollToSection } from "../hooks/useScrollToSection";
import { Button } from "./ui/Button";

const TRUST_ITEMS = [
  "ЭВЛК",
  "Минифлебэктомия",
  "Склеротерапия",
  "Доказательный подход",
] as const;

const Hero: React.FC = () => {
  const { goToSection } = useScrollToSection();

  const handleContactsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    goToSection("contacts");
  };

  return (
    <section id="top" className="hero-bg pb-20 pt-12 md:pb-28 md:pt-16">
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_380px] lg:gap-16 xl:grid-cols-[1fr_420px]">
          <div className="max-w-2xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Врач-флеболог · Минск
            </p>

            <h1 className="font-display text-[2.5rem] font-semibold leading-[1.1] text-primary md:text-5xl lg:text-[3.25rem]">
              Забота о здоровье вен
              <span className="mt-2 block text-[0.72em] font-normal text-primary-light">
                и внимательный подход к каждому пациенту
              </span>
            </h1>

            <div className="mt-6 h-px w-16 bg-accent" aria-hidden />

            <div className="text-body mt-8 space-y-4">
              <p>
                Маслянский Вячеслав Борисович — врач-флеболог, специализирующийся
                на диагностике и лечении острых и хронических заболеваний вен.
              </p>
              <p>
                Современные методики, индивидуальная тактика лечения и доступные
                объяснения — чтобы вы понимали, что происходит и какие варианты
                подходят именно вам.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                href="/"
                onClick={handleContactsClick}
              >
                Записаться на приём
              </Button>
              <a
                href="tel:+375295087095"
                className="text-base font-medium text-primary transition-colors hover:text-accent md:text-lg"
              >
                +375 (29) 508-70-95
              </a>
            </div>

            <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-8">
              {TRUST_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-base text-primary"
                >
                  <span
                    className="h-1 w-1 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto w-full max-w-[380px] lg:mx-0 lg:max-w-none">
            <img
              src={person}
              alt="Маслянский Вячеслав Борисович — врач-флеболог"
              className="aspect-[4/5] w-full rounded-[var(--radius-card)] object-cover object-top shadow-[0_12px_40px_rgb(28_42_68/0.12)]"
            />

            <div className="mt-6 text-center lg:text-left">
              <p className="font-display text-xl font-semibold text-primary">
                Маслянский Вячеслав Борисович
              </p>
              <p className="text-body-sm mt-2">
                Член Ассоциации флебологов России и Белорусской ассоциации
                ангиологов и сосудистых хирургов
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
