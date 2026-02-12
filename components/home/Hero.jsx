"use client";

import Button from "@/components/ui/Button";
import Subtitle from "@/components/ui/Subtitle";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";

const MainScene = dynamic(
  () => import("@/components/three/MainScene").then((m) => m.MainScene),
  { ssr: false },
);

const useLayerMotion = (
  progress,
  { start, end, y, scale, blur, x = 0, rotate = 0 },
) => {
  const tail = Math.min(1, end + 0.28);
  const opacity = useTransform(
    progress,
    [0, start, end, tail, 1],
    [1, 1, 0.78, 0.16, 0],
  );
  const translateY = useTransform(
    progress,
    [0, start, end, 1],
    [0, 0, -y, -y * 1.24],
  );
  const translateX = useTransform(
    progress,
    [0, start, end, 1],
    [0, 0, x, x * 1.18],
  );
  const layerScale = useTransform(
    progress,
    [0, start, end, 1],
    [1, 1, scale, scale - 0.025],
  );
  const blurAmount = useTransform(
    progress,
    [0, start, end, 1],
    [0, 0, blur, blur + 3.4],
  );
  const rotateZ = useTransform(
    progress,
    [0, start, end, 1],
    [0, 0, rotate, rotate * 1.14],
  );
  const filter = useTransform(
    blurAmount,
    (value) => `blur(${value.toFixed(2)}px)`,
  );

  return {
    opacity,
    y: translateY,
    x: translateX,
    scale: layerScale,
    rotateZ,
    filter,
  };
};

export default function Hero() {
  const sectionRef = useRef(null);
  const sceneScrollRef = useRef({ progress: 0 });
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const smoothedProgress = useSpring(scrollYProgress, {
    stiffness: shouldReduceMotion ? 126 : 64,
    damping: shouldReduceMotion ? 34 : 23,
    mass: shouldReduceMotion ? 0.38 : 0.64,
  });
  useMotionValueEvent(smoothedProgress, "change", (latest) => {
    sceneScrollRef.current.progress = latest;
  });

  const sceneOpacity = useTransform(
    smoothedProgress,
    [0, 0.7, 1],
    [1, 0.72, 0.42],
  );
  const overlayOpacity = useTransform(
    smoothedProgress,
    [0, 0.62, 1],
    [0.22, 0.6, 0.82],
  );
  const vignetteOpacity = useTransform(
    smoothedProgress,
    [0, 0.7, 1],
    [0.1, 0.26, 0.38],
  );
  const contentY = useTransform(
    smoothedProgress,
    [0, 0.24, 1],
    [0, shouldReduceMotion ? -12 : -28, shouldReduceMotion ? -42 : -122],
  );
  const contentOpacity = useTransform(
    smoothedProgress,
    [0, 0.62, 1],
    [1, 0.72, 0.44],
  );
  const contentScale = useTransform(smoothedProgress, [0, 1], [1, 0.95]);

  const subtitleMotion = useLayerMotion(smoothedProgress, {
    start: 0.04,
    end: 0.24,
    y: shouldReduceMotion ? 10 : 40,
    scale: 0.985,
    blur: shouldReduceMotion ? 0 : 6,
    x: shouldReduceMotion ? 0 : -12,
    rotate: shouldReduceMotion ? 0 : -1.2,
  });
  const titleMotion = useLayerMotion(smoothedProgress, {
    start: 0.08,
    end: 0.38,
    y: shouldReduceMotion ? 15 : 72,
    scale: 0.96,
    blur: shouldReduceMotion ? 0 : 12,
    rotate: shouldReduceMotion ? 0 : -0.45,
  });
  const copyMotion = useLayerMotion(smoothedProgress, {
    start: 0.16,
    end: 0.48,
    y: shouldReduceMotion ? 13 : 58,
    scale: 0.97,
    blur: shouldReduceMotion ? 0 : 9,
    x: shouldReduceMotion ? 0 : 10,
    rotate: shouldReduceMotion ? 0 : 0.55,
  });
  const ctaMotion = useLayerMotion(smoothedProgress, {
    start: 0.22,
    end: 0.56,
    y: shouldReduceMotion ? 14 : 64,
    scale: 0.965,
    blur: shouldReduceMotion ? 0 : 10,
    x: shouldReduceMotion ? 0 : 14,
    rotate: shouldReduceMotion ? 0 : 0.85,
  });
  const hintMotion = useLayerMotion(smoothedProgress, {
    start: 0.02,
    end: 0.2,
    y: shouldReduceMotion ? 8 : 38,
    scale: 0.98,
    blur: shouldReduceMotion ? 0 : 6,
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#050505] text-white selection:bg-[#C6A665] selection:text-black"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: "blur(14px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{
          duration: 1.8,
          delay: 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0 z-0 pointer-events-none will-change-transform"
      >
        <motion.div
          style={{
            opacity: sceneOpacity,
          }}
          className="absolute inset-0 will-change-transform"
        >
          <MainScene className="opacity-100" scrollRef={sceneScrollRef} />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 z-1 bg-linear-to-b from-[#050505]/80 via-transparent to-[#050505] pointer-events-none"
      />
      <motion.div
        style={{ opacity: vignetteOpacity }}
        className="absolute inset-0 z-2 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_22%,rgba(5,5,5,0.35)_58%,rgba(5,5,5,0.8)_100%)]"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="relative z-10 h-full max-w-350 mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-center items-center text-center"
      >
        <motion.div style={subtitleMotion} className="mb-8">
          <Subtitle
            tone="light"
            size="xs"
            line="both"
            align="center"
            textClasses="text-white!"
          >
            Evolution of Existence
          </Subtitle>
        </motion.div>

        <motion.h1
          style={titleMotion}
          className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-tight text-[#EAEAEA] mix-blend-overlay"
        >
          Doug
          <br />
          <span className="text-[#C6A665] italic mix-blend-normal">
            Collins
          </span>
        </motion.h1>

        <motion.p
          style={copyMotion}
          className="mt-8 max-w-xl text-white/60 text-sm sm:text-base md:text-lg leading-relaxed font-light"
        >
          The future is more than
          <span className="text-white/90"> technology</span>, it is the
          <span className="text-white/90"> evolution </span>
          of who we are.
        </motion.p>

        <motion.div
          style={ctaMotion}
          className="mt-12 flex flex-col sm:flex-row items-center gap-5"
        >
          <Button href="/books" variant="fill" size="lg">
            Start Reading
          </Button>
          <Button href="/about" variant="outline" size="lg">
            About The Author
          </Button>
        </motion.div>

        <motion.div
          style={hintMotion}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="h-10 w-px bg-linear-to-b from-white to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
