"use client";

import Input from "@/components/ui/Input";
import {
  ArrowRight,
  BookOpen,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import Link from "next/link";

const navCols = [
  {
    title: "Explore",
    links: [
      { label: "Books", href: "/books" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Cybersecurity", href: "/audit-findings-on-cybersecurity" },
      { label: "Software Store", href: "/software-store" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const socials = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
];

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      <div className="relative bg-primary-500">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,0,0,0.08),transparent_60%)] pointer-events-none" />
        <div className="max-w-350 mx-auto px-6 sm:px-8 lg:px-12 py-8 lg:py-10 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-ink/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-ink" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-ink font-display text-lg font-bold tracking-tight">
                  Join the Inner Circle
                </h3>
                <p className="text-ink/60 text-sm">
                  Early access, exclusives & behind the scenes.
                </p>
              </div>
            </div>
            <form
              className="flex gap-2 w-full md:w-auto items-end"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="your@email.com"
                tone="primary"
                size="md"
                className="md:w-64"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-ink text-primary-400 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-charcoal transition-colors duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="relative bg-charcoal">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -bottom-40 left-1/4 w-125 h-75 rounded-full bg-primary-500/3 blur-[150px]" />
        </div>

        <div className="max-w-350 mx-auto px-6 sm:px-8 lg:px-12 py-14 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-0">
            <div className="lg:pr-14 space-y-6">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-ink" strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-display font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
                  Doug Collins
                </h2>
              </Link>
              <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                With every story, Collins explores the delicate balance between
                knowledge, freedom, and the consequences of our actions.
              </p>
              <div className="flex gap-3 pt-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/8 text-white/50 hover:bg-primary-500 hover:border-primary-500 hover:text-ink transition-all duration-300"
                  >
                    <s.icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex flex-col items-center py-2">
              <div className="w-px h-full bg-linear-to-b from-primary-400/0 via-primary-400/30 to-primary-400/0" />
            </div>

            <div className="lg:pl-14 flex flex-wrap gap-12 sm:gap-16">
              {navCols.map((col) => (
                <div key={col.title}>
                  <h3 className="text-primary-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                    {col.title}
                  </h3>
                  <ul className="space-y-4">
                    {col.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="group flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-300"
                        >
                          <ArrowRight className="w-3.5 h-3.5 text-primary-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                          <span>{l.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-ink">
        <div className="max-w-350 mx-auto px-6 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/40 tracking-wide">
            &copy; {new Date().getFullYear()} Doug Collins. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-xs text-white/40 hover:text-white/70 transition-colors duration-300"
            >
              Privacy
            </Link>
            <span className="text-white/20">&middot;</span>
            <Link
              href="/terms"
              className="text-xs text-white/40 hover:text-white/70 transition-colors duration-300"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
