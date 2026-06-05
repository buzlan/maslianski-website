import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import {
  buttonClassName,
  type ButtonSize,
  type ButtonVariant,
} from "./buttonStyles";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <a className={buttonClassName(variant, size, className)} {...props}>
      {children}
    </a>
  );
}

interface ButtonElementProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function ButtonElement({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonElementProps) {
  return (
    <button
      type="button"
      className={buttonClassName(variant, size, className)}
      {...props}
    >
      {children}
    </button>
  );
}
