import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const renderingImages = [
  { src: "https://placehold.co/900x600/FAFAF7/2C2C2C?text=Rendu+1", size: "large" },
  { src: "https://placehold.co/600x800/FAFAF7/2C2C2C?text=Rendu+2", size: "small" },
  { src: "https://placehold.co/900x600/FAFAF7/2C2C2C?text=Rendu+3", size: "large" },
  { src: "https://placehold.co/900x600/FAFAF7/2C2C2C?text=Rendu+4", size: "small" },
];

const RenderingsSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="renderings" className="section-padding section-spacing bg-background-alt">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="font-heading text-4xl md:text-5xl text-center mb-4">{t("renderings.title")}</h2>
        <div className="w-12 h-px bg-border mx-auto mb-16" />

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderingImages.map((img, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden cursor-zoom-in group ${
                img.size === "large" ? "md:col-span-2" : ""
              }`}
              onClick={() => setLightboxIndex(idx)}
            >
              <img
                src={img.src}
                alt={`Rendering ${idx + 1}`}
                loading="lazy"
                className="w-full h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[70] bg-foreground/95 flex items-center justify-center" onClick={() => setLightboxIndex(null)}>
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
            className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(prev => prev !== null ? (prev - 1 + renderingImages.length) % renderingImages.length : null); }}
            className="absolute left-6 text-primary-foreground/60 hover:text-primary-foreground"
            aria-label="Previous"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <img
            src={renderingImages[lightboxIndex].src}
            alt={`Rendering ${lightboxIndex + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(prev => prev !== null ? (prev + 1) % renderingImages.length : null); }}
            className="absolute right-6 text-primary-foreground/60 hover:text-primary-foreground"
            aria-label="Next"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}
    </section>
  );
};

export default RenderingsSection;
