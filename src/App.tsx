import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useSmoothScroll } from './hooks/use-smooth-scroll';
import { Preloader, Hero, Concept } from './components';
import BottleScene from './components/bottle-scene';
import WaterVideo from './components/WaterVideo';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const [isBottleHorizontal, setIsBottleHorizontal] = useState(false);

  useSmoothScroll();

  const handlePreloadComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setIsReady(true);
      ScrollTrigger.refresh();
    }, 100);
  };

  useGSAP(() => {
    if (!isReady || !mainRef.current) return;
    gsap.set(mainRef.current, { opacity: 1 });
    gsap.from(mainRef.current, {
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });
  }, { scope: mainRef, dependencies: [isReady] });

  return (
    <div className="bg-kobo-black text-kobo-white min-h-screen w-full selection:bg-kobo-white selection:text-kobo-black overflow-x-hidden">
      {isLoading && <Preloader onComplete={handlePreloadComplete} />}
      {!isLoading && (
        <main ref={mainRef} className="relative min-h-[500vh]" style={{ opacity: 1 }}>
          <WaterVideo />
          <Hero />
          <BottleScene setBottleHorizontal={setIsBottleHorizontal} />
          <Concept isBottleHorizontal={isBottleHorizontal} />
        </main>
      )}
    </div>
  );
}

export default App;
