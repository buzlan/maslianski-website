import { useEffect } from "react";

const YandexMap: React.FC = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const interval = window.setInterval(() => {
      if (window.ymaps) {
        clearInterval(interval);

        window.ymaps.ready(() => {
          const coordinates: [number, number] = [53.94964, 27.707933];

          const map = new window.ymaps.Map("map", {
            center: coordinates,
            zoom: 16,
            controls: ["zoomControl"],
          });

          const placemark = new window.ymaps.Placemark(
            coordinates,
            {
              iconContent: "Клиника в Уручье",
              balloonContent: "г. Минск, ул. Героев 120-й дивизии, 3а",
            },
            {
              preset: "islands#blackStretchyIcon",
            },
          );

          map.geoObjects.add(placemark);
        });
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="map"
      className="h-[350px] w-full overflow-hidden rounded-[var(--radius-card)] border border-border"
    />
  );
};

export default YandexMap;
