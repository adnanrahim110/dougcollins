"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/* ────────────────────────────────────────────
   Size presets — responsive typography scale
   ──────────────────────────────────────────── */
const sizes = {
  xs: "text-xl md:text-2xl",
  sm: "text-2xl md:text-3xl",
  md: "text-3xl md:text-4xl",
  lg: "text-4xl md:text-5xl",
  xl: "text-4xl md:text-5xl lg:text-[3.5rem]",
  "2xl": "text-5xl md:text-6xl lg:text-[4rem]",
  hero: "text-6xl sm:text-7xl md:text-8xl lg:text-[7rem]",
};

/* ────────────────────────────────────────────
   Tone → text-color mapping
   ──────────────────────────────────────────── */
const tones = {
  dark: "text-charcoal",
  light: "text-paper",
  cream: "text-charcoal",
  charcoal: "text-paper",
};

/* ────────────────────────────────────────────
   Line-height per size
   ──────────────────────────────────────────── */
const leadings = {
  xs: "leading-tight",
  sm: "leading-tight",
  md: "leading-tight",
  lg: "leading-[1.1]",
  xl: "leading-[1.1]",
  "2xl": "leading-[1.05]",
  hero: "leading-[0.9]",
};

/* ────────────────────────────────────────────
   Alignment
   ──────────────────────────────────────────── */
const aligns = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

/* ────────────────────────────────────────────
   Font weight
   ──────────────────────────────────────────── */
const weights = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

/**
 * Title — a design-system heading component.
 *
 * @param {object}  props
 * @param {React.ReactNode}  props.children
 * @param {string}  [props.as="h2"]       — HTML heading tag (h1–h6)
 * @param {"xs"|"sm"|"md"|"lg"|"xl"|"2xl"|"hero"} [props.size="lg"]
 * @param {"dark"|"light"|"cream"|"charcoal"} [props.tone="dark"]
 * @param {"normal"|"medium"|"semibold"|"bold"} [props.weight="bold"]
 * @param {boolean} [props.italic=false]
 * @param {"left"|"center"|"right"} [props.align="left"]
 * @param {string}  [props.tracking]      — Optional Tailwind tracking class override
 * @param {string}  [props.className]     — Extra classes
 */
export function Title({
  children,
  as: Tag = "h2",
  size = "lg",
  tone = "dark",
  weight = "bold",
  italic = false,
  align = "left",
  tracking,
  className,
  ...rest
}) {
  return (
    <Tag
      className={cn(
        "font-display",
        sizes[size] || sizes.lg,
        tones[tone] || tones.dark,
        leadings[size] || leadings.lg,
        aligns[align],
        weights[weight] || weights.bold,
        italic && "italic",
        tracking,
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ────────────────────────────────────────────
   Title.Gradient — inline gradient text span
   with optional animated underline.

   Usage:
     <Title size="xl" tone="cream">
       Where Technology Meets{" "}
       <Title.Gradient underline>Imagination</Title.Gradient>
     </Title>
   ──────────────────────────────────────────── */
function GradientText({
  children,
  underline = false,
  variant = "primary",
  underlineDelay = 0.9,
  className,
}) {
  const gradients = {
    primary: "text-gradient",
    violet: "text-gradient-violet",
  };

  return (
    <span className={cn("relative inline-block", className)}>
      <span className={gradients[variant] || gradients.primary}>
        {children}
      </span>
      {underline && (
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: underlineDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute -bottom-1 left-0 right-0 h-0.75 bg-linear-to-r from-primary-400 to-primary-600 rounded-full origin-left"
        />
      )}
    </span>
  );
}

Title.Gradient = GradientText;

export default Title;
