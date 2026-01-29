import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

export const gsapHelper = {
  registerPlugins() {
    gsap.registerPlugin(ScrollTrigger, SplitText);
  }
};
