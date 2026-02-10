import AboutCTA from "@/components/about/AboutCTA";
import AboutExpertise from "@/components/about/AboutExpertise";
import AboutHero from "@/components/about/AboutHero";
import AboutPhilosophy from "@/components/about/AboutPhilosophy";
import AboutQuote from "@/components/about/AboutQuote";
import AboutTimeline from "@/components/about/AboutTimeline";

export const metadata = {
  title: "About — Doug Collins | Author, Engineer, Cryptographer",
  description:
    "Learn about Doug Collins — cybersecurity expert, software engineer, and author of technically grounded speculative fiction spanning three acclaimed series.",
  keywords: [
    "Doug Collins",
    "author",
    "cybersecurity",
    "software engineer",
    "speculative fiction",
    "techno-thriller",
  ],
  openGraph: {
    title: "About — Doug Collins",
    description:
      "Author, engineer, and cryptographer bridging the gap between cutting-edge technology and narrative fiction.",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutPhilosophy />
      <AboutTimeline />
      <AboutExpertise />
      <AboutQuote />
      <AboutCTA />
    </>
  );
}
