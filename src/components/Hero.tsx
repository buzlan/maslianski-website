import person from "../images/person.jpg";
import { KLINIK_DOCTOR_URL } from "../lib/navigation";
import { DOCTOR_SOCIAL_LINKS } from "../lib/social";
import { Button } from "./ui/Button";
import { SocialLinks } from "./ui/SocialLinks";

const TRUST_ITEMS = [
  "ЭВЛК",
  "Минифлебэктомия",
  "Склеротерапия",
  "Доказательный подход",
] as const;

const Hero: React.FC = () => {
  return (
    <section id="top" className="hero-bg pb-20 pt-12 md:pb-28 md:pt-16">
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_380px] lg:gap-16 xl:grid-cols-[1fr_420px]">
          <div className="max-w-2xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent md:text-sm md:tracking-[0.18em] lg:text-base xl:text-lg">
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

            <div className="mt-10 flex flex-col gap-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button
                  href={KLINIK_DOCTOR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
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

              <a
                href={KLINIK_DOCTOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
              >
                <svg
                  className="h-4 w-4 shrink-0 text-accent/80 transition-colors group-hover:text-accent"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
                <span>
                  Оставить отзыв{" "}
                  <span className="text-primary/70 group-hover:text-accent">
                    на сайте клиники
                  </span>
                </span>
                <svg
                  className="h-3.5 w-3.5 shrink-0 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M7 17 17 7" />
                  <path d="M7 7h10v10" />
                </svg>
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
              <p className="font-display text-2xl font-semibold leading-tight text-[#FFEB00] md:text-3xl">
                Маслянский Вячеслав Борисович
              </p>
              <div className="mt-3 space-y-1 text-[1.0625rem] leading-relaxed text-[#FFEB00] md:text-lg">
                <p>Врач-хирург, флеболог, рентгеноэндоваскулярный хирург.</p>
                <p>Член Ассоциации флебологов России</p>
                <p>Член Белорусской Ассоциации ангиологов и сосудистых хирургов</p>
              </div>

              <SocialLinks links={DOCTOR_SOCIAL_LINKS} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
