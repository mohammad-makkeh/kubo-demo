import { useRef, useState } from 'react';
import cn from '../utils/cn';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import waterVideo from '../assets/water-flowing-wide.mp4';

export interface WaterVideoProps {
  className?: string;
}

export default function WaterVideo({ className }: WaterVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const videoTimeline = useRef<gsap.core.Timeline | null>(null);
  const pinTrigger = useRef<ScrollTrigger | null>(null);
  const scrubTrigger = useRef<ScrollTrigger | null>(null);

  const handleLoadedMetadata = () => {
    setIsLoaded(true);
  };

  useGSAP(() => {
    const video = videoRef.current;
    if (!video || !isLoaded || !video.duration) return;

    gsap.set(video, { willChange: 'opacity' });

    videoTimeline.current = gsap.timeline({ defaults: { ease: "none" } });

    videoTimeline.current
      .fromTo(video, { opacity: 0 }, { opacity: 1 }, 0)
      .to(video, {
        currentTime: video.duration,
        duration: video.duration,
      }, 0)
      .to(video, {
        opacity: 0,
        duration: 1,
      }, ">-1");

    pinTrigger.current = ScrollTrigger.create({
      trigger: video,
      start: "top top",
      end: "bottom+=1200vh top",
      pin: true,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
    });

    scrubTrigger.current = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top top",
      end: "bottom+=1200vh top",
      scrub: 2,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      animation: videoTimeline.current,
    });

    return () => {
      pinTrigger.current?.kill();
      scrubTrigger.current?.kill();
      gsap.set(video, { willChange: 'auto' });
    };
  }, { dependencies: [isLoaded] });

  return (
    <>
      <video
        ref={videoRef}
        src={waterVideo}
        onLoadedMetadata={handleLoadedMetadata}
        muted
        playsInline
        className={cn(
          "absolute z-0 inset-0 mx-auto w-full h-auto object-cover opacity-0 pointer-events-none",
          className
        )}
      />
      <div ref={triggerRef} className="absolute z-0 left-0 top-[50vh] w-full h-1" />
    </>
  );
}
