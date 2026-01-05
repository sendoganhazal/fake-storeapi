"use client";

import { ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "info"
  | "warning";

type ButtonProps = {
  variant?: ButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = "primary",
  loading = false,
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        btn
        btn-${[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className || ""}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {children}
    </button>
  );
}
