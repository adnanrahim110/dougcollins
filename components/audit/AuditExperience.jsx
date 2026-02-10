"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { motion } from "framer-motion";
import { Building2, Factory, Landmark, Shield, Zap } from "lucide-react";

const sectors = [
  {
    icon: Landmark,
    label: "Financial",
    desc: "Banking, investment, and regulatory compliance audits across major financial institutions.",
  },
  {
    icon: Shield,
    label: "Insurance",
    desc: "Risk assessment frameworks and cybersecurity posture evaluations for insurance enterprises.",
  },
  {
    icon: Zap,
    label: "Utility",
    desc: "Critical infrastructure security — power grids, water systems, and SCADA environments.",
  },
  {
    icon: Factory,
    label: "Manufacturing",
    desc: "OT/IT convergence security, supply chain risk, and industrial control system audits.",
  },
];

const milestones = [
  { year: "1990s", label: "Career begins in IT auditing" },
  { year: "2000s", label: "Cross-sector cybersecurity expertise" },
  { year: "2010s", label: "Leadership in emerging threat domains" },
  { year: "2020s", label: "Book & new architecture paradigm" },
];

export default function AuditExperience() {
  return (
    <section className="relative bg-parchment overflow-hidden">
      <div className="absolute bottom-0 right-0 w-100 h-100 rounded-full bg-primary-500/3 blur-[120px] pointer-events-none" />

      <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 py-24 md:py-32 lg:py-40 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <BlurReveal>
              <Subtitle tone="cream" line lineWidth={36}>
                Experience
              </Subtitle>
            </BlurReveal>
            <BlurReveal delay={1}>
              <Title as="h2" size="lg" tone="cream" className="mt-5">
                35+ Years Across <Title.Gradient>Industries</Title.Gradient>
              </Title>
            </BlurReveal>
            <BlurReveal delay={2}>
              <p className="mt-5 text-smoke text-base leading-relaxed max-w-md mb-10">
                Inspecting cybersecurity as an auditor across departments within
                organizations across multiple sectors — building an unparalleled
                wealth of knowledge.
              </p>
            </BlurReveal>

            <div className="grid sm:grid-cols-2 gap-4">
              {sectors.map((sector, i) => (
                <motion.div
                  key={sector.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group p-6 rounded-2xl bg-paper border border-charcoal/4 hover:border-primary-500/15 hover:shadow-lg hover:shadow-charcoal/2 transition-all duration-500"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-50 group-hover:bg-primary-500 flex items-center justify-center mb-4 transition-all duration-300">
                    <sector.icon className="w-5 h-5 text-primary-500 group-hover:text-paper transition-colors duration-300" />
                  </div>
                  <h3 className="font-display text-base font-bold text-charcoal mb-1.5">
                    {sector.label}
                  </h3>
                  <p className="text-smoke text-xs leading-relaxed">
                    {sector.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <BlurReveal delay={1}>
              <div className="relative rounded-2xl overflow-hidden bg-charcoal border border-white/6 mb-10 aspect-video">
                <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-slate via-charcoal to-ink">
                  <div className="text-center">
                    <Building2
                      className="w-10 h-10 text-primary-400/30 mx-auto mb-3"
                      strokeWidth={1}
                    />
                    <p className="text-white/20 text-[10px] uppercase tracking-[0.3em]">
                      Enterprise Security
                    </p>
                    <p className="text-white/10 text-[9px] uppercase tracking-wider mt-1">
                      Audit Operations
                    </p>
                  </div>
                </div>

                <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-primary-400/15 rounded-tl-md" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-primary-400/15 rounded-br-md" />
              </div>
            </BlurReveal>

            <div className="relative pl-8">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-0 w-px bg-linear-to-b from-primary-500 via-primary-400/50 to-primary-500/10"
              />

              <div className="space-y-7">
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative"
                  >
                    <div className="absolute -left-8 top-1 w-2.5 h-2.5 rounded-full bg-primary-500 border-2 border-parchment" />

                    <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-primary-500 font-bold mb-1">
                      {m.year}
                    </span>
                    <p className="text-charcoal text-sm font-medium">
                      {m.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
