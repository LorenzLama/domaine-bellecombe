import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ProjectIntroSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-padding py-24 md:py-32 lg:py-40 bg-background-alt">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="w-12 h-px bg-border mx-auto mb-10" />
        <p className="font-body text-xl md:text-[22px] leading-relaxed md:leading-[1.8] text-foreground/90">
          {t("project.intro")}
        </p>
        <div className="w-12 h-px bg-border mx-auto mt-10" />
      </div>
    </section>
  );
};

export default ProjectIntroSection;
