import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const logo = logoRef.current;
    const tagline = taglineRef.current;
    const links = linksRef.current;
    const copyright = copyrightRef.current;
    const divider = dividerRef.current;

    if (!section || !logo || !tagline || !links || !copyright || !divider) return;

    const ctx = gsap.context(() => {
      // Entrance animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        }
      });

      // Divider line grows
      tl.from(divider, {
        scaleX: 0,
        duration: 1.2,
        ease: 'expo.out',
      });

      // Logo reveals
      tl.from(logo, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
      }, '-=0.8');

      // Tagline fades in
      tl.from(tagline, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'expo.out',
      }, '-=0.6');

      // Links stagger in
      const linkItems = links.querySelectorAll('a');
      tl.from(linkItems, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'expo.out',
      }, '-=0.4');

      // Copyright
      tl.from(copyright, {
        opacity: 0,
        duration: 0.6,
      }, '-=0.3');

      // Parallax on logo
      gsap.to(logo, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="relative bg-kobo-black py-section overflow-hidden"
    >
      {/* Top divider */}
      <div
        ref={dividerRef}
        className="absolute top-0 left-gutter right-gutter h-px bg-kobo-white/10 origin-left"
      />

      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-kobo-off-black via-kobo-black to-kobo-black opacity-50" />

      <div className="relative z-10 section-content">
        {/* Main content */}
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          {/* Large logo */}
          <div ref={logoRef} className="mb-8">
            <h2 className="font-display text-display-lg font-light tracking-tightest text-kobo-white">
              Kobo
            </h2>
          </div>

          {/* Tagline */}
          <div ref={taglineRef} className="mb-16">
            <p className="font-body text-body-lg text-kobo-white/40">
              The water bottle that knows you.
            </p>
          </div>

          {/* Links */}
          <nav ref={linksRef} className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-16">
            {['Instagram', 'Twitter', 'Press', 'Contact'].map((link) => (
              <a
                key={link}
                href="#"
                className="group relative font-body text-caption uppercase tracking-wider text-kobo-white/40 hover:text-kobo-white transition-colors duration-300"
              >
                <span>{link}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-kobo-white group-hover:w-full transition-all duration-300 ease-expo" />
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div
          ref={copyrightRef}
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-kobo-white/5"
        >
          <p className="font-body text-micro text-kobo-white/20">
            © 2025 Kobo Technologies. All rights reserved.
          </p>
          <p className="font-body text-micro text-kobo-white/20">
            Designed for those who drink intentionally.
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kobo-white/5 to-transparent" />

      {/* Corner markers */}
      <div className="absolute bottom-8 left-8 w-4 h-4 border-l border-b border-kobo-white/5" />
      <div className="absolute bottom-8 right-8 w-4 h-4 border-r border-b border-kobo-white/5" />

      {/* Section indicator */}
      <div className="absolute top-12 right-12 text-kobo-white/20">
        <span className="font-body text-micro uppercase tracking-widest">04/04</span>
      </div>
    </footer>
  );
}
