import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import KeyFactsSection from "@/components/KeyFactsSection";
import GallerySection from "@/components/GallerySection";
import DetailsSection from "@/components/DetailsSection";
import LocationSection from "@/components/LocationSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="grain-overlay">
      <Navigation />
      <HeroSection />
      <IntroSection />
      <KeyFactsSection />
      <GallerySection />
      <DetailsSection />
      <LocationSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default Index;
