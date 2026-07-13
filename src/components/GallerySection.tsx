import { useState, useEffect } from "react";
import { useLanguage, Lang } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import exteriorFacade from "@/assets/exterior-facade.jpg";
import exteriorBalcony from "@/assets/exterior-balcony.jpg";
import exteriorPavillon from "@/assets/exterior-pavillon.jpg";
import exteriorView from "@/assets/exterior-view.jpg";
import interiorLivingRoom from "@/assets/interior-living-room.jpg";
import interiorDiningRoom from "@/assets/interior-dining-room.jpg";
import interiorMasterBedroom from "@/assets/interior-master-bedroom.jpg";
import interiorBedroom from "@/assets/interior-bedroom.jpg";
import interiorBarn from "@/assets/interior-barn.jpg";
import parkPond from "@/assets/park-pond.jpg";
import parkPond2 from "@/assets/park-pond-2.jpg";
import parkGlaciere from "@/assets/park-glaciere.jpg";
import parkFortress from "@/assets/park-fortress.jpg";

type Category = "all" | "exterior" | "interior" | "grounds";

interface GalleryImage {
  src: string;
  alt: string;
  category: Category;
  caption: Record<Lang, string>;
  size: "large" | "small" | "tall";
}

const images: GalleryImage[] = [
  { src: exteriorFacade, alt: "Main facade", category: "exterior", caption: { fr: "La Façade Principale", en: "The Main Facade" }, size: "large" },
  { src: exteriorBalcony, alt: "Balcony with view", category: "exterior", caption: { fr: "Le Balcon", en: "The Balcony" }, size: "small" },
  { src: exteriorPavillon, alt: "The Pavillon", category: "exterior", caption: { fr: "Le Pavillon", en: "The Pavilion" }, size: "small" },
  { src: interiorLivingRoom, alt: "Living room", category: "interior", caption: { fr: "Le Salon", en: "The Living Room" }, size: "large" },
  { src: interiorMasterBedroom, alt: "Master bedroom", category: "interior", caption: { fr: "La Chambre Principale", en: "The Master Bedroom" }, size: "large" },
  { src: interiorDiningRoom, alt: "Dining room", category: "interior", caption: { fr: "La Salle à Manger", en: "The Dining Room" }, size: "small" },
  { src: interiorBedroom, alt: "Bedroom", category: "interior", caption: { fr: "Une Chambre", en: "One Bedroom" }, size: "small" },
  { src: interiorBarn, alt: "The Barn", category: "interior", caption: { fr: "La Grange", en: "The Barn" }, size: "large" },
  { src: parkPond, alt: "The pond", category: "grounds", caption: { fr: "L'Étang", en: "The Pond" }, size: "large" },
  { src: parkPond2, alt: "Pond view", category: "grounds", caption: { fr: "Vue de l'Étang", en: "Pond View" }, size: "small" },
  { src: parkGlaciere, alt: "Ice cellar", category: "grounds", caption: { fr: "La Glacière", en: "The Ice Cellar" }, size: "small" },
  { src: parkFortress, alt: "Medieval fortress ruins", category: "grounds", caption: { fr: "La Forteresse", en: "The Fortress" }, size: "large" },
  { src: exteriorView, alt: "Estate view", category: "exterior", caption: { fr: "La Vue", en: "The View" }, size: "large" },
];

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "gallery.all" },
  { key: "exterior", label: "gallery.exterior" },
  { key: "interior", label: "gallery.interior" },
  { key: "grounds", label: "gallery.grounds" },
];

const GallerySection = () => {
  const { lang, t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "all" ? images : images.filter(img => img.category === activeCategory);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex(prev => prev !== null ? (prev - 1 + filtered.length) % filtered.length : null);
  const nextImage = () => setLightboxIndex(prev => prev !== null ? (prev + 1) % filtered.length : null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, filtered.length]);

  return (
    <section id="photos" className="section-padding section-spacing">
      <div ref={ref} className="reveal">
        <div className="text-center mb-4">
          <span className="label-text text-muted-foreground">{t("gallery.eyebrow")}</span>
        </div>
        <h2 className="font-heading text-4xl md:text-5xl text-center mb-6 tracking-tight">{t("gallery.title")}</h2>
        <div className="ornamental-mark justify-center mb-14"><span /></div>

        {/* Category tabs */}
        <div className="flex justify-center gap-8 mb-14 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`label-text pb-2 border-b transition-all duration-300 ${
                activeCategory === cat.key
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t(cat.label)}
            </button>
          ))}
        </div>

        {/* Editorial masonry grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5 auto-rows-[220px] md:auto-rows-[260px]">
          {filtered.map((img, idx) => {
            const spanClass =
              img.size === "large"
                ? "md:col-span-4 md:row-span-2"
                : img.size === "tall"
                ? "md:col-span-2 md:row-span-2"
                : "md:col-span-2 md:row-span-1";
            return (
              <figure
                key={img.src + activeCategory}
                className={`relative overflow-hidden cursor-zoom-in group ${spanClass}`}
                onClick={() => openLightbox(idx)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none">
                  <span className="block label-text text-primary-foreground/70 text-[10px] mb-1">
                    {t(`gallery.${img.category}`)}
                  </span>
                  <span className="font-heading italic text-xl text-primary-foreground">
                    {img.caption[lang]}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[70] bg-foreground/95 flex items-center justify-center animate-in fade-in duration-300" onClick={closeLightbox}>
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-6 md:left-12 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <figure className="flex flex-col items-center gap-4">
            <img
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              className="max-h-[80vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <figcaption className="font-heading italic text-primary-foreground/90 text-lg">
              {filtered[lightboxIndex].caption[lang]}
            </figcaption>
          </figure>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-6 md:right-12 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
