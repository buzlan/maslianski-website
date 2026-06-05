import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  variant?: "default" | "muted";
  className?: string;
  children: ReactNode;
}

const variantClasses = {
  default: "bg-surface",
  muted: "bg-surface-muted",
};

export function Section({
  id,
  variant = "default",
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-20 md:py-24 ${variantClasses[variant]} ${className}`}
    >
      <div className="container-site">{children}</div>
    </section>
  );
}
