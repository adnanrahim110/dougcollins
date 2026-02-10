"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { forwardRef } from "react";

const variants = {
  fill: "bg-primary text-primary-foreground hover:bg-primary-600 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.97]",
  "fill-secondary":
    "bg-secondary text-white hover:bg-secondary-700 hover:shadow-lg hover:shadow-secondary/20 active:scale-[0.97]",
  outline:
    "bg-transparent border-2 border-white/15 text-white hover:border-primary hover:text-primary active:scale-[0.97]",
  "outline-light":
    "bg-transparent border-2 border-ink/15 text-ink hover:border-primary hover:text-primary active:scale-[0.97]",
  ghost:
    "bg-transparent text-white/70 hover:text-primary hover:bg-white/5 active:scale-[0.97]",
  "ghost-light":
    "bg-transparent text-ink/70 hover:text-primary hover:bg-ink/5 active:scale-[0.97]",
};

const sizes = {
  sm: "px-5 py-2.5 text-[11px]",
  md: "px-7 py-3 text-[13px]",
  lg: "px-9 py-4 text-sm",
};

export const Button = forwardRef(
  (
    {
      children,
      href,
      onClick,
      variant = "fill",
      size = "md",
      className,
      type = "button",
      disabled = false,
      magnetic = false,
      ...props
    },
    ref,
  ) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2",
      "uppercase tracking-[0.12em] font-semibold rounded-full",
      "transition-all duration-300",
      "disabled:opacity-40 disabled:pointer-events-none",
      "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      variants[variant],
      sizes[size],
      className,
    );

    if (href) {
      return (
        <Link ref={ref} href={href} className={classes} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        className={classes}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
