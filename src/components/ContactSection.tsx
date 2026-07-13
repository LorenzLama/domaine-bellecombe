import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Mail, Phone, MapPin, Copy, Check } from "lucide-react";

const PHONE_DISPLAY = "+41 79 200 66 24";
const PHONE_TEL = "+41792006624";
const EMAIL = "bruce.lamarche@gmail.com";

interface CopyButtonProps {
  active: boolean;
  labelCopy: string;
  labelCopied: string;
  onCopy: () => void;
}

const CopyButton = ({ active, labelCopy, labelCopied, onCopy }: CopyButtonProps) => (
  <button
    type="button"
    onClick={onCopy}
    title={active ? labelCopied : labelCopy}
    aria-label={active ? labelCopied : labelCopy}
    className="w-7 h-7 flex items-center justify-center flex-shrink-0 text-muted-foreground/50 hover:text-foreground transition-colors duration-300"
  >
    {active ? (
      <Check className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
    ) : (
      <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />
    )}
  </button>
);

const ContactSection = () => {
  const { t } = useLanguage();
  const { ref } = useScrollReveal();
  const [copied, setCopied] = useState<"phone" | "email" | null>(null);

  const copy = async (value: string, which: "phone" | "email") => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(value);
      ok = true;
    } catch {
      // Fallback for browsers/contexts where the async Clipboard API is unavailable
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      document.body.removeChild(ta);
    }
    if (!ok) return;
    setCopied(which);
    setTimeout(() => setCopied(c => (c === which ? null : c)), 2000);
  };

  return (
    <section id="contact" className="section-padding section-spacing">
      <div ref={ref} className="reveal max-w-2xl mx-auto text-center">
        <div className="mb-4">
          <span className="label-text text-muted-foreground">{t("contact.title")}</span>
        </div>
        <h2 className="font-heading text-4xl md:text-5xl mb-6 tracking-tight">
          {t("contact.heading")}
        </h2>
        <div className="ornamental-mark justify-center mb-16"><span /></div>

        <h3 className="font-heading text-3xl md:text-4xl tracking-tight mb-14">
          Bruce Lamarche
        </h3>

        <div className="flex flex-col items-center gap-10">
          {/* Phone — icon stacked above; click to call, subtle copy */}
          <div className="flex flex-col items-center gap-4">
            <span className="w-11 h-11 border border-border flex items-center justify-center">
              <Phone className="w-4 h-4 text-foreground/70" strokeWidth={1.5} />
            </span>
            <div className="flex items-center gap-2">
              <a
                href={`tel:${PHONE_TEL}`}
                className="font-body text-base text-foreground/80 hover:text-foreground transition-colors select-all"
              >
                {PHONE_DISPLAY}
              </a>
              <CopyButton
                active={copied === "phone"}
                labelCopy={t("contact.copy")}
                labelCopied={t("contact.copied")}
                onCopy={() => copy(PHONE_DISPLAY, "phone")}
              />
            </div>
          </div>

          {/* Email — icon stacked above; click to write, subtle copy */}
          <div className="flex flex-col items-center gap-4">
            <span className="w-11 h-11 border border-border flex items-center justify-center">
              <Mail className="w-4 h-4 text-foreground/70" strokeWidth={1.5} />
            </span>
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${EMAIL}`}
                className="font-body text-base text-foreground/80 hover:text-foreground transition-colors select-all break-all"
              >
                {EMAIL}
              </a>
              <CopyButton
                active={copied === "email"}
                labelCopy={t("contact.copy")}
                labelCopied={t("contact.copied")}
                onCopy={() => copy(EMAIL, "email")}
              />
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col items-center gap-4">
            <span className="w-11 h-11 border border-border flex items-center justify-center">
              <MapPin className="w-4 h-4 text-foreground/70" strokeWidth={1.5} />
            </span>
            <span className="font-body text-sm text-foreground/75 leading-relaxed">
              Château de Veyrier<br />
              Place de l'Eglise 24<br />
              1255 Veyrier, Suisse
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
