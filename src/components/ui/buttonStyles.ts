export type ButtonVariant = "primary" | "accent" | "outline";
export type ButtonSize = "sm" | "md";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white border border-primary hover:bg-primary-light",
  accent:
    "bg-accent text-white border border-accent hover:bg-accent-muted",
  outline:
    "bg-transparent text-primary border border-border hover:border-accent hover:text-accent",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-sm md:text-base",
  md: "px-7 py-3 text-base",
};

const baseClasses =
  "inline-flex items-center justify-center font-semibold rounded-[var(--radius-button)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60 disabled:cursor-not-allowed";

export function buttonClassName(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className = "",
) {
  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
}
