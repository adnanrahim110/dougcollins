import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactHero from "@/components/contact/ContactHero";

export const metadata = {
  title: "Contact — Doug Collins",
  description:
    "Get in touch with Doug Collins — for book inquiries, speaking engagements, cybersecurity consulting, or just to start a conversation.",
  openGraph: {
    title: "Contact — Doug Collins",
    description:
      "Get in touch with Doug Collins for book inquiries, collaborations, and more.",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactFormSection />
    </>
  );
}
