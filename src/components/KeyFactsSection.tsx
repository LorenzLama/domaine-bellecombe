import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";

interface FactProps {
  value: number;
  label: string;
  suffix?: string;
  isVisible: boolean;
  staticLabel?: string;
}

const Fact = ({ value, label, suffix = "", isVisible, staticLabel }: FactProps) => {
  const count = useCountUp(value, isVisible);
  return (
    <div className="reveal-child group flex flex-col items-center text-center px-4 py-10 md:py-12">
      <div className="h-12 md:h-14 lg:h-[60px] flex items-end justify-center">
        {staticLabel ? (
          <span className="font-heading italic text-2xl md:text-3xl lg:text-[34px] text-foreground leading-none tracking-tight">
            {staticLabel}
          </span>
        ) : (
          <span className="font-heading text-4xl md:text-5xl lg:text-[52px] text-foreground leading-none tracking-tight">
            {count}
            <span className="text-2xl md:text-3xl text-foreground/80 ml-1">{suffix}</span>
          </span>
        )}
      </div>
      <span className="mt-5 block w-6 h-px bg-accent/60 group-hover:w-10 transition-all duration-500" />
      <span className="label-text mt-4 text-center text-[11px]">{label}</span>
    </div>
  );
};

const KeyFactsSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section ref={ref} className="bg-background-alt border-y border-border">
      <div className="section-padding py-4 md:py-8">
        <div className={`reveal-stagger grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 ${isVisible ? "visible" : ""}`}>
          <Fact value={27.6} suffix="ha" label={t("facts.land")} isVisible={isVisible} />
          <Fact value={663} suffix="m²" label={t("facts.mainHouse")} isVisible={isVisible} />
          <Fact value={3} label={t("facts.buildings")} isVisible={isVisible} />
          <Fact value={0} label={t("facts.origins")} isVisible={isVisible} staticLabel={t("facts.originsValue")} />
          <Fact value={20} suffix="min" label={t("facts.fromGeneva")} isVisible={isVisible} />
          <Fact
            value={0}
            label={t("facts.priceLabel")}
            isVisible={isVisible}
            staticLabel={t("facts.price")}
          />
        </div>
      </div>
    </section>
  );
};

export default KeyFactsSection;
