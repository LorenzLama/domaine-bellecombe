import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { X } from "lucide-react";

const plans = [
  { key: "plans.ground", placeholder: "RDC" },
  { key: "plans.first", placeholder: "1er" },
  { key: "plans.second", placeholder: "2e" },
  { key: "plans.attic", placeholder: "Combles" },
];

const PlansSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const activePlan = plans[activeTab];
  const activeSrc = `https://placehold.co/1200x800/FAFAF7/2C2C2C?text=${activePlan.placeholder}`;

  return (
    <section id="plans" className="section-padding section-spacing bg-background-alt">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="font-heading text-4xl md:text-5xl text-center mb-4">{t("plans.title")}</h2>
        <div className="w-12 h-px bg-border mx-auto mb-12" />

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {plans.map((plan, idx) => (
            <button
              key={plan.key}
              onClick={() => setActiveTab(idx)}
              className={`label-text px-4 py-2 border transition-colors ${
                activeTab === idx
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-foreground/30"
              }`}
            >
              {t(plan.key)}
            </button>
          ))}
        </div>

        {/* Active plan image */}
        <div className="cursor-zoom-in" onClick={() => setLightboxSrc(activeSrc)}>
          <img
            src={activeSrc}
            alt={t(activePlan.key)}
            loading="lazy"
            className="w-full border border-border hover:shadow-lg transition-shadow duration-300"
          />
        </div>
      </div>

      {lightboxSrc && (
        <div className="fixed inset-0 z-[70] bg-foreground/95 flex items-center justify-center" onClick={() => setLightboxSrc(null)}>
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxSrc(null); }}
            className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightboxSrc}
            alt="Plan"
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default PlansSection;
