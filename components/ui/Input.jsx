"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const toneStyles = {
  dark: {
    wrapper: "",
    label: "text-white/50",
    input:
      "bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/30 focus:ring-primary-400/40 focus:border-primary-400/40",
  },
  light: {
    wrapper: "",
    label: "text-charcoal/40",
    input:
      "bg-white border-charcoal/[0.06] text-ink placeholder:text-ink/30 focus:ring-primary-400/30 focus:border-primary-400/50",
  },
  primary: {
    wrapper: "",
    label: "text-ink/50",
    input:
      "bg-ink/10 border-ink/15 text-ink placeholder:text-ink/40 focus:ring-primary-400/30 focus:border-primary-400/50",
  },
};

const sizeStyles = {
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-3 text-sm",
  lg: "px-5 py-3.5 text-sm",
};

const variantStyles = {
  filled: "rounded-xl",
  line: "bg-transparent! border-0! border-b! rounded-none px-0!",
};

const Input = forwardRef(
  (
    {
      label,
      tone = "light",
      size = "md",
      variant = "filled",
      error,
      className,
      wrapperClassName,
      ...props
    },
    ref,
  ) => {
    const t = toneStyles[tone] || toneStyles.light;
    const s = sizeStyles[size] || sizeStyles.md;
    const v = variantStyles[variant] || variantStyles.filled;

    return (
      <div className={cn("w-full", wrapperClassName)}>
        {label && (
          <label
            className={cn(
              "block text-[11px] uppercase tracking-[0.15em] font-semibold mb-2",
              t.label,
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full border transition-all duration-300 outline-none ring-offset-0 focus:ring-2 focus-visible:ring-offset-0",
            t.input,
            s,
            v,
            error && "border-accent-500! ring-accent-500/20!",
            className,
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-[11px] text-accent-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
export default Input;
