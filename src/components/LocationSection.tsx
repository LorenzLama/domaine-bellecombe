import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { MapPin, Car, TrainFront } from "lucide-react";
import mapImage from "@/assets/map-situation.png";

// Exact house position as a fraction of the map image. object-position uses the
// same values, so under object-fit: cover the point always lands at this exact
// fraction of the container — the marker stays anchored at every viewport size.
const HOUSE_X = 58.09;
const HOUSE_Y = 42.73;

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

const DistanceCard = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-background/95 backdrop-blur-sm border border-border p-6 lg:p-8">
      <div className="mb-6">
        <span className="font-heading text-xl lg:text-2xl text-foreground block mb-1">Reignier-Esery</span>
        <span className="label-text text-muted-foreground">Haute-Savoie · France</span>
      </div>
      <div className="grid grid-cols-[1fr_60px_68px] lg:grid-cols-[1fr_80px_80px] items-center gap-2 pb-3 mb-1 border-b border-border">
        <span className="label-text text-muted-foreground text-[10px] whitespace-nowrap">{t("location.destination")}</span>
        <span className="flex items-center justify-end gap-1 text-muted-foreground">
          <Car className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
          <span className="text-[9px] lg:text-[10px] font-medium uppercase tracking-[0.08em] whitespace-nowrap">{t("location.car")}</span>
        </span>
        <span className="flex items-center justify-end gap-1 text-muted-foreground">
          <TrainFront className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
          <span className="text-[9px] lg:text-[10px] font-medium uppercase tracking-[0.08em] whitespace-nowrap">{t("location.train")}</span>
        </span>
      </div>
      {distances.map((d, i) => (
        <div
          key={d.place}
          className={`grid grid-cols-[1fr_60px_68px] lg:grid-cols-[1fr_80px_80px] items-center gap-2 py-3 ${
            i < distances.length - 1 ? "border-b border-border/50" : ""
          }`}
        >
          <span className="font-body text-sm lg:text-[15px] text-foreground whitespace-nowrap">{t(d.place)}</span>
          <span className="font-heading text-xs lg:text-sm text-foreground/75 text-right tabular-nums whitespace-nowrap">{d.car}</span>
          <span className="font-heading text-xs lg:text-sm text-foreground/75 text-right tabular-nums whitespace-nowrap">{d.train}</span>
        </div>
      ))}
      <p className="font-body text-xs text-muted-foreground mt-6">
        528/530 Chemin de Saint-Romain
      </p>
    </div>
  );
};

const LocationSection = () => {
  const { t } = useLanguage();
  const { ref } = useScrollReveal();

  return (
    <section id="location" className="bg-background-alt pt-20 md:pt-28 lg:pt-32">
      <div className="section-padding">
        <div className="text-center mb-4">
          <span className="label-text text-muted-foreground">{t("location.eyebrow")}</span>
        </div>
        <h2 className="font-heading text-4xl md:text-5xl text-center mb-6 tracking-tight">
          {t("location.title")}
        </h2>
        <div className="ornamental-mark justify-center mb-14 md:mb-16"><span /></div>
      </div>

      <div ref={ref} className="reveal">
        <div className="relative h-[60vh] md:h-[72vh] overflow-hidden border-y border-border">
          <img
            src={mapImage}
            alt="Carte de situation — Domaine de Bellecombe, Reignier-Esery"
            loading="lazy"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: `${HOUSE_X}% ${HOUSE_Y}%` }}
          />

          {/* House marker — golden pin anchored on the exact spot */}
          <div
            className="absolute z-10 pointer-events-none"
            style={{ left: `${HOUSE_X}%`, top: `${HOUSE_Y}%` }}
          >
            <span
              className="absolute left-0 top-0 w-11 h-11 rounded-full bg-accent/15"
              style={{ animation: "pin-pulse 3.2s cubic-bezier(0.16, 1, 0.3, 1) infinite" }}
            />
            <MapPin
              className="absolute left-0 top-0 w-9 h-9 -translate-x-1/2 -translate-y-full text-accent drop-shadow-sm"
              strokeWidth={1.5}
              fill="none"
            />
          </div>

          {/* Distance table — floating card on desktop */}
          <div className="hidden lg:flex absolute inset-y-0 left-10 xl:left-20 items-center z-10">
            <div className="w-[380px] max-h-[calc(100%-3rem)] overflow-y-auto shadow-[0_30px_80px_-30px_hsl(var(--foreground)/0.4)]">
              <DistanceCard />
            </div>
          </div>
        </div>

        {/* Distance table — below the map on mobile/tablet */}
        <div className="lg:hidden section-padding mt-10">
          <div className="max-w-md mx-auto">
            <DistanceCard />
          </div>
        </div>
      </div>

      <div className="section-padding py-12 md:py-16">
        <p className="text-center font-body text-sm text-muted-foreground max-w-2xl mx-auto whitespace-pre-line italic">
          {t("location.description")}
        </p>
      </div>
    </section>
  );
};

export default LocationSection;
