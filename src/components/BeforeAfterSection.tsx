import { useState, useRef, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const BeforeAfterSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(5, Math.min(95, x)));
  }, []);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) updatePosition(e.clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  };

  return (
    <section className="section-padding section-spacing bg-background-alt">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="font-heading text-4xl md:text-5xl text-center mb-4">{t("beforeafter.title")}</h2>
        <div className="w-12 h-px bg-border mx-auto mb-12" />

        <div
          ref={containerRef}
          className="relative aspect-[16/10] overflow-hidden cursor-col-resize select-none border border-border"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {/* After (full background) */}
          <img
            src="https://placehold.co/900x600/FAFAF7/4A6741?text=Après"
            alt="After"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Before (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src="https://placehold.co/900x600/E0DAD0/2C2C2C?text=Avant"
              alt="Before"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ minWidth: containerRef.current?.offsetWidth || "100%" }}
            />
          </div>

          {/* Slider line */}
          <div
            className="absolute top-0 bottom-0 w-px bg-primary-foreground z-10"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border-2 border-primary-foreground bg-foreground/40 backdrop-blur-sm flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-body">⟨ ⟩</span>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute bottom-4 left-4 z-10">
            <span className="label-text text-foreground bg-background/80 px-3 py-1">{t("beforeafter.today")}</span>
          </div>
          <div className="absolute bottom-4 right-4 z-10">
            <span className="label-text text-foreground bg-background/80 px-3 py-1">{t("beforeafter.tomorrow")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
