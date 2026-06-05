import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isTouchDevice(): boolean {
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(
    () =>
      typeof window !== "undefined" &&
      (prefersReducedMotion() || isTouchDevice()),
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(currentRef);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" },
    );

    observer.observe(currentRef);
    return () => observer.unobserve(currentRef);
  }, [delay, isVisible]);

  return (
    <div
      ref={ref}
      className={`max-md:transform-none md:transition-[opacity,transform] md:duration-500 md:ease-out ${
        isVisible
          ? "opacity-100 md:translate-y-0"
          : "max-md:opacity-100 opacity-0 md:translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;
