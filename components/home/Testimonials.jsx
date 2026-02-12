"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import Section from "@/components/ui/Section";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { getFeaturedReviews } from "@/lib/reviews";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Autoplay, EffectCoverflow, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function SlideContent({ review, active }) {
  return (
    <div
      className={cn(
        "relative rounded-3xl overflow-hidden transition-all duration-700 h-full",
        active
          ? "bg-linear-to-br from-primary-50 via-white to-primary-50/80 shadow-2xl shadow-primary-500/10 border-primary-300/40"
          : "bg-linear-to-br from-paper via-white to-parchment/60 border-primary-200/20",
        "border",
      )}
    >
      <div
        className="absolute inset-0 opacity-3 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(228,147,37,0.4) 0.5px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      {active && (
        <>
          <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary-400 to-transparent" />
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary-300/10 blur-[60px] pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-primary-200/15 blur-[50px] pointer-events-none" />
        </>
      )}

      <div className="relative z-10 px-8 sm:px-12 py-10 sm:py-10 flex flex-col h-full">
        <div className="flex-1 flex items-center">
          <p
            className={cn(
              "font-display text-xl sm:text-2xl lg:text-[1.65rem] leading-[1.7] font-medium italic transition-colors duration-500",
              active ? "text-charcoal" : "text-charcoal/40",
            )}
          >
            &ldquo;{review.quote}&rdquo;
          </p>
        </div>

        <div className="mt-auto space-y-5">
          <div
            className={cn(
              "h-px transition-all duration-700",
              active
                ? "bg-linear-to-r from-primary-500/40 via-primary-300/20 to-transparent"
                : "bg-primary-200/15",
            )}
          />

          <div className="flex items-center gap-4">
            <div
              className={cn(
                "w-11 h-11 rounded-full flex items-center justify-center text-[13px] font-display font-bold uppercase transition-all duration-500",
                active
                  ? "bg-primary-500 text-white shadow-md shadow-primary-500/20"
                  : "bg-primary-100/50 text-primary-400/40 border border-primary-200/20",
              )}
            >
              {review.author.charAt(0)}
            </div>
            <div>
              <p
                className={cn(
                  "text-sm font-semibold tracking-wide transition-colors duration-500",
                  active ? "text-charcoal" : "text-charcoal/30",
                )}
              >
                {review.author}
              </p>
              <p
                className={cn(
                  "text-[11px] tracking-wide mt-0.5 transition-colors duration-500",
                  active ? "text-primary-600/60" : "text-smoke/40",
                )}
              >
                {review.authorTitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {active && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-primary-400 to-transparent" />
      )}
    </div>
  );
}

export default function Testimonials() {
  const reviews = getFeaturedReviews();
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Section tone="cream" spacing="lg" grain>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-150 h-150 rounded-full bg-primary-100/25 blur-[200px]" />
        <div className="absolute bottom-1/4 right-1/4 w-125 h-125 rounded-full bg-secondary-100/12 blur-[180px]" />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-16 space-y-4">
          <BlurReveal delay={0}>
            <Subtitle tone="cream" align="center" line="both" lineWidth={40}>
              Praise
            </Subtitle>
          </BlurReveal>

          <BlurReveal delay={1}>
            <Title size="xl" tone="cream" align="center">
              What Readers{" "}
              <Title.Gradient variant="primary" underline>
                Say
              </Title.Gradient>
            </Title>
          </BlurReveal>

          <BlurReveal delay={2}>
            <p className="text-ash text-base leading-[1.8] max-w-lg mx-auto">
              Praised by critics, researchers, and readers worldwide — stories
              that stay with you long after the last page.
            </p>
          </BlurReveal>
        </div>

        <BlurReveal delay={3}>
          <div className="relative -mx-5 sm:-mx-8 lg:-mx-12">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              modules={[EffectCoverflow, Autoplay, Keyboard]}
              effect="coverflow"
              coverflowEffect={{
                rotate: 4,
                stretch: 0,
                depth: 90,
                modifier: 2,
                slideShadows: false,
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              }}
              keyboard={{ enabled: true }}
              grabCursor
              centeredSlides
              loop
              slidesPerView={1.2}
              breakpoints={{
                640: { slidesPerView: 1.5 },
                768: { slidesPerView: 1.8 },
                1024: { slidesPerView: 2.4 },
                1280: { slidesPerView: 2.8 },
              }}
            >
              {reviews.map((review, i) => (
                <SwiperSlide key={review.id} className="h-auto!">
                  {({ isActive }) => (
                    <div
                      className={cn(
                        "transition-all duration-700 ease-out h-full",
                        isActive
                          ? "scale-100 opacity-100"
                          : "scale-[0.92] opacity-60",
                      )}
                    >
                      <SlideContent review={review} active={isActive} />
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </BlurReveal>

        <BlurReveal delay={4}>
          <div className="flex items-center justify-center mt-14 gap-8">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="group w-12 h-12 rounded-full border border-charcoal/8 flex items-center justify-center text-charcoal/30 hover:text-charcoal hover:border-charcoal/20 hover:bg-charcoal/3 transition-all duration-300 active:scale-90"
              aria-label="Previous"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
            </button>

            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => swiperRef.current?.slideToLoop(i)}
                  className="group relative p-1"
                  aria-label={`Go to review ${i + 1}`}
                >
                  <motion.div
                    className="rounded-full bg-charcoal/15"
                    animate={{
                      width: i === activeIndex ? 28 : 6,
                      height: 6,
                      backgroundColor:
                        i === activeIndex
                          ? "rgb(228,147,37)"
                          : "rgba(26,26,46,0.15)",
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="group w-12 h-12 rounded-full border border-charcoal/8 flex items-center justify-center text-charcoal/30 hover:text-charcoal hover:border-charcoal/20 hover:bg-charcoal/3 transition-all duration-300 active:scale-90"
              aria-label="Next"
            >
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>
          </div>
        </BlurReveal>
      </div>
    </Section>
  );
}
