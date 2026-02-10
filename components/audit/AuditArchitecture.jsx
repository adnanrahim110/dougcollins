"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { motion } from "framer-motion";
import { Blocks, Eye, Layers, Lock, Network, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Layers,
    title: "Foundational Architecture",
    desc: "A strategic framework that guides cybersecurity from the ground up — replacing reactive patching with proactive systemic design.",
  },
  {
    icon: Network,
    title: "Paradigm Shift",
    desc: "Moving from trailing the dark side to occupying the driver's seat. A fundamental change in how we approach security posture.",
  },
  {
    icon: ShieldCheck,
    title: "Proactive Defense",
    desc: "Rather than reacting to threats, the architecture anticipates attack vectors and neutralizes them at the structural level.",
  },
  {
    icon: Lock,
    title: "Resilient by Design",
    desc: "Systems built with security as a core principle — not bolted on afterwards. Defense that doesn't crumble under emerging threats.",
  },
  {
    icon: Eye,
    title: "Human-Centered Security",
    desc: "Addressing the largest attack surface — human behavior — through architectural solutions rather than endless training cycles.",
  },
  {
    icon: Blocks,
    title: "Future-Proof Framework",
    desc: "An architecture designed to absorb and leverage advances like AI and Quantum Computing, rather than being overwhelmed by them.",
  },
];

export default function AuditArchitecture() {
  return (
    <section className="relative bg-ink overflow-hidden">
      <div className="grain absolute inset-0 pointer-events-none" />

      <div className="absolute top-1/4 right-1/3 w-125 h-125 rounded-full bg-primary-500/4 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-87.5 h-87.5 rounded-full bg-accent-500/3 blur-[140px] pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none opacity-[0.015]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(228,147,37,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(228,147,37,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 py-24 md:py-32 lg:py-40 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <BlurReveal>
            <Subtitle
              tone="light"
              size="sm"
              align="center"
              line="both"
              lineWidth={36}
            >
              The Solution
            </Subtitle>
          </BlurReveal>
          <BlurReveal delay={1}>
            <Title
              as="h2"
              size="xl"
              tone="light"
              align="center"
              className="mt-5"
            >
              The New <Title.Gradient>Architecture</Title.Gradient>
            </Title>
          </BlurReveal>
          <BlurReveal delay={2}>
            <p className="mt-5 text-white/40 text-base leading-relaxed">
              Doug&apos;s book lays out a founding architecture that will
              ultimately turn our current situation around — placing us in the
              driver&apos;s seat rather than being reactionary to the dark side.
            </p>
          </BlurReveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative p-7 rounded-2xl bg-white/2 border border-white/5 hover:border-primary-500/20 hover:bg-white/4 transition-all duration-500"
            >
              <div className="w-11 h-11 rounded-xl bg-primary-500/8 group-hover:bg-primary-500 flex items-center justify-center mb-5 transition-all duration-300">
                <pillar.icon className="w-5 h-5 text-primary-400 group-hover:text-ink transition-colors duration-300" />
              </div>

              <h3 className="font-display text-base font-bold text-paper mb-2.5 group-hover:text-primary-400 transition-colors duration-300">
                {pillar.title}
              </h3>
              <p className="text-white/35 text-sm leading-relaxed">
                {pillar.desc}
              </p>

              <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden rounded-tr-2xl">
                <div className="absolute top-2 right-2 w-6 h-px bg-primary-500/10" />
                <div className="absolute top-2 right-2 w-px h-6 bg-primary-500/10" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 h-px bg-linear-to-r from-transparent via-primary-500/20 to-transparent origin-center max-w-xl mx-auto"
        />
      </div>
    </section>
  );
}
