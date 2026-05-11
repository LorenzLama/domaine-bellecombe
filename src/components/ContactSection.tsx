import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Mail, Phone } from "lucide-react";

const ContactSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="contact" className="section-padding section-spacing">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="font-heading text-4xl md:text-5xl text-center mb-4">{t("contact.title")}</h2>
        <div className="w-12 h-px bg-border mx-auto mb-16" />

        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="font-heading text-2xl">Bruce Lamarche</h3>
          <p className="font-body text-sm text-muted-foreground mt-2">Château de Veyrier · Place de l'Eglise 24 · 1255 Veyrier, Suisse</p>
          <div className="mt-4 space-y-2 text-sm text-foreground/80">
            <p className="flex items-center justify-center gap-2"><Phone className="w-4 h-4 text-primary" strokeWidth={1.5} />+41 79 280 64 30</p>
            <p className="flex items-center justify-center gap-2"><Mail className="w-4 h-4 text-primary" strokeWidth={1.5} />brucelamarche@gmail.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
