"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Button from "@/components/ui/Button";
import Subtitle from "@/components/ui/Subtitle";
import dynamic from "next/dynamic";

const MainScene = dynamic(
  () => import("@/components/three/MainScene").then((m) => m.MainScene),
  { ssr: false },
);

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#050505] text-white selection:bg-[#C6A665] selection:text-black">
      <MainScene className="opacity-100" />

      <div className="absolute inset-0 z-1 bg-linear-to-b from-[#050505]/80 via-transparent to-[#050505] pointer-events-none" />

      <div className="relative z-10 h-full max-w-350 mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-center items-center text-center">
        <BlurReveal
          delay={0.2}
          preset="fade"
          trigger="mount"
          distance={40}
          stagger={1}
          className="mb-8"
        >
          <Subtitle tone="light" size="xs" line="both" align="center">
            The Future is Architected
          </Subtitle>
        </BlurReveal>

        <BlurReveal
          delay={0.4}
          preset="fade"
          trigger="mount"
          distance={40}
          stagger={1}
          as="h1"
          className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-tight text-[#EAEAEA] mix-blend-overlay"
        >
          Dough
          <br />
          <span className="text-[#C6A665] italic mix-blend-normal">
            Collins
          </span>
        </BlurReveal>

        <BlurReveal
          delay={0.6}
          preset="fade"
          trigger="mount"
          distance={40}
          stagger={1}
          as="p"
          className="mt-8 max-w-lg text-white/60 text-sm sm:text-base md:text-lg leading-relaxed font-light"
        >
          Speculative fiction exploring the convergence of
          <span className="text-white/90"> technology</span>,
          <span className="text-white/90"> consciousness</span>, and the
          <span className="text-white/90"> human spirit</span>.
        </BlurReveal>

        <BlurReveal
          delay={0.8}
          preset="fade"
          trigger="mount"
          distance={40}
          stagger={1}
          className="mt-12 flex flex-col sm:flex-row items-center gap-5"
        >
          <Button href="/books" variant="fill" size="lg">
            Start Reading
          </Button>
          <Button href="/about" variant="outline" size="lg">
            About The Author
          </Button>
        </BlurReveal>

        <BlurReveal
          delay={1.4}
          preset="fade"
          trigger="mount"
          distance={40}
          stagger={1}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="h-10 w-px bg-linear-to-b from-white to-transparent" />
        </BlurReveal>
      </div>
    </section>
  );
}
