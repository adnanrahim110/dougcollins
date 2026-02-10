"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/* ────────────────────────────────────────────
   Preset factories
   Each returns a Framer-Motion variant object
   with `hidden` and `visible` (custom-index).
   ──────────────────────────────────────────── */
const makeVariant = {
  /** Blur + vertical slide (default) */
  blur: ({ distance, blur, duration, stagger, ease }) => ({
    hidden: { opacity: 0, y: distance, filter: `blur(${blur}px)` },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration, ease, delay: i * stagger },
    }),
  }),

  /** Fade + vertical slide + blur */
  fade: ({ distance, blur, duration, stagger, ease }) => ({
    hidden: { opacity: 0, y: distance, filter: `blur(${blur}px)` },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration, ease, delay: i * stagger },
    }),
  }),

  /** Horizontal slide from left + blur */
  "slide-left": ({ blur, duration, stagger, ease }) => ({
    hidden: { opacity: 0, x: -80, filter: `blur(${blur}px)` },
    visible: (i = 0) => ({
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: duration * 1.1, ease, delay: i * stagger },
    }),
  }),

  /** Horizontal slide from right + blur */
  "slide-right": ({ blur, duration, stagger, ease }) => ({
    hidden: { opacity: 0, x: 80, filter: `blur(${blur}px)` },
    visible: (i = 0) => ({
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: duration * 1.1, ease, delay: i * stagger },
    }),
  }),

  /** Scale up from slightly smaller + blur */
  scale: ({ blur, duration, stagger, ease }) => ({
    hidden: { opacity: 0, scale: 0.95, filter: `blur(${blur}px)` },
    visible: (i = 0) => ({
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration, ease, delay: i * stagger },
    }),
  }),

  /** Fade only — no movement, still blurs */
  "fade-only": ({ blur, duration, stagger, ease }) => ({
    hidden: { opacity: 0, filter: `blur(${blur}px)` },
    visible: (i = 0) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration, ease, delay: i * stagger },
    }),
  }),
};

/* ────────────────────────────────────────────
   Default ease — smooth cubic-bezier
   ──────────────────────────────────────────── */
const DEFAULT_EASE = [0.22, 1, 0.36, 1];

/**
 * BlurReveal — a scroll-triggered (or mount-triggered) reveal wrapper.
 *
 * @param {object}  props
 * @param {React.ReactNode}  props.children
 * @param {number}  [props.delay=0]       — Stagger index (multiplied by `stagger`)
 * @param {"blur"|"fade"|"slide-left"|"slide-right"|"scale"|"fade-only"|object} [props.preset="blur"]
 * @param {number}  [props.duration=1]    — Animation duration in seconds
 * @param {number}  [props.blur=12]       — Blur amount in pixels (blur preset only)
 * @param {number}  [props.distance=50]   — Slide distance in pixels
 * @param {number}  [props.stagger=0.15]  — Delay multiplier per index
 * @param {Array}   [props.ease]          — Custom cubic-bezier array
 * @param {boolean} [props.once=true]     — Trigger only once
 * @param {string}  [props.margin="-80px"]— IntersectionObserver rootMargin
 * @param {string}  [props.as="div"]      — HTML element type
 * @param {string}  [props.className]
 * @param {"scroll"|"mount"} [props.trigger="scroll"] — When to trigger
 */
export function BlurReveal({
  children,
  delay = 0,
  preset = "blur",
  duration = 1,
  blur: blurAmount = 12,
  distance = 50,
  stagger = 0.15,
  ease = DEFAULT_EASE,
  once = true,
  margin = "-80px",
  as = "div",
  className,
  trigger = "scroll",
  ...rest
}) {
  const MotionTag = motion[as] || motion.div;

  // Resolve variant — accept a preset string or a custom variant object
  const variant =
    typeof preset === "object"
      ? preset
      : (makeVariant[preset] || makeVariant.blur)({
          distance,
          blur: blurAmount,
          duration,
          stagger,
          ease,
        });

  // Trigger mode
  const triggerProps =
    trigger === "mount"
      ? { initial: "hidden", animate: "visible" }
      : {
          initial: "hidden",
          whileInView: "visible",
          viewport: { once, margin },
        };

  return (
    <MotionTag
      {...triggerProps}
      variants={variant}
      custom={delay}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export default BlurReveal;
