import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
  const [imageLoading, setImageLoading] = useState(true);
  const heroImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setImageLoading(true);

    const img = heroImageRef.current;
    if (img?.complete) {
      setImageLoading(false);
    }
  }, [id]);

  const service = servicesData.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F6F3]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1C2A44] mb-4">Услуга не найдена</h1>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-full bg-[#1C2A44] text-white font-semibold hover:shadow-lg transition"
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F3]">
      <Header />
      <main className="flex-1 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={() => {
              // Навигация с флагом, что нужно прокрутить к услугам
              navigate("/", { state: { scrollToServices: true } });
            }}
            className="mb-8 text-[#1C2A44] hover:text-[#C5A572] transition-colors flex items-center gap-2"
          >
            <span>←</span> Назад к услугам
          </button>

          {id !== "telangiectasia" && (
          <div className="bg-white rounded-3xl shadow-xl border border-white/70 overflow-hidden mb-8">
              <div className="relative h-96 overflow-hidden flex items-center justify-center bg-white">
                {imageLoading && service.image && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-[#1C2A44] rounded-full animate-spin"></div>
                  </div>
                )}
                {service.video ? (
                  <video
                    src={service.video}
                    controls
                    className="w-full h-full object-cover"
                    poster={service.image || undefined}
                  >
                    Ваш браузер не поддерживает воспроизведение видео.
                  </video>
                ) : service.image ? (
              <img
                ref={heroImageRef}
                key={service.image}
                src={service.image}
                alt={service.title}
                    className={`object-cover w-full h-full transition-opacity duration-300 ${
                      imageLoading ? "opacity-0" : "opacity-100"
                    }`}
                    onLoad={() => setImageLoading(false)}
                    onError={() => setImageLoading(false)}
              />
                ) : null}
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl shadow-xl border border-white/70 p-8 md:p-12">
            <h1 className="font-serif text-3xl md:text-4xl text-[#1C2A44] mb-6">
              {service.title}
            </h1>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {service.description}
            </p>

            {service.galleryImages && service.galleryImages.length > 0 && (
              <div
                className={`max-w-4xl mx-auto grid gap-6 mb-10 ${
                  service.galleryImages.length === 1 ? "grid-cols-1" : "md:grid-cols-2"
                }`}
              >
                {service.galleryImages.map((img) => (
                  <div key={img.src} className="rounded-lg overflow-hidden h-[400px] bg-gray-100">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {id === "evlk" ? (
              <div className="space-y-8">
                {service.advantages && service.advantages.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-[#1C2A44] mb-4">
                      Преимущества метода
                    </h2>
                    <ul className="space-y-3 text-gray-700">
                      {service.advantages.map((advantage, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-[#C5A572] mt-1">•</span>
                          <span>{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.indications && service.indications.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-[#1C2A44] mb-4">
                      Кому показана процедура?
                    </h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Эндовенозную лазерную коагуляцию назначают при лечении варикоза вен на ногах. Операция будет эффективна при следующих симптомах:
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      {service.indications.map((indication, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-[#C5A572] mt-1">•</span>
                          <span>{indication}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-gray-700 mt-4 leading-relaxed">
                      На консультации врач-флеболог расскажет вам о подготовке к процедуре, о периоде восстановления и побочных реакциях, выпишет направления на необходимые анализы.
                    </p>
                  </div>
                )}

                {service.procedure && service.procedure.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-[#1C2A44] mb-4">
                      Как проводится процедура ЭВЛК
                    </h2>
                    <ol className="space-y-3 text-gray-700 list-decimal list-inside">
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
                    <h2 className="font-semibold text-xl text-[#1C2A44] mb-4">
                      Противопоказания
                    </h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Процедуру ЭВЛК не назначают в следующих случаях:
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      {service.contraindications.map((contraindication, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-[#C5A572] mt-1">•</span>
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
                  <h2 className="font-semibold text-xl text-[#1C2A44] mb-4">
                    О методе минифлебэктомии по Варади
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Во время осмотра флеболога, после дуплексного УЗИ нижних конечностей, определяется точный метод последующего лечения. Операция выполняется в плановом порядке, в назначенный день.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Минифлебэктомия по Варади — это очень тонкая и серьёзная работа сосудистого хирурга. Анатомическое строение вен и венозной гемодинамики делает каждый случай индивидуальным. Именно от опыта и знаний хирурга зависит успешное проведение операции.
                  </p>
                </div>

                {service.advantages && service.advantages.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-[#1C2A44] mb-4">
                      Достоинства минифлебэктомии по Варади
                    </h2>
                    <ul className="space-y-3 text-gray-700">
                      {service.advantages.map((advantage, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-[#C5A572] mt-1">•</span>
                          <span>{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.indications && service.indications.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-[#1C2A44] mb-4">
                      Когда назначают минифлебэктомию
                    </h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Минифлебэктомия назначается при следующих показаниях:
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      {service.indications.map((indication, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-[#C5A572] mt-1">•</span>
                          <span>{indication}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.contraindications && service.contraindications.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-[#1C2A44] mb-4">
                      Противопоказания к операции
                    </h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Процедуру минифлебэктомии не назначают в следующих случаях:
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      {service.contraindications.map((contraindication, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-[#C5A572] mt-1">•</span>
                          <span>{contraindication}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.recovery && service.recovery.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-[#1C2A44] mb-4">
                      Восстановительный период и рекомендации после минифлебэктомии
                    </h2>
                    <ul className="space-y-3 text-gray-700">
                      {service.recovery.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-[#C5A572] mt-1">•</span>
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
                    <h2 className="font-semibold text-xl text-[#1C2A44] mb-4">
                      Причины возникновения сосудистых образований на ногах
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Внутрикожные капилляры слабеют, лопаются и так образуются сосудистые звёздочки. Нарушение кровообращения часто приводит к образованию видимых расширенных мелких сосудов под кожей. Они могут появиться в любом возрасте, особенно у людей, которые много времени проводят на ногах. Часто в таких случаях развивается варикозное расширение вен. Помимо негативного косметического эффекта, варикоз сопровождается судорогами в ногах, отёками и постоянным чувством усталости, а при отсутствии лечения может привести к более серьёзным заболеваниям.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Это происходит по следующим причинам:
                    </p>
                    <ul className="space-y-3 text-gray-700 mb-6">
                      {service.causes.map((cause, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-[#C5A572] mt-1">•</span>
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
                <h2 className="font-semibold text-xl text-[#1C2A44] mb-4">
                    Метод лечения: КЛАКС
                </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    КЛАКС — инновационный комплексный метод удаления сосудистых звёздочек и ретикулярных вен. Методика сочетает классическую склеротерапию с транскутанным лазерным лечением и криотерапией (замораживанием). Процедура выполняется на современном высококачественном лазерном оборудовании Candela, Vbeam Prima (США).
                  </p>
                    <p className="text-gray-700 leading-relaxed">
                    Важно понимать, что сосудистые звёздочки могут скрывать более серьёзные проблемы. Перед процедурой необходимо посетить флеболога и пройти УЗИ-диагностику вен и сосудов, чтобы определить, не скрывается ли за визуальным дефектом более серьёзная проблема.
                  </p>
                </div>

                {service.advantages && service.advantages.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-[#1C2A44] mb-4">
                      Преимущества метода КЛАКС
                    </h2>
                    <ul className="space-y-3 text-gray-700">
                      {service.advantages.map((advantage, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-[#C5A572] mt-1">•</span>
                          <span>{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.procedure && service.procedure.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-[#1C2A44] mb-4">
                      Как проводится процедура
                    </h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Процедура проводится в оборудованном кабинете после предварительного осмотра флеболога. Перед манипуляциями важно сообщить врачу о всех препаратах, которые вы принимаете в данный момент.
                    </p>
                    <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                      {service.procedure.map((step, index) => (
                        <li key={index} className="pl-2">
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                    <p className="text-gray-700 mt-4 leading-relaxed">
                      Результат индивидуален. После процедуры рекомендуется больше отдыхать и посещать консультации врача. При любых неясных реакциях или нежелательных последствиях необходимо немедленно обратиться к лечащему врачу.
                    </p>
                  </div>
                )}

                {service.contraindications && service.contraindications.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-[#1C2A44] mb-4">
                      Противопоказания
                    </h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      КЛАКС терапия имеет ряд противопоказаний, поэтому важно тщательно подготовиться и проконсультироваться с врачом перед процедурой:
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      {service.contraindications.map((contraindication, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-[#C5A572] mt-1">•</span>
                          <span>{contraindication}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-gray-700 mt-4 leading-relaxed">
                      В некоторых случаях возможно проведение терапии лазером после консультации с доктором.
                    </p>
                  </div>
                )}

                <div className="bg-gradient-to-r from-[#1C2A44] to-[#2A3A55] rounded-2xl p-6 md:p-8 text-white">
                  <h3 className="font-semibold text-lg mb-3">
                    Альтернативный метод лечения
                  </h3>
                  <p className="text-gray-200 mb-4 leading-relaxed">
                    Помимо метода КЛАКС, для лечения сосудистых звёздочек также применяется склеротерапия — классический и проверенный временем метод, который может быть рекомендован в зависимости от индивидуальных особенностей вашего случая.
                  </p>
                  <a
                    href="/services/sclerotherapy"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/services/sclerotherapy");
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1C2A44] font-semibold rounded-full hover:bg-[#C5A572] hover:text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
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
                    <h2 className="font-semibold text-xl text-[#1C2A44] mb-4">
                      Когда нужно делать склеротерапию?
                    </h2>
                    <ul className="space-y-3 text-gray-700">
                      {service.whenNeeded.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-[#C5A572] mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.proceduresCount && (
                  <div>
                    <h2 className="font-semibold text-xl text-[#1C2A44] mb-4">
                      Сколько требуется лечебных процедур?
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {service.proceduresCount}
                    </p>
                    {service.informDoctor && service.informDoctor.length > 0 && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="font-semibold text-[#1C2A44] mb-3">Информируйте врача:</p>
                        <ul className="space-y-2 text-gray-700">
                          {service.informDoctor.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <span className="text-[#C5A572] mt-1">•</span>
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
                    <h2 className="font-semibold text-xl text-[#1C2A44] mb-4">
                      Противопоказания к проведению склеротерапии вен
                    </h2>
                    <ul className="space-y-3 text-gray-700">
                      {service.contraindications.map((contraindication, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-[#C5A572] mt-1">•</span>
                          <span>{contraindication}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.rehabilitation && service.rehabilitation.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-xl text-[#1C2A44] mb-4">
                      Реабилитация после склеротерапии
                    </h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Для успешного лечения и закрепления полученного результата после операции необходимо придерживаться следующих рекомендаций:
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      {service.rehabilitation.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-[#C5A572] mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <>
                <h2 className="font-semibold text-xl text-[#1C2A44] mb-4">
                  Особенности процедуры:
                </h2>

                <ul className="space-y-3 text-gray-700">
                  {service.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-[#C5A572] mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="mt-12 pt-8 border-t border-gray-200">
              <a
                href="/#contacts"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                  setTimeout(() => {
                    const contactsElement = document.getElementById("contacts");
                    if (contactsElement) {
                      contactsElement.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 100);
                }}
                className="inline-block px-8 py-4 rounded-full bg-[#1C2A44] text-white font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition"
              >
                Записаться на консультацию
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;

