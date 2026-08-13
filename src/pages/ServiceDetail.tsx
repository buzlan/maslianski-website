import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { ServiceHeroImage } from "../components/service/ServiceHeroImage";
import { useScrollToSection } from "../hooks/useScrollToSection";
import { usePageMeta, DEFAULT_PAGE_META } from "../hooks/usePageMeta";

interface Service {
  id: string;
  title: string;
  image: string;
  video?: string;
  galleryImages?: { src: string; alt: string }[];
  description: string;
  details: string[];
  advantages?: string[];
  indications?: string[];
  procedure?: string[];
  contraindications?: string[];
  recovery?: string[];
  causes?: string[];
  whenNeeded?: string[];
  rehabilitation?: string[];
  proceduresCount?: string;
  informDoctor?: string[];
  sclerotherapyInfo?: {
    description: string;
    whenNeeded: string[];
    contraindications: string[];
    rehabilitation: string[];
    proceduresCount: string;
    informDoctor: string[];
  };
}

const servicesData: Service[] = [
  {
    id: "evlk",
    title: "ЭВЛК - Эндовенозная лазерная коагуляция под контролем УЗИ",
    image: "/images/evlkdetailed.jpeg",
    description: "Эндовенозная лазерная коагуляция (ЭВЛК) под контролем УЗИ — инновационный метод лечения варикозного расширения вен. Данная операция относится к сосудистой хирургии. Выполняется она при помощи лазера и позволяет удалить пораженные вены без шрамов и рубцов.",
    details: [
      "Минимально инвазивная процедура",
      "Выполняется под местной анестезией",
      "Быстрое восстановление после процедуры",
      "Высокая эффективность лечения",
      "Минимальный риск осложнений",
    ],
    advantages: [
      "Лечение проходит амбулаторно, нет надобности ложиться в больницу",
      "Консультация флеболога, сдача анализов перед операцией, послеоперационное наблюдение — всё в одной клинике",
      "Оперативность метода — процедура длится около 30 минут",
      "Уже на следующий день после ЭВЛК можно выходить на работу и заниматься своими повседневными делами. Реабилитационный период составляет 5-7 дней",
      "Можно проводить лечение одновременно на обеих ногах",
      "На месте воздействия лазера не остается никаких шрамов и рубцов, лишь еле заметные проколы в 1-2 миллиметра",
      "Безболезненность во время процедуры (применяется местная анестезия)",
      "Благодаря ЭВЛК быстрее заживают трофические язвы",
    ],
    indications: [
      "Трофические расстройства в области голени и бедер",
      "Прямой ход патологически измененных стволовых вен",
      "Варикозное расширение притоков вен",
    ],
    procedure: [
      "Перед операцией ЭВЛК хирург определяет пораженный участок вены и количество энергии, которое понадобится для лазерной коагуляции",
      "Затем под контролем ультразвука прокалывается вена и вводится лазерный световод до места ее впадения в глубокие вены",
      "После этого делается местное обезболивание. При ЭВЛК применяется именно тумесцентная анестезия, которая позволяет обезболить только пораженную вену",
      "Эта методика защищает близлежащие ткани от воздействия лазера и выталкивает кровь при уменьшении вены",
      "Далее хирург проверяет расположение световода и приступает к коагуляции",
      "Боковые вены, пораженные варикозом, удаляются с помощью крючков Варади через проколы",
      "После всех манипуляций проколы заклеивают специальными пластырями и надевают компрессионное белье",
      "Вся операция длится примерно 1 час",
    ],
    contraindications: [
      "Кожные заболевания в области проколов",
      "Тромбофлебит и перенесенные ранее тромбозы",
      "Некоторые виды пороков сердца",
      "Атеросклероз артерий ног",
      "Беременность и период лактации",
    ],
  },
  {
    id: "phlebectomy",
    title: "Минифлебэктомия",
    image: "/images/mini-inside1.png",
    galleryImages: [
      { src: "/images/mini-inside2.png", alt: "Минифлебэктомия — процедура лечения варикозной болезни" },
    ],
    description: "Минифлебэктомия по Варади — это малоинвазивная операция для удаления пораженных участков вен, выполняемая через проколы кожи. Процедура проводится под местной анестезией в амбулаторных условиях. В зависимости от сложности заболевания и индивидуальных особенностей венозно-сосудистой патологии, может быть предложено комбинированное лечение с использованием нескольких технологий одновременно для гарантированного и долгосрочного результата.",
    details: [
      "Минимальные проколы без разрезов",
      "Быстрая реабилитация",
      "Высокая эффективность",
      "Применяется под местной анестезией",
      "Отличные отдаленные результаты",
    ],
    advantages: [
      "Операция не имеет возрастных ограничений",
      "Технология позволяет удалять пораженные участки вен на любом участке конечностей",
      "Отличный косметический эффект — травматизация тканей сведена к минимуму, микронадрезы и проколы не оставляют следов на коже",
      "Процедура переносится легко и позволяет пациенту вернуться к обычному образу жизни уже на следующий день",
      "Отсутствие разрезов и шрамов на коже",
      "Короткий восстановительный период",
      "Минимальный риск осложнений",
    ],
    indications: [
      "Варикозное расширение притоков вен",
      "Необходимость удаления пораженных участков вен после ЭВЛК",
      "Локальные варикозные узлы",
      "Комбинированное лечение варикозной болезни",
    ],
    contraindications: [
      "Воспаление кожи в области операции, венозный лимфатический отёк",
      "Наличие инфекций",
      "Тяжелая сердечная или почечная недостаточность",
      "Беременность",
      "Декомпенсированная артериальная ишемия",
    ],
    recovery: [
      "Восстановление происходит быстро и без выраженных болевых ощущений",
      "Компрессионный трикотаж (чулки, гольфы) рекомендовано носить от одной до двух недель (на усмотрение доктора)",
      "Важно ограничить физические и спортивные нагрузки, подъем тяжестей, посещение бань и саун",
      "Спокойные пешие прогулки только приветствуются",
      "В течение первой недели после операции следует посетить лечащего врача для смены повязок, оценки проведенного вмешательства и получения дальнейших рекомендаций",
    ],
  },
  {
    id: "sclerotherapy",
    title: "Склеротерапия",
    image: "/images/sclero-inside1.png",
    galleryImages: [
      { src: "/images/sclero-inside2.png", alt: "Склеротерапия — процедура лечения варикозной болезни" },
    ],
    description: "Склеротерапия — это введение специального препарата (склерозанта) в поражённую вену. После этого обработанные вены просто рассасываются, не оставляя видимых следов на коже. Это самый распространённый, доступный и безболезненный метод лечения варикозного расширения вен и устранения телеангиоэктазий. Консервативные методы лечения в этом случае неэффективны.",
    details: [
      "Проверенная временем методика",
      "Эффективна для мелких и средних вен",
      "Короткая процедура",
      "Минимальный дискомфорт",
      "Хорошие отдаленные результаты",
    ],
    whenNeeded: [
      "Варикозное расширение вен нижней конечности",
      "Телеангиоэктазии (сосудистые «звёздочки, сеточки»)",
    ],
    contraindications: [
      "Инфекционные кожные заболевания",
      "Тромбофлебит",
      "Некоторые виды порока сердца (открытое овальное окно)",
      "Аллергическая реакция на препарат",
      "Период беременности или лактации",
      "Инфекционно-воспалительные заболевания кожи в области инъекции",
    ],
    rehabilitation: [
      "Необходимо ходить в течение 40-60 минут после процедуры",
      "Не следует садиться за руль, поскольку в состав препарата входит спирт",
      "Ежедневно не менее 1 часа ходить пешком",
      "Не рекомендуется длительное время сидеть или стоять",
      "Не принимать горячих ванн в течение 2-4 недель",
      "Не рекомендуется посещать сауну и солярий в течение 4 недель",
      "Не следует заниматься спортом в течение 2-4 недель",
    ],
    proceduresCount: "Количество инъекций зависит от степени поражения вен и вида склерозирующего препарата (пенный или жидкостный). Может потребоваться от 1 до 5 (в среднем 2-3) сеансов. Количество процедур определяет врач.",
    informDoctor: [
      "Если вы принимаете гормональные препараты (контрацептивы, эстрогены), аспирин и другие лекарства",
      "О наличии заболеваний: коагулопатии, атеросклероза, сахарного диабета, хронических заболеваний печени и почек, пороков сердца",
    ],
  },
  {
    id: "telangiectasia",
    title: "Телеангиоэктазии (сосудистые звёздочки)",
    image: "/images/detailteleango.jpeg",
    description: "Сосудистые звёздочки на ногах — это расширенные внутрикожные капилляры (по научному телеангиоэктазии), которые внешне похожи на «звёздочки». Это первый и достаточно серьёзный сигнал о проблемах с сосудами. Образования могут быть красными или синими, различными по форме — «звёздочки», «деревья», «сеточки» и «паучки». Располагаются они на ногах группами или параллельно друг другу. Не стоит воспринимать сосудистые звёздочки как обычный дефект кожи — без консультации врача-флеболога и принятия должных мер вы рискуете приобрести варикозное расширение вен.",
    details: [
      "Удаление мелких сосудистых образований",
      "Быстрая процедура",
      "Отличный косметический эффект",
      "Минимальные побочные эффекты",
      "Комфортное восстановление",
    ],
    causes: [
      "Гормональные нарушения",
      "Гормональная терапия",
      "Варикозная болезнь",
      "Наследственная предрасположенность",
      "Беременность и послеродовой период",
      "Гипертония",
      "Хронические заболевания печени",
      "Физическое напряжение и длительные нагрузки на ноги",
    ],
    advantages: [
      "Безболезненное лечение",
      "Быстрое устранение проблемы за одну или несколько процедур",
      "Не требуется ношение компрессионного белья",
      "Не нужно ограничивать активность или соблюдать режим покоя",
      "Минимальный реабилитационный период",
      "Процедура проводится круглогодично",
      "Практически отсутствуют побочные эффекты",
    ],
    procedure: [
      "Перед процедурой проводится консультация флеболога и УЗИ-исследование нижних конечностей",
      "Процедура выполняется на современном лазерном оборудовании Candela, Vbeam Prima (США)",
      "Манипуляции занимают около 45 минут",
      "Сначала применяется криотерапия — область обработки охлаждается воздухом до -20°C, что снижает чувствительность болевых рецепторов и предотвращает появление синяков",
      "Затем используется лазер с длиной волны 1064 нанометра, который вызывает спазм мелких капилляров и более крупных питающих вен",
      "Финальный этап — введение склерозирующего препарата в вену, который полностью закрывает сосуды, устраняя сосудистые образования",
      "Для полного устранения сосудистых звёздочек обычно требуется 2 или более процедур",
    ],
    contraindications: [
      "Воспаления и инфекции в острой фазе",
      "Патологии кожи в области обработки лазером",
      "Онкологические заболевания",
      "Кожная инфекция",
      "Витилиго",
      "Наличие кардиостимуляторов или других имплантируемых устройств",
      "Автозагар, татуировки, пигментация в зоне воздействия",
      "Беременность и период кормления грудью",
    ],
  },
];

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { goToSection } = useScrollToSection();

  const service = servicesData.find((s) => s.id === id);

  usePageMeta(
    service
      ? {
          title: `${service.title} | Флеболог в Минске`,
          description: service.description,
          path: `/services/${service.id}`,
          image: `https://maslianski.by${service.image}`,
        }
      : DEFAULT_PAGE_META,
  );

  useEffect(() => {
    if (!service) return;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seoStructuredData = "service";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalProcedure",
      name: service.title,
      description: service.description,
      medicalSpecialty: "Флебология",
      url: `https://maslianski.by/services/${service.id}`,
      image: `https://maslianski.by${service.image}`,
      performer: {
        "@type": "Physician",
        name: "Маслянский Вячеслав Борисович",
        url: "https://maslianski.by/",
      },
    });
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [service]);

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="text-center">
          <h1 className="mb-4 font-display text-2xl font-semibold text-primary">
            Услуга не найдена
          </h1>
          <Button href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
            Вернуться на главную
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="container-site">
          <button
            type="button"
            onClick={() => navigate("/", { state: { scrollToServices: true } })}
            className="mb-8 flex items-center gap-2 text-base font-medium text-primary transition-colors hover:text-accent"
          >
            <span aria-hidden>←</span> Назад к услугам
          </button>

          {id !== "telangiectasia" && (
            <Card className="mb-8 overflow-hidden !p-0" padding="none">
              <div className="relative flex h-80 items-center justify-center overflow-hidden bg-surface-muted md:h-96">
                <ServiceHeroImage
                  key={`${id}-${service.image}`}
                  src={service.image}
                  alt={service.title}
                  video={service.video}
                />
              </div>
            </Card>
          )}

          <Card padding="lg">
            <p className="section-eyebrow mb-3">
              Процедура
            </p>
            <h1 className="mb-6 font-display text-3xl font-semibold text-primary md:text-4xl">
              {service.title}
            </h1>

            <p className="text-body mb-8 md:text-xl">
              {service.description}
            </p>

            {service.galleryImages && service.galleryImages.length > 0 && (
              <div
                className={`mx-auto mb-10 grid max-w-4xl gap-5 ${
                  service.galleryImages.length === 1 ? "grid-cols-1" : "md:grid-cols-2"
                }`}
              >
                {service.galleryImages.map((img) => (
                  <div
                    key={img.src}
                    className="h-[400px] overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-muted"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {id === "evlk" ? (
              <div className="space-y-8">
                {service.advantages && service.advantages.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-primary mb-4">
                      Преимущества метода
                    </h2>
                    <ul className="space-y-3 text-muted">
                      {service.advantages.map((advantage, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span>{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.indications && service.indications.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-primary mb-4">
                      Кому показана процедура?
                    </h2>
                    <p className="text-muted mb-4 leading-relaxed">
                      Эндовенозную лазерную коагуляцию назначают при лечении варикоза вен на ногах. Операция будет эффективна при следующих симптомах:
                    </p>
                    <ul className="space-y-3 text-muted">
                      {service.indications.map((indication, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span>{indication}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-muted mt-4 leading-relaxed">
                      На консультации врач-флеболог расскажет вам о подготовке к процедуре, о периоде восстановления и побочных реакциях, выпишет направления на необходимые анализы.
                    </p>
                  </div>
                )}

                {service.procedure && service.procedure.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-primary mb-4">
                      Как проводится процедура ЭВЛК
                    </h2>
                    <ol className="space-y-3 text-muted list-decimal list-inside">
                      {service.procedure.map((step, index) => (
                        <li key={index} className="pl-2">
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {service.contraindications && service.contraindications.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-primary mb-4">
                      Противопоказания
                    </h2>
                    <p className="text-muted mb-4 leading-relaxed">
                      Процедуру ЭВЛК не назначают в следующих случаях:
                    </p>
                    <ul className="space-y-3 text-muted">
                      {service.contraindications.map((contraindication, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span>{contraindication}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : id === "phlebectomy" ? (
              <div className="space-y-8">
                <div>
                  <h2 className="font-semibold text-xl text-primary mb-4">
                    О методе минифлебэктомии по Варади
                  </h2>
                  <p className="text-muted leading-relaxed mb-4">
                    Во время осмотра флеболога, после дуплексного УЗИ нижних конечностей, определяется точный метод последующего лечения. Операция выполняется в плановом порядке, в назначенный день.
                  </p>
                  <p className="text-muted leading-relaxed">
                    Минифлебэктомия по Варади — это очень тонкая и серьёзная работа сосудистого хирурга. Анатомическое строение вен и венозной гемодинамики делает каждый случай индивидуальным. Именно от опыта и знаний хирурга зависит успешное проведение операции.
                  </p>
                </div>

                {service.advantages && service.advantages.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-primary mb-4">
                      Достоинства минифлебэктомии по Варади
                    </h2>
                    <ul className="space-y-3 text-muted">
                      {service.advantages.map((advantage, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span>{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.indications && service.indications.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-primary mb-4">
                      Когда назначают минифлебэктомию
                    </h2>
                    <p className="text-muted mb-4 leading-relaxed">
                      Минифлебэктомия назначается при следующих показаниях:
                    </p>
                    <ul className="space-y-3 text-muted">
                      {service.indications.map((indication, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span>{indication}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.contraindications && service.contraindications.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-primary mb-4">
                      Противопоказания к операции
                    </h2>
                    <p className="text-muted mb-4 leading-relaxed">
                      Процедуру минифлебэктомии не назначают в следующих случаях:
                    </p>
                    <ul className="space-y-3 text-muted">
                      {service.contraindications.map((contraindication, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span>{contraindication}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.recovery && service.recovery.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-primary mb-4">
                      Восстановительный период и рекомендации после минифлебэктомии
                    </h2>
                    <ul className="space-y-3 text-muted">
                      {service.recovery.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : id === "telangiectasia" ? (
              <div className="space-y-8">
                {service.causes && service.causes.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-primary mb-4">
                      Причины возникновения сосудистых образований на ногах
                    </h2>
                    <p className="text-muted leading-relaxed mb-4">
                      Внутрикожные капилляры слабеют, лопаются и так образуются сосудистые звёздочки. Нарушение кровообращения часто приводит к образованию видимых расширенных мелких сосудов под кожей. Они могут появиться в любом возрасте, особенно у людей, которые много времени проводят на ногах. Часто в таких случаях развивается варикозное расширение вен. Помимо негативного косметического эффекта, варикоз сопровождается судорогами в ногах, отёками и постоянным чувством усталости, а при отсутствии лечения может привести к более серьёзным заболеваниям.
                    </p>
                    <p className="text-muted leading-relaxed mb-4">
                      Это происходит по следующим причинам:
                    </p>
                    <ul className="space-y-3 text-muted mb-6">
                      {service.causes.map((cause, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span>{cause}</span>
                        </li>
                      ))}
                    </ul>
                    {service.image && (
                      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
                        <div className="rounded-lg overflow-hidden h-[400px]">
                          <img
                            src={service.image}
                            alt="Сосудистые звёздочки на ногах"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="rounded-lg overflow-hidden h-[400px]">
                          <img
                            src="/images/tele2detailed.jpeg"
                            alt="Лечение сосудистых звёздочек"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

              <div>
                <h2 className="font-semibold text-xl text-primary mb-4">
                    Метод лечения: КЛАКС
                </h2>
                  <p className="text-muted leading-relaxed mb-4">
                    КЛАКС — инновационный комплексный метод удаления сосудистых звёздочек и ретикулярных вен. Методика сочетает классическую склеротерапию с транскутанным лазерным лечением и криотерапией (замораживанием). Процедура выполняется на современном высококачественном лазерном оборудовании Candela, Vbeam Prima (США).
                  </p>
                    <p className="text-muted leading-relaxed">
                    Важно понимать, что сосудистые звёздочки могут скрывать более серьёзные проблемы. Перед процедурой необходимо посетить флеболога и пройти УЗИ-диагностику вен и сосудов, чтобы определить, не скрывается ли за визуальным дефектом более серьёзная проблема.
                  </p>
                </div>

                {service.advantages && service.advantages.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-primary mb-4">
                      Преимущества метода КЛАКС
                    </h2>
                    <ul className="space-y-3 text-muted">
                      {service.advantages.map((advantage, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span>{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.procedure && service.procedure.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-primary mb-4">
                      Как проводится процедура
                    </h2>
                    <p className="text-muted mb-4 leading-relaxed">
                      Процедура проводится в оборудованном кабинете после предварительного осмотра флеболога. Перед манипуляциями важно сообщить врачу о всех препаратах, которые вы принимаете в данный момент.
                    </p>
                    <ol className="space-y-3 text-muted list-decimal list-inside">
                      {service.procedure.map((step, index) => (
                        <li key={index} className="pl-2">
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                    <p className="text-muted mt-4 leading-relaxed">
                      Результат индивидуален. После процедуры рекомендуется больше отдыхать и посещать консультации врача. При любых неясных реакциях или нежелательных последствиях необходимо немедленно обратиться к лечащему врачу.
                    </p>
                  </div>
                )}

                {service.contraindications && service.contraindications.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-primary mb-4">
                      Противопоказания
                    </h2>
                    <p className="text-muted mb-4 leading-relaxed">
                      КЛАКС терапия имеет ряд противопоказаний, поэтому важно тщательно подготовиться и проконсультироваться с врачом перед процедурой:
                    </p>
                    <ul className="space-y-3 text-muted">
                      {service.contraindications.map((contraindication, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span>{contraindication}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-muted mt-4 leading-relaxed">
                      В некоторых случаях возможно проведение терапии лазером после консультации с доктором.
                    </p>
                  </div>
                )}

                <div className="bg-gradient-to-r from-primary to-primary-light rounded-[var(--radius-card)] p-6 md:p-8 text-white">
                  <h3 className="font-semibold text-lg mb-3">
                    Альтернативный метод лечения
                  </h3>
                  <p className="text-white/80 mb-4 leading-relaxed">
                    Помимо метода КЛАКС, для лечения сосудистых звёздочек также применяется склеротерапия — классический и проверенный временем метод, который может быть рекомендован в зависимости от индивидуальных особенностей вашего случая.
                  </p>
                  <a
                    href="/services/sclerotherapy"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/services/sclerotherapy");
                    }}
                    className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-white/30 bg-white px-6 py-3 font-semibold text-primary transition-colors hover:bg-accent hover:text-white"
                  >
                    <span>Узнать больше о склеротерапии</span>
                    <span>→</span>
                  </a>
                </div>

              </div>
            ) : id === "sclerotherapy" ? (
              <div className="space-y-8">
                {service.whenNeeded && service.whenNeeded.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-primary mb-4">
                      Когда нужно делать склеротерапию?
                    </h2>
                    <ul className="space-y-3 text-muted">
                      {service.whenNeeded.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.proceduresCount && (
                  <div>
                    <h2 className="font-semibold text-xl text-primary mb-4">
                      Сколько требуется лечебных процедур?
                    </h2>
                    <p className="text-muted leading-relaxed mb-4">
                      {service.proceduresCount}
                    </p>
                    {service.informDoctor && service.informDoctor.length > 0 && (
                      <div className="bg-surface-muted rounded-lg p-4">
                        <p className="font-semibold text-primary mb-3">Информируйте врача:</p>
                        <ul className="space-y-2 text-muted">
                          {service.informDoctor.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <span className="text-accent mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {service.contraindications && service.contraindications.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-primary mb-4">
                      Противопоказания к проведению склеротерапии вен
                    </h2>
                    <ul className="space-y-3 text-muted">
                      {service.contraindications.map((contraindication, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span>{contraindication}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.rehabilitation && service.rehabilitation.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-primary mb-4">
                      Реабилитация после склеротерапии
                    </h2>
                    <p className="text-muted mb-4 leading-relaxed">
                      Для успешного лечения и закрепления полученного результата после операции необходимо придерживаться следующих рекомендаций:
                    </p>
                    <ul className="space-y-3 text-muted">
                      {service.rehabilitation.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <>
                <h2 className="font-semibold text-xl text-primary mb-4">
                  Особенности процедуры:
                </h2>

                <ul className="space-y-3 text-muted">
                  {service.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-accent mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="mt-12 border-t border-border pt-8">
              <Button
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  goToSection("contacts");
                }}
              >
                Записаться на консультацию
              </Button>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;

