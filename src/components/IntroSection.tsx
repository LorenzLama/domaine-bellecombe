import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import introView from "@/assets/exterior-view.jpg";

const IntroSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();
  const { ref: imgRef, isVisible: imgVisible } = useScrollReveal();

  return (
    <section className="section-padding py-24 md:py-32 lg:py-40">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <span className="label-text text-muted-foreground mb-6 block">
          {t("intro.eyebrow")}
        </span>
        <div className="ornamental-mark justify-center mb-10"><span /></div>
        <p className="font-heading italic text-2xl md:text-3xl lg:text-[34px] leading-[1.4] text-foreground/90 font-normal">
          {t("intro.text")}
        </p>
        <div className="ornamental-mark justify-center mt-12"><span /></div>
      </div>

      <div
        ref={imgRef}
        className={`mt-20 md:mt-28 max-w-6xl mx-auto transition-all duration-[1200ms] ${
          imgVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="relative overflow-hidden aspect-[16/9]">
          <img
            src={introView}
            alt="Vue du domaine"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
