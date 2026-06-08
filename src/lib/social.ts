export interface SocialLink {
  id: "instagram" | "telegram";
  href: string;
  title: string;
  hint: string;
}

const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL ?? "";
const telegramUrl = import.meta.env.VITE_TELEGRAM_URL ?? "";

const links: SocialLink[] = [
  {
    id: "instagram",
    href: instagramUrl,
    title: "Instagram",
    hint: "Информация о здоровье вен, результаты до/после",
  },
  {
    id: "telegram",
    href: telegramUrl,
    title: "Telegram-канал",
    hint: "Разбор клинических случаев, вопрос-ответ",
  },
];

export const DOCTOR_SOCIAL_LINKS = links.filter((link) => link.href);
