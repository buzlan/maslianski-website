import { useEffect } from "react";

const SITE_URL = "https://maslianski.by";

export const DEFAULT_PAGE_META = {
  title:
    "Врач флеболог в Минске - Маслянский Вячеслав Борисович | Лечение варикоза",
  description:
    "Врач флеболог в Минске - Маслянский Вячеслав Борисович. Лечение варикозного расширения вен, телеангиоэктазий, современная флебология. Клиника в Уручье. Запись: 7095, +375 (44) 538-70-95, +375 (29) 508-70-95, +375 (17) 370-00-05",
  path: "/",
  image: `${SITE_URL}/images/logo.jpeg`,
} as const;

function setMeta(
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

function setCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );

  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }

  element.href = href;
}

function applyPageMeta({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image: string;
}) {
  const url = `${SITE_URL}${path}`;

  document.title = title;
  setMeta("name", "title", title);
  setMeta("name", "description", description);
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);
  setMeta("property", "og:url", url);
  setMeta("property", "og:image", image);
  setMeta("property", "twitter:title", title);
  setMeta("property", "twitter:description", description);
  setMeta("property", "twitter:image", image);
  setCanonical(url);
}

export function usePageMeta(meta: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}) {
  const path = meta.path ?? "/";
  const image = meta.image ?? DEFAULT_PAGE_META.image;

  useEffect(() => {
    applyPageMeta({
      title: meta.title,
      description: meta.description,
      path,
      image,
    });

    return () => {
      applyPageMeta(DEFAULT_PAGE_META);
    };
  }, [meta.title, meta.description, path, image]);
}
