import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/exterior-balcony.jpg";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          animation: "ken-burns 20s ease-out forwards",
        }}
      />
      {/* Layered gradients for editorial depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-foreground/10 to-foreground/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl text-primary-foreground font-normal leading-[1.05] tracking-tight"
        >
          {t("hero.name")}
        </motion.h1>
        {/* Ornamental divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-8 flex items-center gap-3"
        >
          <span className="block w-16 h-px bg-primary-foreground/60" />
          <span className="block w-1.5 h-1.5 rotate-45 bg-primary-foreground/80" />
          <span className="block w-16 h-px bg-primary-foreground/60" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-8 font-body text-base md:text-lg text-primary-foreground/85 tracking-wide max-w-2xl font-light"
        >
          {t("hero.tagline")}
        </motion.p>

        {/* Dual CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#today"
            className="group relative px-10 py-3.5 border border-primary-foreground/60 text-primary-foreground font-body text-sm uppercase tracking-[0.22em] overflow-hidden transition-all duration-500 hover:border-primary-foreground"
          >
            <span className="absolute inset-0 bg-primary-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 group-hover:text-foreground transition-colors duration-500">{t("hero.cta.today")}</span>
          </a>
          <a
            href="#tomorrow"
            className="group relative px-10 py-3.5 border border-primary-foreground/60 text-primary-foreground font-body text-sm uppercase tracking-[0.22em] overflow-hidden transition-all duration-500 hover:border-primary-foreground"
          >
            <span className="absolute inset-0 bg-primary-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 group-hover:text-foreground transition-colors duration-500">{t("hero.cta.tomorrow")}</span>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="label-text text-primary-foreground/60 text-[10px]">Scroll</span>
        <ChevronDown
          className="w-4 h-4 text-primary-foreground/60"
          style={{ animation: "scroll-hint 2s ease-in-out infinite" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
