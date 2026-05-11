import { useLanguage } from "@/contexts/LanguageContext";

interface SectionLabelProps {
  labelKey: string;
  id?: string;
  className?: string;
}

const SectionLabel = ({ labelKey, id, className = "" }: SectionLabelProps) => {
  const { t } = useLanguage();

  return (
    <div id={id} className={`section-padding py-16 md:py-20 text-center ${className}`}>
      <span className="label-text text-sm md:text-base tracking-[0.3em] text-muted-foreground">
        {t(labelKey)}
      </span>
      <div className="w-8 h-px bg-primary mx-auto mt-4" />
    </div>
  );
};

export default SectionLabel;
