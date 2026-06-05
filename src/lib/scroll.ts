import { HEADER_HEIGHT } from "./navigation";

const SCROLL_OFFSET = HEADER_HEIGHT + 16;
const MAX_ATTEMPTS = 4;

export function scrollToSectionId(sectionId: string, attempt = 0): boolean {
  const element = document.getElementById(sectionId);
  if (!element) {
    if (attempt < MAX_ATTEMPTS) {
      window.setTimeout(
        () => scrollToSectionId(sectionId, attempt + 1),
        80 * (attempt + 1),
      );
    }
    return false;
  }

  const top =
    element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  const target = Math.max(0, top);

  if (Math.abs(window.scrollY - target) < 4) {
    return true;
  }

  window.scrollTo({ top: target, behavior: "auto" });
  return true;
}
