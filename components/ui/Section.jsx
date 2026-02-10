"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { forwardRef } from "react";

const spacingMap = {
  none: "",
  sm: "py-12 md:py-16 lg:py-20",
  md: "py-16 md:py-24 lg:py-32",
  lg: "py-24 md:py-32 lg:py-40",
  hero: "pt-32 pb-24 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40 min-h-screen flex items-center",
};

const containerMap = {
  narrow: "max-w-4xl",
  default: "max-w-350",
  wide: "max-w-screen-2xl",
  full: "max-w-full px-0",
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.08,
    },
  },
};

export const Section = forwardRef(
  (
    {
      children,
      className,
      tone = "dark",
      spacing = "md",
      container = "default",
      grain = false,
      animate = true,
      id,
      ...props
    },
    ref,
  ) => {
    const Comp = animate ? motion.section : "section";
    const motionProps = animate
      ? {
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, margin: "-80px" },
          variants: sectionVariants,
        }
      : {};

    return (
      <Comp
        ref={ref}
        id={id}
        data-tone={tone}
        className={cn(
          "relative",
          spacingMap[spacing],
          grain && "grain",
          className,
        )}
        {...motionProps}
        {...props}
      >
        <div
          className={cn(
            "relative z-10 w-full mx-auto px-5 sm:px-8 lg:px-12",
            containerMap[container],
          )}
        >
          {children}
        </div>
      </Comp>
    );
  },
);

Section.displayName = "Section";

export default Section;
