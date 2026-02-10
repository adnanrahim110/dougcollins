"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const toneStyles = {
  dark: {
    label: "text-white/50",
    textarea:
      "bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/30 focus:ring-primary-400/40 focus:border-primary-400/40",
  },
  light: {
    label: "text-charcoal/40",
    textarea:
      "bg-white border-charcoal/[0.06] text-ink placeholder:text-ink/30 focus:ring-primary-400/30 focus:border-primary-400/50",
  },
  primary: {
    label: "text-ink/50",
    textarea:
      "bg-ink/10 border-ink/15 text-ink placeholder:text-ink/40 focus:ring-primary-400/30 focus:border-primary-400/50",
  },
};

const sizeStyles = {
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-3 text-sm",
  lg: "px-5 py-3.5 text-sm",
};

const Textarea = forwardRef(
  (
    {
      label,
      tone = "light",
      size = "md",
      error,
      className,
      wrapperClassName,
      rows = 5,
      ...props
    },
    ref,
  ) => {
    const t = toneStyles[tone] || toneStyles.light;
    const s = sizeStyles[size] || sizeStyles.md;

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
        <textarea
          ref={ref}
          rows={rows}
          className={cn(
            "w-full border rounded-xl resize-none transition-all duration-300 outline-none ring-offset-0 focus:ring-2 focus-visible:ring-offset-0",
            t.textarea,
            s,
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

Textarea.displayName = "Textarea";

export { Textarea };
export default Textarea;
