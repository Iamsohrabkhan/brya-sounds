import { gsap, ScrollTrigger } from 'gsap/all';

export const pallax = () => {
  gsap.registerPlugin(ScrollTrigger);

  const scrollTrigger = {
    trigger: '.home-hero',
    start: 'top top',
    end: 'bottom end',
    scrub: 1,
  };
 
  const animations = [
    { target: '.mountain-1', from: { yPercent: 15 }, to: { yPercent: 0 } },
    { target: '.mountain-2', from: { yPercent: 25 }, to: { yPercent: 0 } },
    { target: '.hero-heading', from: { yPercent: 25 }, to: { yPercent: 0 } },
    { target: '.hero-paragraph', from: { yPercent: 100 }, to: { yPercent: 0 } },
  ];

  animations.forEach(({ target, from, to }) => {
    gsap.fromTo(target, from, { ...to, scrollTrigger });
  });
};
