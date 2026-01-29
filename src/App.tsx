import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Preloader, Hero, Concept, Footer } from './components';
import BottleScene from './components/BottleScene';
import WaterVideo from './components/WaterVideo';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Custom smooth scroll with Lenis
function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // GSAP ticker for Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);
}

// Noise overlay
function NoiseOverlay() {
  return <div className="noise-overlay" aria-hidden="true" />;
}

// Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const [isBottleHorizontal, setIsBottleHorizontal] = useState(false);


  // Initialize smooth scroll
  useSmoothScroll();

  // Handle preloader complete
  const handlePreloadComplete = () => {
    setIsLoading(false);

    setTimeout(() => {
      setIsReady(true);
      ScrollTrigger.refresh();
    }, 100);
  };

  // Entrance animation for main content
  useLayoutEffect(() => {
    if (!isReady || !mainRef.current) return;

    // Ensure visibility then animate
    gsap.set(mainRef.current, { opacity: 1 });

    const ctx = gsap.context(() => {
      gsap.from(mainRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      });
    });

    return () => ctx.revert();
  }, [isReady]);

  return (
    <div className="bg-kobo-black text-kobo-white min-h-screen w-full selection:bg-kobo-white selection:text-kobo-black overflow-x-hidden">
      {/* Preloader */}
      {isLoading && <Preloader onComplete={handlePreloadComplete} />}

      {/* Main content */}
      {!isLoading && (
        <>
          {/* Main sections */}
          <main ref={mainRef} className="relative min-h-[500vh]" style={{ opacity: 1 }}>
            <WaterVideo />
            <Hero />
            <BottleScene setBottleHorizontal={setIsBottleHorizontal} />
            <Concept isBottleHorizontal={isBottleHorizontal} />
            {/* <Footer /> */}
          </main>

          {/* Global noise overlay */}
          <NoiseOverlay />
        </>
      )}
    </div>
  );
}

export default App;
