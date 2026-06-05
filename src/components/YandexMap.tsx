"use client";
import React, { useEffect } from "react";

const YandexMap: React.FC = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const interval = setInterval(() => {
      if (window.ymaps) {
        clearInterval(interval);

        window.ymaps.ready(() => {
          // Координаты для адреса: г. Минск, ул. Героев 120-й дивизии, 3а
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
            }
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
      style={{ width: "100%", height: "350px", borderRadius: "20px" }}
    ></div>
  );
};

export default YandexMap;
