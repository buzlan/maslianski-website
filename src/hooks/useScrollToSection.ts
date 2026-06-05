import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { scrollToSectionId } from "../lib/scroll";

export function useScrollToSection() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = useCallback(
    (sectionId: string) => {
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: sectionId } });
        return;
      }

      scrollToSectionId(sectionId);
    },
    [location.pathname, navigate],
  );

  return { goToSection };
}
