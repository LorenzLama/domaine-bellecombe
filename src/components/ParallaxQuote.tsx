import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import parkPond from "@/assets/park-pond.jpg";

const ParallaxQuote = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewH) return;
      const progress = (viewH - rect.top) / (viewH + rect.height);
      setOffset((progress - 0.5) * 100);
    };

    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 },
    );
    if (sectionRef.current) io.observe(sectionRef.current);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[70vh] md:h-[80vh] overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: `url(${parkPond})`,
          transform: `translateY(${offset * 0.3}px) scale(1.15)`,
          transition: "transform 0.05s linear",
        }}
      />
      <div className="absolute inset-0 bg-foreground/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-transparent to-foreground/40" />

      <div
        className={`relative z-10 h-full flex flex-col items-center justify-center text-center px-6 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <span className="label-text text-primary-foreground/70 mb-6">
          {t("parallax.eyebrow")}
        </span>
        <blockquote className="max-w-4xl">
          <p className="font-heading italic text-primary-foreground font-normal leading-[1.25] text-3xl md:text-5xl lg:text-[56px]">
            {t("parallax.quote")}
          </p>
        </blockquote>
        <div className="mt-10 flex items-center gap-3">
          <span className="block w-16 h-px bg-primary-foreground/50" />
          <span className="block w-1.5 h-1.5 rotate-45 bg-primary-foreground/70" />
          <span className="block w-16 h-px bg-primary-foreground/50" />
        </div>
        <span className="mt-6 label-text text-primary-foreground/60">
          {t("parallax.attribution")}
        </span>
      </div>
    </section>
  );
};

export default ParallaxQuote;
