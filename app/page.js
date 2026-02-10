"use client";

import AuthorIntro from "@/components/home/AuthorIntro";
import ContactSection from "@/components/home/ContactSection";
import CTASection from "@/components/home/CTASection";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import Hero from "@/components/home/Hero";
import LatestBook from "@/components/home/LatestBook";
import QuoteSection from "@/components/home/Quote";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <AuthorIntro />
      <LatestBook />
      <FeaturedBooks />
      <QuoteSection />
      <Testimonials />
      <CTASection />
      <ContactSection />
    </>
  );
}
