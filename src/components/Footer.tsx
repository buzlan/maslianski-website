import YandexMap from "./YandexMap";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-surface-muted pt-16 pb-10">
      <div className="container-site grid gap-12 md:grid-cols-2">
        <div>
          <h3 className="font-display text-2xl font-semibold text-primary">
            Маслянский Вячеслав Борисович
          </h3>
          <p className="mt-1 text-base text-muted">Врач-флеболог</p>

          <p className="text-body mt-5 max-w-md">
            Диагностика и лечение заболеваний вен. Индивидуальный подход,
            современная флебология и внимание к каждому пациенту.
          </p>

          <p className="mt-5 text-base text-primary">
            <span className="font-semibold">Адрес:</span>{" "}
            <span className="text-muted">
              г. Минск, ул. Героев 120-й дивизии, 3а
            </span>
          </p>
        </div>

        <YandexMap />
      </div>

      <p className="container-site mt-12 text-center text-sm text-muted">
        © {new Date().getFullYear()} Все права защищены
      </p>
    </footer>
  );
};

export default Footer;
