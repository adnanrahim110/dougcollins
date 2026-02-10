"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/* ────────────────────────────────────────────
   Tone → text-color mapping
   ──────────────────────────────────────────── */
const tones = {
  dark: "text-primary-600",
  light: "text-primary-400",
  cream: "text-primary-500",
  charcoal: "text-primary-400",
};

/* ────────────────────────────────────────────
   Size presets
   ──────────────────────────────────────────── */
const textSizes = {
  xs: "text-[10px]",
  sm: "text-[11px]",
  md: "text-xs",
  lg: "text-sm",
};

/* ────────────────────────────────────────────
   Flex alignment
   ──────────────────────────────────────────── */
const flexAligns = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

/* ────────────────────────────────────────────
   Line color per tone
   ──────────────────────────────────────────── */
const lineColors = {
  dark: "bg-primary-500",
  light: "bg-primary-500",
  cream: "bg-primary-500",
  charcoal: "bg-primary-400",
};

/**
 * Subtitle — a design-system label / eyebrow component.
 *
 * @param {object}  props
 * @param {React.ReactNode}  props.children
 * @param {"dark"|"light"|"cream"|"charcoal"} [props.tone="dark"]
 * @param {"xs"|"sm"|"md"|"lg"} [props.size="sm"]
 * @param {"left"|"center"|"right"} [props.align="left"]
 * @param {boolean|"left"|"both"} [props.line=false] — Animated accent line(s)
 * @param {number}  [props.lineWidth=48]    — Line width in pixels
 * @param {number}  [props.lineDelay=0.2]   — Line animation delay
 * @param {string}  [props.tracking]        — Override tracking class
 * @param {string}  [props.as="p"]          — HTML element
 * @param {string}  [props.className]
 */
export function Subtitle({
  children,
  tone = "dark",
  size = "sm",
  align = "left",
  line = false,
  lineWidth = 48,
  lineDelay = 0.2,
  tracking,
  as: Tag = "p",
  className,
  ...rest
}) {
  const textClass = cn(
    "font-semibold uppercase",
    tracking || "tracking-[0.25em]",
    tones[tone] || tones.dark,
    textSizes[size] || textSizes.sm,
  );

  const lineClassName = cn(
    "h-0.5 rounded-full",
    lineColors[tone] || lineColors.dark,
  );

  /* ── With animated line(s) ── */
  if (line) {
    const showBoth = line === "both";

    return (
      <div
        className={cn("flex items-center gap-3", flexAligns[align], className)}
        {...rest}
      >
        {/* Left line (always shown when line is truthy) */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: lineWidth }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: lineDelay }}
          className={lineClassName}
        />

        <Tag className={textClass}>{children}</Tag>

        {/* Right line (only when line="both") */}
        {showBoth && (
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: lineWidth }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: lineDelay }}
            className={lineClassName}
          />
        )}
      </div>
    );
  }

  /* ── Plain text ── */
  return (
    <Tag
      className={cn(
        textClass,
        align === "center" && "text-center",
        align === "right" && "text-right",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Subtitle;
