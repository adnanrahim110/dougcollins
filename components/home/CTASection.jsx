"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Section from "@/components/ui/Section";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { useState } from "react";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <Section tone="dark" spacing="lg" grain>
      <div className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-8">
            <BlurReveal delay={0}>
              <Subtitle tone="light" line lineWidth={36}>
                Newsletter
              </Subtitle>
            </BlurReveal>

            <BlurReveal delay={1}>
              <Title size="xl" tone="light">
                Stay in the <Title.Gradient underline>Loop</Title.Gradient>
              </Title>
            </BlurReveal>

            <BlurReveal delay={2}>
              <p className="text-fog/60 text-base md:text-lg leading-[1.8] max-w-md">
                Join Doug Collins’ Inner Circle for early access, hidden
                chapters, and a glimpse into the infinite.
              </p>
            </BlurReveal>
          </div>

          <BlurReveal preset="slide-right" delay={2}>
            <div className="relative">
              <div className="relative rounded-3xl bg-linear-to-br from-white/4 to-white/1 border border-white/6 p-8 sm:p-10 backdrop-blur-sm">
                <div className="absolute -top-px left-8 right-8 h-px bg-linear-to-r from-transparent via-primary-400/30 to-transparent" />

                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
                    <Mail className="w-4 h-4 text-ink" />
                  </div>
                  <div>
                    <p className="text-paper text-sm font-semibold">
                      Join the Inner Circle
                    </p>
                    <p className="text-fog/30 text-[11px]">
                      No spam. Unsubscribe anytime.
                    </p>
                  </div>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto">
                      <Sparkles className="w-6 h-6 text-primary-400" />
                    </div>
                    <p className="font-display text-xl text-paper font-bold">
                      You&apos;re in!
                    </p>
                    <p className="text-fog/40 text-sm">
                      Welcome to the inner circle. Check your inbox.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="your@email.com"
                      tone="dark"
                      size="lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button
                      variant="fill"
                      size="lg"
                      type="submit"
                      className="w-full"
                    >
                      Subscribe
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <p className="text-center text-fog/20 text-[10px] tracking-wide">
                      By subscribing you agree to receive occasional emails.
                    </p>
                  </form>
                )}
              </div>

              <div className="absolute -z-10 inset-4 rounded-3xl bg-primary-500/4 blur-2xl" />
            </div>
          </BlurReveal>
        </div>
      </div>
    </Section>
  );
}
