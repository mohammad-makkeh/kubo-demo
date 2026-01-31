export const SCROLL_DISTANCES = {
  video: '1200vh',
  bottle: '300%',
  hero: '100%',
} as const;

export const DURATIONS = {
  preloader: 2,
  entrance: 1.4,
  transition: 0.5,
  scrub: 1,
  elasticRotation: 2,
} as const;

export const EASINGS = {
  entrance: 'expo.out',
  exit: 'power2.in',
  elastic: 'elastic.inOut',
  scrub: 'none',
  smooth: 'power2.out',
  smoothInOut: 'power2.inOut',
} as const;

export const STAGGER = {
  chars: 0.1,
  charsExit: 0.01,
  lines: 0.2,
} as const;
