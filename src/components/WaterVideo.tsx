import { useRef, useState } from 'react';
import cn from '../utils/cn';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import waterVideo from '../assets/water-flowing-wide.mp4';

gsap.registerPlugin(ScrollTrigger);

export interface IWaterVideoProps {
    className?: string;
}

export default function WaterVideo({ className }: IWaterVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);

    const handleLoadedMetadata = () => {
        setIsLoaded(true);
    };

    useGSAP(() => {
        const video = videoRef.current;
        if (!video || !isLoaded || !video.duration) return;

        const timeline = gsap.timeline({ defaults: { ease: "none" } });

        timeline
            .fromTo(
                video,
                { opacity: 0 },
                { opacity: 1 },
                0
            )
            .to(
                video,
                {
                    currentTime: video.duration,
                    duration: video.duration,
                },
                0
            )
            .to(
                video,
                {
                    opacity: 0,
                    duration: 1,
                },
                ">-1"
            );

        ScrollTrigger.create({
            trigger: video,
            start: "top top",
            end: "bottom+=1200vh top",
            pin: true,
        });
        ScrollTrigger.create({
            trigger: triggerRef.current,
            start: "top top",
            end: "bottom+=1200vh top",
            scrub: 1,
            animation: timeline,
        });
    }, { dependencies: [isLoaded] }); // Re-run when video loads

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
            <div ref={triggerRef} className="absolute z-0 left-0 top-[50vh] w-full h-1"></div>
        </>
    );
}