"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { motion } from "framer-motion";
import {
  Blocks,
  Clock,
  Eye,
  Layers,
  Lock,
  Network,
  ShieldCheck,
} from "lucide-react";

const pillars = [
  {
    icon: Eye,
    title: "Identity Management",
    desc: "Are your identities isolated and protected?\n☐ Yes, identities are isolated and ephemeral.\n☐ No, identities are exposed across systems.",
  },
  {
    icon: Lock,
    title: "Data Security",
    desc: "Is your data fragmented and meaningless to unauthorized users?\n☐ Yes, we use data fragmentation and encryption to minimize exposure.\n☐ No, data is stored persistently in centralized systems.",
  },
  {
    icon: Clock,
    title: "Access Control",
    desc: "Do your users have time-limited access to systems?\n☐ Yes, access is temporary and regularly reviewed.\n☐ No, access is persistent without expiration.",
  },
  {
    icon: Network,
    title: "Trust Management",
    desc: "Is trust limited to specific, necessary areas?\n☐ Yes, trust is granted in a limited, granular way.\n☐ No, trust is broad and persistent across systems.",
  },
  {
    icon: Layers,
    title: "System State",
    desc: "Are states ephemeral and constantly refreshed?\n☐ Yes, system states are temporary and reset regularly.\n☐ No, we rely on persistent states for continuity.",
  },
  {
    icon: ShieldCheck,
    title: "Failure Containment",
    desc: "Is your system designed to contain failures locally?\n☐ Yes, failures are isolated to prevent cascading issues.\n☐ No, a failure can spread throughout the system.",
  },
  {
    icon: Blocks,
    title: "Human Dependency",
    desc: "Do you rely on automated systems for security instead of human action?\n☐ Yes, security functions are automated and do not depend on human behavior.\n☐ No, security is largely human-dependent.",
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
              THE TAKEAWAY
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
              Traditional cybersecurity isn’t enough anymore. We need a
              structural revolution, secure systems from the ground up. Let’s
              rethink the foundations and make security part of the
              architecture.
            </p>
          </BlurReveal>

          <div className="mt-10">
            <BlurReveal delay={3}>
              <h3 className="font-display text-2xl md:text-[1.75rem] font-bold text-paper leading-snug">
                Cybersecurity Architecture Check-up: Are You Ready for a Change?
              </h3>
            </BlurReveal>
            <BlurReveal delay={4}>
              <p className="mt-4 text-white/40 text-base leading-relaxed">
                Answer these quick questions to see if your system is up to date
                with modern cybersecurity standards:
              </p>
            </BlurReveal>
          </div>
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
              <p className="text-white/35 text-sm leading-relaxed whitespace-pre-line">
                {pillar.desc}
              </p>

              <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden rounded-tr-2xl">
                <div className="absolute top-2 right-2 w-6 h-px bg-primary-500/10" />
                <div className="absolute top-2 right-2 w-px h-6 bg-primary-500/10" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto mt-16">
          <BlurReveal delay={0.5}>
            <h3 className="font-display text-2xl md:text-[1.75rem] font-bold text-paper leading-snug">
              How did you score?
            </h3>
          </BlurReveal>
          <BlurReveal delay={1.25}>
            <p className="mt-4 text-white/40 text-base leading-relaxed">
              If you checked more boxes in the No column, it’s time to rethink
              your cybersecurity architecture. A structural redesign could
              transform your system’s resilience and security. Let’s build a
              system that’s inherently secure from the ground up.
            </p>
          </BlurReveal>
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
