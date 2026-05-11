import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Linkedin } from "lucide-react";
import logo from "@/assets/logo-full.png";

const FooterSection = () => {
  const { t } = useLanguage();

  return (
    <footer className="section-padding py-16 border-t border-border bg-background-alt">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          <img
            src={logo}
            alt="Domaine de Bellecombe"
            className="h-24 md:h-28 w-auto opacity-90"
          />
          <p className="label-text text-muted-foreground text-center">
            {t("footer.address")}
          </p>
          <div className="flex items-center justify-center gap-5">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" strokeWidth={1.5} />
            </a>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-6 text-center">
          <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t("footer.legal")}
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            © {new Date().getFullYear()} Domaine de Bellecombe
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
