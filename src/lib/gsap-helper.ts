import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

export const gsapHelper = {
  registerPlugins() {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    gsap.config({
      autoSleep: 60,
      force3D: true,
      nullTargetWarn: false,
    });

    gsap.defaults({
      ease: 'power2.out',
      duration: 0.5,
    });

    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
    });
  }
};
