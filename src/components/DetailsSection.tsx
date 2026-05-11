import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Home, Trees, Droplets, Mountain, Castle, Landmark, Snowflake, Map,
} from "lucide-react";

const features = [
  { icon: Home, key: "details.mainHouse" },
  { icon: Home, key: "details.secondaryHouse" },
  { icon: Home, key: "details.barn" },
  { icon: Map, key: "details.land" },
  { icon: Trees, key: "details.forest" },
  { icon: Droplets, key: "details.pond" },
  { icon: Mountain, key: "details.riverfront" },
  { icon: Castle, key: "details.ruins" },
  { icon: Landmark, key: "details.heritage" },
  { icon: Snowflake, key: "details.cellar" },
];

const DetailsSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();

  const description = t("details.description");

  return (
    <section id="details" className="section-padding section-spacing">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-4">
          <span className="label-text text-muted-foreground">Le Bien</span>
        </div>
        <h2 className="font-heading text-4xl md:text-5xl text-center mb-6 tracking-tight">{t("details.title")}</h2>
        <div className="ornamental-mark justify-center mb-20"><span /></div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-20">
          <div>
            {description.split("\n\n").map((para, i) => (
              <p
                key={i}
                className={`font-body leading-[1.9] text-foreground/85 mb-6 ${
                  i === 0 ? "text-lg md:text-xl first-letter:float-left first-letter:font-heading first-letter:text-6xl first-letter:leading-[0.9] first-letter:mr-2 first-letter:mt-1 first-letter:text-foreground" : "text-base md:text-lg"
                }`}
              >
                {para}
              </p>
            ))}
          </div>

          <div className="lg:pl-8 lg:border-l lg:border-border">
            <span className="label-text text-muted-foreground block mb-6">Caractéristiques</span>
            <ul className="space-y-0">
              {features.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <li
                    key={feat.key}
                    className={`flex items-center gap-5 py-4 group transition-all duration-300 ${
                      i < features.length - 1 ? "border-b border-border/60" : ""
                    }`}
                  >
                    <Icon className="w-4 h-4 text-accent flex-shrink-0 transition-transform group-hover:scale-110" strokeWidth={1.25} />
                    <span className="font-body text-base text-foreground/90 tracking-wide">{t(feat.key)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsSection;
