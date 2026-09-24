import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { usePageMeta } from "../hooks/usePageMeta";

const DOCTOR = {
  name: "Маслянский Вячеслав Борисович",
  address: "г. Минск, ул. Героев 120-й дивизии, 3а",
  phones: [
    { label: "Короткий", display: "7095", href: "tel:7095" },
    { label: "A1", display: "+375 (44) 538-70-95", href: "tel:+375445387095" },
    { label: "МТС", display: "+375 (29) 508-70-95", href: "tel:+375295087095" },
    { label: "Городской", display: "+375 (17) 370-00-05", href: "tel:+375173700005" },
  ],
} as const;

const APP_FEATURES = [
  "смотреть назначения, которые сформировал лечащий врач;",
  "отмечать выполненные действия;",
  "вести дневник самочувствия;",
  "отправлять фотографии, чтобы врач видел динамику;",
  "видеть текущий приём и ход сопровождения.",
] as const;

const DATA_CATEGORIES = [
  "данные, которые врач передаёт для доступа по приглашению;",
  "сведения о назначениях и отмеченных действиях;",
  "записи дневника самочувствия;",
  "фотографии, которые добавляет пациент;",
  "сведения о приёмах.",
] as const;

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-3 text-muted">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-1 text-accent" aria-hidden>
            •
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const Privacy: React.FC = () => {
  usePageMeta({
    title: "Политика конфиденциальности — приложение «Доктор Маслянский»",
    description:
      "Как приложение «Доктор Маслянский» использует сведения пациента после консультации врача. Доступ выдаёт врач по приглашению.",
    path: "/privacy",
  });

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <article className="container-site max-w-3xl">
          <p className="section-eyebrow mb-3">Приложение «Доктор Маслянский»</p>
          <h1 className="font-display text-3xl font-semibold leading-tight text-primary md:text-4xl lg:text-5xl">
            Политика конфиденциальности
          </h1>
          <div className="mt-5 h-px w-12 bg-accent" aria-hidden />

          <div className="mt-8 space-y-10">
            <p className="text-body">
              Эта страница о мобильном приложении «Доктор Маслянский». Оно
              сопровождает пациента после консультации врача.
            </p>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-primary">
                Как получить доступ
              </h2>
              <p className="text-body">
                Доступ выдаёт лечащий врач по приглашению. Самостоятельной
                регистрации в приложении нет.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-primary">
                Что можно делать в приложении
              </h2>
              <BulletList items={APP_FEATURES} />
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-primary">
                Границы приложения
              </h2>
              <div className="text-body space-y-4">
                <p>
                  Приложение не ставит диагнозы, не назначает лечение
                  самостоятельно и не заменяет консультацию врача.
                </p>
                <p>
                  Оно не предназначено для экстренной медицинской помощи. Если
                  нужна срочная помощь, обратитесь к врачу или в службу
                  экстренной помощи.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-primary">
                Какие сведения используются
              </h2>
              <BulletList items={DATA_CATEGORIES} />
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-primary">
                Кто видит дневник и фотографии
              </h2>
              <p className="text-body">
                Информация из дневника, включая самочувствие и фотографии,
                может быть доступна лечащему врачу, который ведёт
                сопровождение.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-primary">
                Если вы больше не хотите пользоваться приложением
              </h2>
              <div className="text-body space-y-4">
                <p>
                  Пациент может прекратить использование приложения в любое
                  время.
                </p>
                <p>
                  По вопросам доступа к данным или их удаления нужно обратиться
                  к лечащему врачу.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-primary">
                Контакты врача
              </h2>
              <div className="rounded-[var(--radius-card)] border border-border bg-surface-elevated p-5 sm:p-6">
                <p className="text-lg font-medium text-primary">{DOCTOR.name}</p>
                <p className="text-body mt-2">{DOCTOR.address}</p>
                <div className="mt-5 space-y-2">
                  {DOCTOR.phones.map((phone) => (
                    <div
                      key={phone.href}
                      className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
                    >
                      <span className="min-w-[88px] text-xs text-muted">
                        {phone.label}
                      </span>
                      <a
                        href={phone.href}
                        className="font-medium text-primary transition-colors hover:text-accent"
                      >
                        {phone.display}
                      </a>
                    </div>
                  ))}
                </div>
                <p className="text-body mt-5">
                  <Link
                    to={{ pathname: "/", hash: "contacts" }}
                    className="font-medium text-primary underline decoration-accent/60 underline-offset-4 transition-colors hover:text-accent"
                  >
                    Контакты и запись на сайте
                  </Link>
                </p>
              </div>
            </section>

            <aside className="rounded-[var(--radius-card)] border-2 border-accent bg-[#f8f1e4] p-5 sm:p-6">
              <p className="card-eyebrow">Уточнить у врача</p>
              <p className="text-body">
                Срок хранения данных на сайте не указан. Уточните его у
                лечащего врача.
              </p>
            </aside>

            <p className="border-t border-border pt-6 text-sm text-muted">
              Дата редакции: 24 сентября 2026 г.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
