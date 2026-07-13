import { useEffect, useState } from "react";
import logoMark from "@/assets/logo-mark.png";

/**
 * Full-screen loading overlay.
 * The château illustration is revealed with a left-to-right mask wipe
 * (mimicking a pen drawing the architecture in), followed by the wordmark
 * fading up beneath.
 */
const LoadingScreen = () => {
  const [stage, setStage] = useState<"visible" | "fading" | "hidden">("visible");

  useEffect(() => {
    const minDisplay = 4200;
    const t0 = performance.now();

    const finish = () => {
      const elapsed = performance.now() - t0;
      const wait = Math.max(0, minDisplay - elapsed);
      setTimeout(() => {
        setStage("fading");
        setTimeout(() => setStage("hidden"), 2600);
      }, wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    const safety = setTimeout(finish, 7000);
    return () => clearTimeout(safety);
  }, []);

  useEffect(() => {
    if (stage === "visible") {
      document.body.style.overflow = "hidden";
    } else if (stage === "hidden") {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [stage]);

  if (stage === "hidden") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-all duration-[2600ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
        stage === "fading" ? "opacity-0 scale-[1.02] pointer-events-none" : "opacity-100 scale-100"
      }`}
      aria-hidden={stage !== "visible"}
    >
      <div className="relative flex flex-col items-center -translate-y-20 md:-translate-y-24">
        {/* Logo wipes in from left to right — like being drawn */}
        <div
          className="relative overflow-hidden"
          style={{ animation: "logo-wipe 2.8s cubic-bezier(0.65, 0, 0.35, 1) both" }}
        >
          <img
            src={logoMark}
            alt="Domaine de Bellecombe"
            className="w-[220px] md:w-[320px] h-auto block"
          />
        </div>

        {/* Wordmark */}
        <div
          className="-mt-2 flex flex-col items-center"
          style={{ animation: "wordmark-in 1.4s ease-out 2.2s both" }}
        >
          <h1 className="font-heading leading-none text-lg md:text-3xl tracking-[0.12em] -mr-[0.12em] md:tracking-[0.28em] md:-mr-[0.28em] text-foreground uppercase whitespace-nowrap">
            Domaine de Bellecombe
          </h1>
          <div className="mt-5 flex items-center gap-3">
            <span className="block w-10 h-px bg-foreground/40" />
            <span className="block w-1.5 h-1.5 rotate-45 bg-foreground/60" />
            <span className="block w-10 h-px bg-foreground/40" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
