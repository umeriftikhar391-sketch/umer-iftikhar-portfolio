import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import Stack from "@/components/Stack";
import Results from "@/components/Results";
import About from "@/components/About";
import CtaSection from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <CaseStudies />
      <Results />
      <Clients />
      <Stack />
      <About />
      <CtaSection
        source="home"
        eyebrow="Contact"
        title="Let's Build Something Powerful."
        intro="Have a campaign, website or growth goal in mind? Share a few details and I'll show you where the biggest opportunities are."
      />
    </>
  );
}
