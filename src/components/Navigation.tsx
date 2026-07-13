import { useState, useEffect } from "react";
import { useLanguage, Lang } from "@/contexts/LanguageContext";
import { Menu, X } from "lucide-react";

const languages: Lang[] = ["fr", "en"];

const navItems = [
  { labelKey: "nav.estate", href: "#estate" },
  { labelKey: "nav.photos", href: "#photos" },
  { labelKey: "nav.contact", href: "#contact" },
];

const Navigation = () => {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-sm shadow-[0_1px_0_hsl(var(--border))]"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between section-padding py-4 md:py-5">
          <a
            href="#"
            className={`font-heading text-lg md:text-xl tracking-tight transition-colors duration-500 ${
              scrolled ? "text-foreground" : "text-primary-foreground"
            }`}
            aria-label="Domaine de Bellecombe"
          >
            Domaine de Bellecombe
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <a
                key={item.labelKey}
                href={item.href}
                className={`label-text transition-colors duration-300 hover:text-primary ${
                  scrolled ? "text-muted-foreground" : "text-primary-foreground/80"
                }`}
              >
                {t(item.labelKey)}
              </a>
            ))}

            {/* Language toggle */}
            <div className={`flex items-center gap-1 border-l pl-6 ${
              scrolled ? "border-border" : "border-primary-foreground/30"
            }`}>
              {languages.map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`label-text px-2 py-1 transition-all duration-300 ${
                    lang === l
                      ? "text-primary border-b-2 border-primary"
                      : scrolled
                        ? "text-muted-foreground hover:text-foreground border-b-2 border-transparent"
                        : "text-primary-foreground/60 hover:text-primary-foreground border-b-2 border-transparent"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className={`md:hidden transition-colors ${
              scrolled ? "text-foreground" : "text-primary-foreground"
            }`}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-background transition-transform duration-500 ease-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end section-padding py-5">
          <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 mt-16">
          {navItems.map(item => (
            <a
              key={item.labelKey}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="font-heading text-3xl text-foreground hover:text-primary transition-colors"
            >
              {t(item.labelKey)}
            </a>
          ))}
          <div className="flex items-center gap-4 mt-8 border-t border-border pt-8">
            {languages.map(l => (
              <button
                key={l}
                onClick={() => { setLang(l); setMobileOpen(false); }}
                className={`label-text text-lg px-3 py-1 transition-all ${
                  lang === l
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground border-b-2 border-transparent"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
