import { HEADER_HEIGHT } from "./navigation";

const SCROLL_OFFSET = HEADER_HEIGHT + 16;
const MAX_ATTEMPTS = 6;
const RETRY_DELAYS = [80, 200, 450, 900];

function alignSection(sectionId: string): boolean {
  const element = document.getElementById(sectionId);
  if (!element) {
    return false;
  }

  const marginTop = Number.parseFloat(
    window.getComputedStyle(element).scrollMarginTop,
  );
  const offset = Math.max(
    SCROLL_OFFSET,
    Number.isFinite(marginTop) ? marginTop : 0,
  );
  const top =
    element.getBoundingClientRect().top + window.scrollY - offset;
  const target = Math.max(0, top);

  if (Math.abs(window.scrollY - target) >= 4) {
    window.scrollTo({ top: target, behavior: "auto" });
  }
  return true;
}

export function scrollToSectionId(sectionId: string, attempt = 0): boolean {
  const aligned = alignSection(sectionId);
  if (!aligned && attempt < MAX_ATTEMPTS) {
    window.setTimeout(
      () => scrollToSectionId(sectionId, attempt + 1),
      80 * (attempt + 1),
    );
    return false;
  }

  if (attempt === 0) {
    for (const delay of RETRY_DELAYS) {
      window.setTimeout(() => alignSection(sectionId), delay);
    }
  }
  return aligned;
}
