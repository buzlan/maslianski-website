import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "md" | "lg" | "none";
}

const paddingClasses = {
  md: "p-6 md:p-8",
  lg: "p-8 md:p-10",
  none: "",
};

export function Card({
  children,
  className = "",
  padding = "md",
}: CardProps) {
  return (
    <div
      className={`rounded-[var(--radius-card)] border border-border bg-surface-elevated shadow-[0_4px_24px_rgb(28_42_68/0.06)] ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
