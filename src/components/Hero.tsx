import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import RevealMaskedTextOnScroll from "./RevealMaskedTextOnScroll";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const overlineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subtitle = subtitleRef.current;
    const overline = overlineRef.current;

    if (!section || !headline || !subtitle || !overline) return;

    const split = new SplitText(headline, { type: "chars" });
    const chars = split.chars;

    gsap.set(section, { autoAlpha: 1 });
    gsap.set(chars, { y: 200, opacity: 0 });
    gsap.set(subtitle, { y: 60, opacity: 0 });
    gsap.set(chars[chars.length - 1], { lineHeight: '78%', transformOrigin: "52% 62%" });

    const intro = gsap.timeline({
      defaults: { ease: "expo.out" },
      onComplete: initScroll,
    });

    intro.to(chars, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 1.4,
    }).to(chars[chars.length - 1], {
      rotation: 360,
      duration: 2,
      ease: "elastic.inOut"
    }, ">-0.5").to(subtitle, {
      y: 0,
      opacity: 1,
      duration: 0.5,
    }, ">-1");

    function initScroll() {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        animation: gsap.timeline()
          .to(chars, {
            y: -300,
            opacity: 0,
            stagger: 0.01,
            duration: 0.1,
            ease: "elastic.in",
          }, 0)
          .to(subtitle, {
            opacity: 0,
            duration: 0.2,
            ease: "none",
          }, 0)
          .addLabel("overline-start")
          .to(overline, {
            scale: 2,
            ease: "none",
          }, 0)
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative z-20 min-h-screen flex items-center justify-center invisible"
    >
      <div className="text-center px-gutter max-w-7xl mx-auto">
        <div ref={overlineRef} className="mb-6 flex items-center justify-center gap-4 text-kobo-white/30">
          <span className="w-8 h-px bg-current" />
          <span className="font-body text-xs 2xl:text-lg uppercase tracking-widest">A New Chapter in Hydration</span>
          <span className="w-8 h-px bg-current" />
        </div>
        <h1
          ref={headlineRef}
          className="font-display text-display-xl font-light tracking-tight text-white leading-none"
        >
          Kobo
        </h1>
        <div ref={subtitleRef} className="mt-8">
          <p className="font-display text-display-sm text-white/80">
            The water bottle that knows you.
          </p>
        </div>
        <RevealMaskedTextOnScroll
          start="bottom 10%"
          end="bottom -=40%"
          className="absolute w-[90%] md:w-[65%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-6"
          textClassName="text-4xl"
          text="Meet Kobo, the smart water bottle that thinks ahead—tracking your hydration in real time and adapting to your lifestyle with subtle, futuristic intelligence. Sleek, connected, and effortless, Kobo turns everyday drinking into a smarter habit."
        />
      </div>
    </section>
  );
}
