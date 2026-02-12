"use client";

import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";

export const ContactForm = ({ tone = "dark" }) => {
  const isDark = tone === "dark" || tone === "charcoal";
  const inputTone = isDark ? "dark" : "light";

  return (
    <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:col-span-2 space-y-8"
      >
        <div>
          <p
            className={`text-[11px] uppercase tracking-[0.2em] font-semibold mb-3 ${isDark ? "text-primary" : "text-primary-700"}`}
          >
            Get in Touch
          </p>
          <h3
            className={`text-3xl md:text-4xl font-display font-bold ${isDark ? "text-white" : "text-ink"}`}
          >
            Speak Before the Accord Forgets
          </h3>
        </div>
        <p
          className={`leading-relaxed ${isDark ? "text-white/50" : "text-ink/60"}`}
        >
          The mineral revealed itself in stillness. Ideas often do. Whether you
          carry a question, a collaboration, or simply the need to speak what’s
          been keeping you awake, I’m listening.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? "bg-white/5" : "bg-ink/5"}`}
            >
              <Mail
                size={16}
                className={isDark ? "text-primary" : "text-primary-700"}
              />
            </div>
            <span
              className={`text-sm ${isDark ? "text-white/60" : "text-ink/60"}`}
            >
              contact@dougcollins.com
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? "bg-white/5" : "bg-ink/5"}`}
            >
              <MapPin
                size={16}
                className={isDark ? "text-primary" : "text-primary-700"}
              />
            </div>
            <span
              className={`text-sm ${isDark ? "text-white/60" : "text-ink/60"}`}
            >
              Canada
            </span>
          </div>
        </div>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:col-span-3 space-y-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <Input
            label="Name"
            type="text"
            placeholder="Your name"
            tone={inputTone}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            tone={inputTone}
            required
          />
        </div>
        <Input
          label="Subject"
          type="text"
          placeholder="What's this about?"
          tone={inputTone}
        />
        <Textarea
          label="Message"
          rows={5}
          placeholder="Your message..."
          tone={inputTone}
          required
        />
        <Button
          type="submit"
          variant={isDark ? "fill" : "outline-light"}
          size="lg"
          className="w-full sm:w-auto"
        >
          <Send size={14} />
          Send Message
        </Button>
      </motion.form>
    </div>
  );
};

export default ContactForm;
