import { HEADER_HEIGHT } from "./navigation";

const SCROLL_OFFSET = HEADER_HEIGHT + 16;
const MAX_ATTEMPTS = 20;

export function scrollToSectionId(sectionId: string, attempt = 0): boolean {
  const element = document.getElementById(sectionId);
  if (!element) {
    if (attempt < MAX_ATTEMPTS) {
      requestAnimationFrame(() => scrollToSectionId(sectionId, attempt + 1));
    }
    return false;
  }

  const top =
    element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;

  window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
  return true;
}
