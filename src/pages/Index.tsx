import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SectionLabel from "@/components/SectionLabel";
import IntroSection from "@/components/IntroSection";
import KeyFactsSection from "@/components/KeyFactsSection";
import GallerySection from "@/components/GallerySection";
import DetailsSection from "@/components/DetailsSection";
import LocationSection from "@/components/LocationSection";
import VisualDivider from "@/components/VisualDivider";
import ProjectIntroSection from "@/components/ProjectIntroSection";
import HandDrawnAnimationSection from "@/components/HandDrawnAnimationSection";
import PlansSection from "@/components/PlansSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="grain-overlay">
      <Navigation />
      <HeroSection />

      {/* PART 1 — Aujourd'hui / Today */}
      <SectionLabel labelKey="part1.label" id="today" />
      <IntroSection />
      <KeyFactsSection />
      <GallerySection />
      <DetailsSection />
      <LocationSection />

      {/* Visual Divider */}
      <VisualDivider />

      {/* PART 2 — Demain / Tomorrow */}
      <SectionLabel labelKey="part2.label" id="tomorrow" className="bg-background-alt" />
      <ProjectIntroSection />
      <HandDrawnAnimationSection />
      <PlansSection />
      <BeforeAfterSection />

      {/* Contact & Footer */}
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default Index;
