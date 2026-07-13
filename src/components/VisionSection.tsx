import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Compass, Pencil, KeyRound } from "lucide-react";
import facadeImage from "@/assets/exterior-facade.jpg";
import livingRoomImage from "@/assets/interior-living-room.jpg";
import pondImage from "@/assets/park-pond.jpg";

const pillars = [
  { icon: Compass, key: "vision.pillar1" },
  { icon: Pencil, key: "vision.pillar2" },
  { icon: KeyRound, key: "vision.pillar3" },
];

const VisionSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();

  return (
    <section id="vision" className="bg-background-alt">
      {/* Three pillars — the philosophy of the renovation */}
      <div className="section-padding pt-4 pb-20 md:pb-28">
        <div
          ref={ref}
          className={`max-w-6xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-4">
            <span className="label-text text-muted-foreground">{t("vision.eyebrow")}</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl text-center mb-6 tracking-tight">
            {t("vision.title")}
          </h2>
          <div className="ornamental-mark justify-center mb-16"><span /></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.key}
                  className="flex flex-col items-center text-center group"
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="w-14 h-14 border border-accent/40 flex items-center justify-center mb-6 group-hover:border-accent transition-colors duration-500">
                    <Icon className="w-5 h-5 text-accent" strokeWidth={1.25} />
                  </div>
                  <h3 className="font-heading text-xl md:text-2xl mb-4 tracking-tight">
                    {t(`${pillar.key}.title`)}
                  </h3>
                  <p className="font-body text-sm md:text-base text-foreground/75 leading-relaxed max-w-xs">
                    {t(`${pillar.key}.text`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Editorial triptych — three scenes that hint at the future */}
      <div
        ref={gridRef}
        className={`section-padding pb-20 md:pb-28 transition-all duration-1000 ${
          gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 auto-rows-[260px] md:auto-rows-[300px]">
          {/* Tall — the facade reimagined */}
          <figure className="relative overflow-hidden md:col-span-5 md:row-span-2 group">
            <img
              src={facadeImage}
              alt="La Façade"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
            <figcaption className="absolute bottom-0 left-0 right-0 p-6">
              <span className="block label-text text-primary-foreground/70 text-[10px] mb-2">
                {t("vision.scene1.label")}
              </span>
              <span className="font-heading italic text-2xl md:text-3xl text-primary-foreground leading-tight">
                {t("vision.scene1.caption")}
              </span>
            </figcaption>
          </figure>

          {/* Wide — interior reimagined */}
          <figure className="relative overflow-hidden md:col-span-7 group">
            <img
              src={livingRoomImage}
              alt="Le Salon"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-transparent to-transparent" />
            <figcaption className="absolute bottom-0 left-0 right-0 p-6">
              <span className="block label-text text-primary-foreground/70 text-[10px] mb-2">
                {t("vision.scene2.label")}
              </span>
              <span className="font-heading italic text-xl md:text-2xl text-primary-foreground leading-tight">
                {t("vision.scene2.caption")}
              </span>
            </figcaption>
          </figure>

          {/* Wide — the grounds */}
          <figure className="relative overflow-hidden md:col-span-7 group">
            <img
              src={pondImage}
              alt="Le Parc"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-transparent to-transparent" />
            <figcaption className="absolute bottom-0 left-0 right-0 p-6">
              <span className="block label-text text-primary-foreground/70 text-[10px] mb-2">
                {t("vision.scene3.label")}
              </span>
              <span className="font-heading italic text-xl md:text-2xl text-primary-foreground leading-tight">
                {t("vision.scene3.caption")}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Quiet CTA — request the full dossier */}
      <div
        ref={ctaRef}
        className={`section-padding pb-24 md:pb-32 transition-all duration-1000 ${
          ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-2xl mx-auto text-center border-t border-border pt-16">
          <span className="label-text text-muted-foreground mb-6 block">
            {t("vision.cta.eyebrow")}
          </span>
          <p className="font-heading italic text-2xl md:text-3xl text-foreground/90 leading-snug mb-10">
            {t("vision.cta.text")}
          </p>
          <a
            href="#contact"
            className="group relative inline-block px-12 py-4 border border-foreground/70 text-foreground font-body text-sm uppercase tracking-[0.22em] overflow-hidden transition-all duration-500 hover:border-foreground"
          >
            <span className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 group-hover:text-primary-foreground transition-colors duration-500">
              {t("vision.cta.button")}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
