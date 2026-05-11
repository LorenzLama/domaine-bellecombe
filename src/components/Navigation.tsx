import { useState, useEffect, useRef } from "react";
import { useLanguage, Lang } from "@/contexts/LanguageContext";
import { Menu, X, ChevronDown } from "lucide-react";

const languages: Lang[] = ["fr", "en"];

interface NavItem {
  labelKey: string;
  href?: string;
  children?: { labelKey: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    labelKey: "nav.estate",
    children: [
      { labelKey: "nav.today", href: "#today" },
      { labelKey: "nav.tomorrow", href: "#tomorrow" },
    ],
  },
  {
    labelKey: "nav.gallery",
    children: [
      { labelKey: "nav.photos", href: "#photos" },
      { labelKey: "nav.renderings", href: "#renderings" },
    ],
  },
  { labelKey: "nav.contact", href: "#contact" },
];

const Navigation = () => {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDropdownEnter = (key: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(key);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

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
              <div
                key={item.labelKey}
                className="relative"
                onMouseEnter={() => item.children && handleDropdownEnter(item.labelKey)}
                onMouseLeave={() => item.children && handleDropdownLeave()}
              >
                {item.children ? (
                  <button
                    className={`label-text transition-colors duration-300 hover:text-primary flex items-center gap-1 ${
                      scrolled ? "text-muted-foreground" : "text-primary-foreground/80"
                    }`}
                  >
                    {t(item.labelKey)}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openDropdown === item.labelKey ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className={`label-text transition-colors duration-300 hover:text-primary ${
                      scrolled ? "text-muted-foreground" : "text-primary-foreground/80"
                    }`}
                  >
                    {t(item.labelKey)}
                  </a>
                )}

                {/* Dropdown */}
                {item.children && (
                  <div
                    className={`absolute top-full left-0 mt-2 min-w-[160px] py-2 transition-all duration-200 ${
                      openDropdown === item.labelKey
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-1 pointer-events-none"
                    } ${
                      scrolled
                        ? "bg-background border border-border"
                        : "bg-foreground/80 backdrop-blur-sm"
                    }`}
                  >
                    {item.children.map(child => (
                      <a
                        key={child.labelKey}
                        href={child.href}
                        onClick={() => setOpenDropdown(null)}
                        className={`block px-4 py-2 font-body text-sm transition-colors ${
                          scrolled
                            ? "text-muted-foreground hover:text-primary hover:bg-muted/50"
                            : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                        }`}
                      >
                        {t(child.labelKey)}
                      </a>
                    ))}
                  </div>
                )}
              </div>
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
        <div className="flex flex-col items-center justify-center gap-6 mt-16">
          {navItems.map(item => (
            <div key={item.labelKey} className="text-center">
              {item.children ? (
                <>
                  <span className="label-text text-lg text-muted-foreground mb-3 block">
                    {t(item.labelKey)}
                  </span>
                  <div className="flex flex-col items-center gap-3">
                    {item.children.map(child => (
                      <a
                        key={child.labelKey}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="font-heading text-2xl text-foreground hover:text-primary transition-colors"
                      >
                        {t(child.labelKey)}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <a
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-heading text-3xl text-foreground hover:text-primary transition-colors"
                >
                  {t(item.labelKey)}
                </a>
              )}
            </div>
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
