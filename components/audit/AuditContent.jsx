"use client";

import AuditArchitecture from "@/components/audit/AuditArchitecture";
import AuditBook from "@/components/audit/AuditBook";
import AuditExperience from "@/components/audit/AuditExperience";
import AuditHero from "@/components/audit/AuditHero";
import AuditProblem from "@/components/audit/AuditProblem";
import ContactSection from "../home/ContactSection";

export default function AuditContent() {
  return (
    <>
      <AuditHero />
      <AuditProblem />
      <AuditArchitecture />
      <AuditExperience />
      <AuditBook />
      <ContactSection />
    </>
  );
}
