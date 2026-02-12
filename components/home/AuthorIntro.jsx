"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function AuthorIntro() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });
  const portraitRotateX = useTransform(springY, [-300, 300], [4, -4]);
  const portraitRotateY = useTransform(springX, [-300, 300], [-4, 4]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <Section tone="cream" spacing="lg" grain animate={false}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="absolute -top-40 -right-40 w-125 h-125 rounded-full bg-primary-200/20 blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute -bottom-40 -left-40 w-100 h-100 rounded-full bg-secondary-200/10 blur-[100px]"
        />
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative z-10 grid lg:grid-cols-[30%_auto] gap-12 lg:gap-20 items-center"
      >
        <BlurReveal preset="slide-left" delay={0}>
          <div className="relative max-w-sm mx-auto lg:mx-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-6 rounded-full border border-dashed border-primary-300/20 pointer-events-none"
            />

            <motion.div
              style={{ rotateX: portraitRotateX, rotateY: portraitRotateY }}
              className="relative aspect-3/4 rounded-3xl overflow-hidden shadow-2xl shadow-charcoal/10"
            >
              <div className="absolute inset-0 bg-linear-to-br from-charcoal via-slate to-charcoal" />
              <div className="absolute inset-0 bg-linear-to-t from-primary-500/20 via-transparent to-secondary-500/10" />

              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
                  backgroundSize: "24px 24px",
                }}
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    delay: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-center"
                >
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-primary-500/10 backdrop-blur-sm flex items-center justify-center border border-primary-400/20 animate-pulse-glow">
                      <span className="text-primary-300 text-6xl font-display font-bold select-none">
                        D
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0"
                    >
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary-400 shadow-lg shadow-primary-400/50" />
                    </motion.div>
                  </div>
                  <p className="text-white/30 text-[11px] uppercase tracking-[0.3em] mt-5 font-medium">
                    Author Portrait
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="absolute inset-4 border border-primary-300/15 rounded-2xl pointer-events-none"
              />

              <div className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2 border-primary-400/30 rounded-tl-lg" />
              <div className="absolute bottom-5 right-5 w-8 h-8 border-b-2 border-r-2 border-primary-400/30 rounded-br-lg" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 1.3,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="absolute -bottom-5 -left-5 w-24 h-24 rounded-2xl bg-primary-500 shadow-xl shadow-primary-500/30 flex flex-col items-center justify-center text-ink"
            >
              <span className="text-2xl font-display font-bold leading-none">
                10+
              </span>
              <span className="text-[9px] uppercase tracking-[0.15em] font-semibold mt-1 opacity-80">
                Years
              </span>
            </motion.div>
          </div>
        </BlurReveal>

        <div className="space-y-10">
          <div className="space-y-6">
            <BlurReveal delay={0}>
              <Subtitle tone="cream" line>
                About the Author
              </Subtitle>
            </BlurReveal>

            <BlurReveal delay={1}>
              <Title size="xl" tone="cream">
                Author
                <Title.Gradient underline> Spotlight</Title.Gradient>
              </Title>
            </BlurReveal>

            <BlurReveal delay={2} className="space-y-4">
              <p className="text-slate text-lg leading-[1.85] first-letter:text-4xl first-letter:font-display first-letter:font-bold first-letter:text-primary-600 first-letter:float-left first-letter:mr-px first-letter:leading-[0.85]">
                Doug Collins is a visionary author whose work seamlessly weaves
                together the worlds of science, philosophy, and human
                exploration. With a deep understanding of complex concepts like
                zero, infinity, and the architecture of reality, Collins
                challenges readers to move beyond conventional thought and
                discover the profound connections that define our existence.
              </p>
              <p className="text-ash text-base leading-[1.85]">
                Collins extensive research into subjects like quantum mechanics,
                encryption, and human behavior informs his thrilling narratives,
                making abstract topics engaging and accessible. Collins’
                stories, such as those in Decryption Gambit and Quantum
                Ascendancy, confront modern-day dilemmas, the ethical
                implications of technological advancements, and the balance
                between control and freedom. His ability to blend intense
                adventure with intellectual exploration positions him as a
                unique voice in speculative fiction.
              </p>
            </BlurReveal>

            <BlurReveal delay={3}>
              <p className="font-display text-2xl text-charcoal/60 italic">
                — Doug Collins
              </p>
            </BlurReveal>

            <BlurReveal delay={3.5} className="flex flex-wrap gap-3 pt-2">
              <Button href="/about" variant="outline-light" size="md">
                Full Biography <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button href="/books" variant="ghost-light" size="md">
                Explore Books
              </Button>
            </BlurReveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
