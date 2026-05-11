import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import dividerImage from "@/assets/park-fortress.jpg";

const VisualDivider = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const { ref: textRef, isVisible } = useScrollReveal(0.5);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      setOffset(progress * 30 - 15); // subtle parallax: -15px to +15px (15%)
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="relative min-h-[70vh] md:min-h-[60vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${dividerImage})`,
          transform: `translateY(${offset}px) scale(1.1)`,
          transition: "transform 0.1s linear",
        }}
      />
      <div className="absolute inset-0 bg-foreground/45" />
      
      {/* Centered text */}
      <div 
        ref={textRef}
        className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <span className="label-text text-primary-foreground/70 mb-4">
          {t("transition.label")}
        </span>
        <h2 className="font-heading text-3xl md:text-5xl text-primary-foreground font-medium">
          {t("transition.tagline")}
        </h2>
      </div>
    </div>
  );
};

export default VisualDivider;
