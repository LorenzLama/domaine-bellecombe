import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Play, Pause } from "lucide-react";

const HandDrawnAnimationSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasVideo] = useState(false); // Set to true when real video is added

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <section ref={sectionRef} className="bg-charcoal text-charcoal-foreground section-padding py-20 md:py-28 lg:py-32">
      <div className="max-w-5xl mx-auto">
        {/* Video container */}
        <div className="relative aspect-video bg-foreground/10 overflow-hidden">
          {hasVideo ? (
            <>
              {/* REPLACE VIDEO SRC - Replace the src attribute with your actual video URL */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                src=""
              />
              <button
                onClick={togglePlay}
                className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center border border-charcoal-foreground/30 hover:border-charcoal-foreground/60 transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-charcoal-foreground/70" />
                ) : (
                  <Play className="w-4 h-4 text-charcoal-foreground/70 ml-0.5" />
                )}
              </button>
            </>
          ) : (
            /* Placeholder */
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 border border-charcoal-foreground/30 flex items-center justify-center">
                <Play className="w-8 h-8 text-charcoal-foreground/50 ml-1" />
              </div>
              <span className="label-text text-charcoal-foreground/50">{t("animation.placeholder")}</span>
              {/* Hidden video element for when real video is added */}
              <video ref={videoRef} className="hidden" muted loop playsInline src="" />
            </div>
          )}
        </div>

        <p className="mt-8 text-center font-body text-lg text-charcoal-foreground/70 italic">
          "{t("animation.caption")}"
        </p>
      </div>
    </section>
  );
};

export default HandDrawnAnimationSection;
