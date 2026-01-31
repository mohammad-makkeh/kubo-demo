import cn from "../utils/cn";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export interface ConceptProps {
  isBottleHorizontal: boolean;
}

export default function Concept({ isBottleHorizontal }: ConceptProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalWrapperRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !cardsContainerRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(".concept-card");

    const totalCardsWidth = cards.reduce(
      (acc, card) => acc + card.offsetWidth,
      0
    );

    const scrollDistance = totalCardsWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef?.current?.querySelector(".concept-pin"),
          start: "top top",
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
        .to(cardsContainerRef.current, {
          x: -scrollDistance,
          ease: "none",
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={sectionRef}
      className="relative z-0 min-h-screen overflow-hidden"
    >
      <div className="concept-pin h-screen">
        <h1 className={cn("font-display text-display-md text-center py-8 sticky top-0 z-10 opacity-0", isBottleHorizontal && "opacity-100")}>
          The Concept
        </h1>

        <div ref={horizontalWrapperRef} className="relative h-full">
          <div
            ref={cardsContainerRef}
            className="flex flex-nowrap h-full absolute top-0 left-0"
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="concept-card relative w-screen h-[70vh] flex flex-grow items-center justify-center px-16"
              >
                <div className="relative w-full max-w-4xl h-full flex-grow rounded-3xl overflow-hidden">

                  {/* Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent blur-2xl opacity-60" />

                  {/* Glass */}
                  <div className="relative h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] p-16 flex flex-col justify-between">

                    {/* Eyebrow */}
                    <span className="text-xs uppercase tracking-widest text-white/40">
                      Concept {i + 1}
                    </span>

                    {/* Main content */}
                    <div className="space-y-6">
                      <h2 className="font-display text-6xl font-light text-white leading-tight">
                        Hydration,<br />rethought
                      </h2>

                      <p className="max-w-xl text-lg text-white/60 leading-relaxed">
                        Kobo learns your habits, adapts in real time, and disappears into your routine.
                        No friction. No noise. Just better hydration.
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-white/40 text-sm">
                      <span>Adaptive Intelligence</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
