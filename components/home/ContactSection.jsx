"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Section from "@/components/ui/Section";
import Subtitle from "@/components/ui/Subtitle";
import Textarea from "@/components/ui/Textarea";
import Title from "@/components/ui/Title";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe, Mail, MapPin, Send } from "lucide-react";

export default function ContactSection() {
  return (
    <Section tone="cream" spacing="lg" grain>
      <div className="relative z-10">
        <div className="text-center mb-16 space-y-4">
          <BlurReveal delay={0}>
            <Subtitle tone="cream" align="center" line="both" lineWidth={40}>
              Get in Touch
            </Subtitle>
          </BlurReveal>

          <BlurReveal delay={1}>
            <Title size="xl" tone="cream" align="center">
              Let&apos;s Start a{" "}
              <Title.Gradient variant="primary" underline>
                Conversation
              </Title.Gradient>
            </Title>
          </BlurReveal>

          <BlurReveal delay={2}>
            <p className="text-ash text-base leading-[1.8] max-w-lg mx-auto">
              Interested in rights, speaking engagements, collaborations, or
              just want to share your thoughts on the books?
            </p>
          </BlurReveal>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16">
          <BlurReveal preset="slide-left" delay={2}>
            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "contact@dougcollins.com",
                  href: "mailto:contact@dougcollins.com",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Undisclosed",
                },
                {
                  icon: Globe,
                  label: "Availability",
                  value: "Open for inquiries",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-charcoal/4 hover:border-primary-300/30 hover:shadow-lg hover:shadow-primary-100/20 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-200/30 flex items-center justify-center group-hover:bg-primary-500 group-hover:border-primary-500 transition-all duration-400">
                    <item.icon
                      className="w-5 h-5 text-primary-600 group-hover:text-white transition-colors duration-400"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-smoke font-semibold mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-charcoal text-sm font-medium">
                      {item.value}
                    </p>
                  </div>
                  {item.href && (
                    <ArrowUpRight className="w-4 h-4 text-charcoal/20 group-hover:text-primary-500 transition-colors duration-400" />
                  )}
                </div>
              ))}

              <div className="p-5 rounded-2xl bg-linear-to-br from-primary-50 to-primary-100/50 border border-primary-200/30">
                <p className="font-display text-sm font-bold text-charcoal mb-1">
                  Response Time
                </p>
                <p className="text-smoke text-[12px] leading-relaxed">
                  I typically respond within 24–48 hours. For urgent matters,
                  please mark your subject accordingly.
                </p>
              </div>
            </div>
          </BlurReveal>

          <BlurReveal preset="slide-right" delay={3}>
            <motion.form
              onSubmit={(e) => e.preventDefault()}
              className="relative rounded-3xl bg-white border border-charcoal/4 p-8 sm:p-10 shadow-sm"
            >
              <div className="absolute -top-px left-10 right-10 h-px bg-linear-to-r from-transparent via-primary-400/20 to-transparent" />

              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    label="Name"
                    type="text"
                    placeholder="Your name"
                    tone="light"
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    tone="light"
                    required
                  />
                </div>

                <Input
                  label="Subject"
                  type="text"
                  placeholder="What's this about?"
                  tone="light"
                />

                <Textarea
                  label="Message"
                  rows={5}
                  placeholder="Your message..."
                  tone="light"
                  required
                />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                  <p className="text-[10px] text-smoke tracking-wide">
                    All fields marked are required.
                  </p>
                  <Button type="submit" variant="fill" size="lg">
                    <Send className="w-3.5 h-3.5" />
                    Send Message
                  </Button>
                </div>
              </div>
            </motion.form>
          </BlurReveal>
        </div>
      </div>
    </Section>
  );
}
