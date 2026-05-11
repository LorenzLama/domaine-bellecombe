import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { MapPin, Car, TrainFront } from "lucide-react";

const distances = [
  { place: "location.reignier", car: "5 min", train: "—" },
  { place: "location.geneva", car: "20 min", train: "30 min*" },
  { place: "location.annemasse", car: "15 min", train: "25 min*" },
  { place: "location.annecy", car: "30 min", train: "50 min*" },
  { place: "location.chamonix", car: "50 min", train: "—" },
  { place: "location.lausanne", car: "1h50", train: "2h15*" },
  { place: "location.lyon", car: "2h00", train: "3h10*" },
  { place: "location.paris", car: "5h00", train: "4h45*" },
];

const LocationSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="location" className="section-padding section-spacing bg-background-alt">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-4">
          <span className="label-text text-muted-foreground">Situation</span>
        </div>
        <h2 className="font-heading text-4xl md:text-5xl text-center mb-6 tracking-tight">{t("location.title")}</h2>
        <div className="ornamental-mark justify-center mb-20"><span /></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Location card */}
          <div className="relative bg-background border border-border min-h-[340px] flex flex-col items-center justify-center p-8 text-center">
            <MapPin className="w-10 h-10 text-accent mb-5" strokeWidth={1.25} />
            <span className="font-heading text-2xl md:text-3xl text-foreground mb-2">
              Reignier-Esery
            </span>
            <span className="label-text text-muted-foreground mb-6">Haute-Savoie · France</span>
            <div className="flex items-center gap-3 my-2">
              <span className="block w-8 h-px bg-border" />
              <span className="block w-1 h-1 rotate-45 bg-accent/60" />
              <span className="block w-8 h-px bg-border" />
            </div>
            <p className="font-body text-sm text-muted-foreground mt-4">
              46.1325°N, 6.2680°E
            </p>
            <p className="font-body text-xs text-muted-foreground mt-1">
              528/530 Chemin de Saint-Romain
            </p>
          </div>

          {/* Distance table — fixed 3-col grid so headers/cells line up */}
          <div>
            <div className="grid grid-cols-[1fr_90px_90px] items-center pb-4 mb-2 border-b border-border">
              <span className="label-text text-muted-foreground text-[10px]">Destination</span>
              <span className="label-text text-muted-foreground text-[10px] flex items-center justify-end gap-2">
                <Car className="w-3.5 h-3.5" strokeWidth={1.5} /> {t("location.car")}
              </span>
              <span className="label-text text-muted-foreground text-[10px] flex items-center justify-end gap-2">
                <TrainFront className="w-3.5 h-3.5" strokeWidth={1.5} /> {t("location.train")}
              </span>
            </div>
            {distances.map((d, i) => (
              <div
                key={d.place}
                className={`grid grid-cols-[1fr_90px_90px] items-center py-3.5 group transition-colors hover:text-foreground ${
                  i < distances.length - 1 ? "border-b border-border/50" : ""
                }`}
              >
                <span className="font-body text-[15px] text-foreground">{t(d.place)}</span>
                <span className="font-heading text-sm text-foreground/75 text-right tabular-nums">{d.car}</span>
                <span className="font-heading text-sm text-foreground/75 text-right tabular-nums">{d.train}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center font-body text-sm text-muted-foreground max-w-2xl mx-auto mt-14 whitespace-pre-line italic">
          {t("location.description")}
        </p>
      </div>
    </section>
  );
};

export default LocationSection;
