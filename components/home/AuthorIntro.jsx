"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
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
          <Image
            src="/imgs/author.png"
            width={720}
            height={1080}
            alt="Author - Doug Collins"
            className="w-full h-auto rounded-2xl"
          />
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
                Author <Title.Gradient underline> Spotlight</Title.Gradient>
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
