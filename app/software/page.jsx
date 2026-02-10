"use client";

import Button from "@/components/ui/Button";
import ContactForm from "@/components/ui/ContactForm";
import Section from "@/components/ui/Section";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code,
  Cpu,
  Database,
  GitBranch,
  Globe,
  Layers,
  Smartphone,
  Zap,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 },
  }),
};

const capabilities = [
  {
    icon: Globe,
    title: "Full-Stack Web",
    desc: "React, Next.js, Node.js, and modern web architectures that scale.",
  },
  {
    icon: Cpu,
    title: "AI & Machine Learning",
    desc: "Building intelligent systems that augment human decision-making.",
  },
  {
    icon: Database,
    title: "Data Engineering",
    desc: "Scalable data pipelines, real-time analytics, and database architecture.",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    desc: "Cross-platform applications built with React Native and native toolkits.",
  },
  {
    icon: Layers,
    title: "Systems Architecture",
    desc: "Microservices, event-driven design, and distributed systems at scale.",
  },
  {
    icon: GitBranch,
    title: "DevOps & Cloud",
    desc: "CI/CD pipelines, infrastructure as code, and cloud-native deployments.",
  },
];

const stack = {
  Languages: ["TypeScript", "Python", "Rust", "Go", "C++"],
  Frontend: ["React", "Next.js", "Three.js", "Tailwind CSS"],
  Backend: ["Node.js", "FastAPI", "GraphQL", "gRPC"],
  Cloud: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform"],
  Data: ["PostgreSQL", "Redis", "Elasticsearch", "Apache Kafka"],
};

const projects = [
  {
    title: "Quantum-Safe Encryption Library",
    desc: "Post-quantum cryptographic primitives for next-generation security applications.",
    tags: ["Rust", "Cryptography", "Open Source"],
  },
  {
    title: "Real-Time Threat Intelligence Platform",
    desc: "ML-powered threat detection and visualization system processing 10M+ events/day.",
    tags: ["Python", "Kafka", "React"],
  },
  {
    title: "Distributed Identity Framework",
    desc: "Zero-knowledge proof-based identity verification for decentralized applications.",
    tags: ["Go", "ZKP", "Blockchain"],
  },
];

export default function SoftwarePage() {
  return (
    <>
      <section
        data-tone="dark"
        className="relative bg-ink pt-36 pb-24 md:pt-44 md:pb-32 lg:pt-48 lg:pb-40 overflow-hidden"
      >
        <div className="grain absolute inset-0 pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-125 h-125 rounded-full bg-secondary-500/6 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/3 w-100 h-100 rounded-full bg-primary-500/5 blur-[120px]" />

        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl">
            <motion.div
              variants={fadeUp}
              custom={0}
              className="w-16 h-16 rounded-2xl bg-secondary-500/10 flex items-center justify-center mb-8"
            >
              <Code className="w-8 h-8 text-secondary-400" />
            </motion.div>

            <motion.p
              variants={fadeUp}
              custom={0.5}
              className="text-secondary-400 font-medium tracking-[0.3em] uppercase text-xs mb-4"
            >
              Software Engineering
            </motion.p>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-paper leading-tight mb-6"
            >
              Building the
              <br />
              <span className="text-gradient">Impossible</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-fog text-lg md:text-xl leading-relaxed mb-8 max-w-2xl"
            >
              From distributed systems to AI applications, I engineer software
              that pushes boundaries—the same way my fiction pushes the
              boundaries of imagination.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-wrap gap-3"
            >
              <Button href="/contact" variant="fill-secondary" size="lg">
                Work With Me <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                href="/audit-findings-on-cybersecurity"
                variant="outline-light"
                size="lg"
              >
                Security Services
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Section tone="light" spacing="lg">
        <div className="text-center mb-14">
          <p className="text-primary-500 font-medium tracking-[0.2em] uppercase text-xs mb-3">
            What I Build
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Engineering Capabilities
          </h2>
          <p className="text-smoke text-lg max-w-2xl mx-auto">
            End-to-end engineering across the full technology stack.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="card-paper p-8 group"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary-50 group-hover:bg-secondary-500 flex items-center justify-center mb-5 transition-colors duration-300">
                <cap.icon className="w-5 h-5 text-secondary-500 group-hover:text-paper transition-colors duration-300" />
              </div>
              <h3 className="font-display text-lg font-bold text-charcoal mb-2">
                {cap.title}
              </h3>
              <p className="text-smoke text-sm leading-relaxed">{cap.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section tone="cream" spacing="lg">
        <div className="text-center mb-14">
          <p className="text-primary-500 font-medium tracking-[0.2em] uppercase text-xs mb-3">
            Technology
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal">
            Tech Stack
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {Object.entries(stack).map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <h3 className="font-display font-bold text-charcoal mb-3 text-sm uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="text-smoke text-sm flex items-center gap-2"
                  >
                    <Zap className="w-3 h-3 text-primary-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section tone="dark" spacing="lg" grain>
        <div className="text-center mb-14">
          <p className="text-primary-400 font-medium tracking-[0.2em] uppercase text-xs mb-3">
            Portfolio
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-paper">
            Featured Projects
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="card-glass p-8"
            >
              <h3 className="font-display text-lg font-bold text-paper mb-3">
                {project.title}
              </h3>
              <p className="text-fog text-sm leading-relaxed mb-5">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-dark text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section tone="light" spacing="md">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-6">
            Code as Craft
          </h2>
          <p className="text-smoke text-lg leading-relaxed mb-4">
            I approach software engineering the way I approach writing: with
            obsessive attention to structure, elegance, and the user&apos;s
            experience. Every line of code tells a story, every architecture has
            a narrative arc, and every deployment is a published work.
          </p>
          <p className="text-smoke text-lg leading-relaxed">
            Whether you need a prototype in days or a production system that
            serves millions, I bring the same commitment to excellence.
          </p>
        </div>
      </Section>

      <Section tone="charcoal" spacing="md">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-paper mb-4">
            Let&apos;s Build Something
          </h2>
          <p className="text-fog text-lg mb-8">
            Have an idea that needs engineering? Let&apos;s turn it into
            reality.
          </p>
          <Button href="/contact" variant="fill-secondary" size="lg">
            Start a Project <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Section>

      <Section tone="cream" spacing="md">
        <ContactForm tone="light" />
      </Section>
    </>
  );
}
