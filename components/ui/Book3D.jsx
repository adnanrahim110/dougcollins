"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";

export default function Book3D({
  title,
  image,
  backImage,
  className,
  widthClassName = "w-64 sm:w-72",
  thickness = 24,
  sizes = "(max-width: 640px) 256px, 288px",
  aspectRatio,
}) {
  const bookRef = useRef(null);
  const halfDepth = thickness / 2;
  const [measuredAspect, setMeasuredAspect] = useState(null);

  const resolvedAspect = useMemo(() => {
    // Default matches most covers in /public/books, but we override once measured
    // so the face matches the actual image ratio (no cropping).
    return aspectRatio ?? measuredAspect ?? 2 / 3;
  }, [aspectRatio, measuredAspect]);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springCfg = { stiffness: 120, damping: 25, mass: 0.5 };
  const sX = useSpring(rawX, springCfg);
  const sY = useSpring(rawY, springCfg);

  const rotateY = useTransform(sX, [-0.5, 0.5], [-30, 6]);
  const rotateX = useTransform(sY, [-0.5, 0.5], [12, -12]);

  const glareX = useTransform(sX, [-0.5, 0.5], [72, 28]);
  const glareY = useTransform(sY, [-0.5, 0.5], [68, 32]);
  const glareOpacity = useTransform(
    sX,
    [-0.5, -0.2, 0, 0.2, 0.5],
    [0, 0.1, 0.08, 0.1, 0],
  );

  const shadowX = useTransform(sX, [-0.5, 0.5], [18, -16]);
  const shadowY = useTransform(sY, [-0.5, 0.5], [-8, 18]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!bookRef.current) return;
      const rect = bookRef.current.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [rawX, rawY],
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <div
      ref={bookRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative", className)}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          aspectRatio: resolvedAspect,
        }}
        className={cn("relative cursor-pointer", widthClassName)}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute inset-0 overflow-hidden border border-white/10"
            style={{
              transform: `translateZ(${halfDepth}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            {image ? (
              <>
                <Image
                  src={image}
                  alt={`${title} front cover`}
                  fill
                  className="object-contain"
                  sizes={sizes}
                  onLoadingComplete={(img) => {
                    if (aspectRatio) return;
                    if (measuredAspect) return;
                    const w = img?.naturalWidth ?? 0;
                    const h = img?.naturalHeight ?? 0;
                    if (w > 0 && h > 0) setMeasuredAspect(w / h);
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-br from-black/25 via-black/10 to-black/35" />
              </>
            ) : (
              <div className="absolute inset-0 bg-linear-to-br from-[#12101a] via-[#1c1930] to-[#0f0d15]" />
            )}

            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 0.5px, transparent 0)",
                backgroundSize: "16px 16px",
              }}
            />

            {!image && (
              <div className="absolute inset-0 flex items-center justify-center px-8">
                <span className="text-paper/75 text-center font-display text-xl leading-tight">
                  {title}
                </span>
              </div>
            )}
          </div>

          <div
            className="absolute inset-0  overflow-hidden border border-white/8"
            style={{
              transform: `rotateY(180deg) translateZ(${halfDepth}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            {backImage ? (
              <Image
                src={backImage}
                alt={`${title} back cover`}
                fill
                className="object-contain"
                sizes={sizes}
                onLoadingComplete={(img) => {
                  if (aspectRatio) return;
                  if (measuredAspect) return;
                  const w = img?.naturalWidth ?? 0;
                  const h = img?.naturalHeight ?? 0;
                  if (w > 0 && h > 0) setMeasuredAspect(w / h);
                }}
              />
            ) : (
              <div className="absolute inset-0 bg-linear-to-br from-[#171522] via-[#221d33] to-[#151225]" />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/10" />
            <div className="absolute inset-4 rounded-lg border border-white/10" />
          </div>

          <div
            className="absolute top-[1%] bottom-[1%] left-0 rounded-l-sm overflow-hidden"
            style={{
              width: `${thickness}px`,
              transform: "translateX(-50%) rotateY(-90deg)",
              background:
                "linear-gradient(to right, #171320 0%, #241f33 52%, #14111e 100%)",
              boxShadow: "inset -1px 0 8px rgba(0,0,0,0.45)",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-b from-white/8 via-transparent to-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-primary-300/55 text-[7px] font-display font-bold uppercase tracking-[0.2em] whitespace-nowrap"
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              >
                {title}
              </span>
            </div>
          </div>

          <div
            className="absolute top-px bottom-px right-px"
            style={{
              width: `${thickness}px`,
              transform: "translateX(50%) rotateY(90deg)",
              background:
                "repeating-linear-gradient(to right, #d4d0c8 0px, #f5f2ed 1px, #e8e5de 2px, #d4d0c8 3px)",
              boxShadow: "inset -2px 0 7px rgba(0,0,0,0.2)",
            }}
          />

          <div
            className="absolute top-px left-px right-px"
            style={{
              height: `${thickness}px`,
              transform: "translateY(-50%) rotateX(90deg)",
              background:
                "repeating-linear-gradient(to right, #d4d0c8 0px, #f5f2ed 1px, #e8e5de 2px, #d4d0c8 3px)",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.12)",
            }}
          />

          <div
            className="absolute bottom-px left-px right-px"
            style={{
              height: `${thickness}px`,
              transform: "translateY(50%) rotateX(-90deg)",
              background:
                "repeating-linear-gradient(to right, #d4d0c8 0px, #f5f2ed 1px, #e8e5de 2px, #d4d0c8 3px)",
              boxShadow: "inset 0 -1px 3px rgba(0,0,0,0.1)",
            }}
          />
        </div>

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translateZ(${halfDepth + 1}px)`,
            background: useTransform(
              [glareX, glareY],
              ([x, y]) =>
                `radial-gradient(ellipse at ${x}% ${y}%, rgba(255,255,255,0.16) 0%, transparent 62%)`,
            ),
            opacity: glareOpacity,
          }}
        />

        <motion.div
          className="absolute -z-10 inset-x-4 -bottom-4 h-12 rounded-[50%] blur-xl pointer-events-none"
          style={{
            x: shadowX,
            y: shadowY,
            background:
              "radial-gradient(ellipse, rgba(228,147,37,0.14) 0%, transparent 70%)",
          }}
        />
      </motion.div>
    </div>
  );
}
