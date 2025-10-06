import { gsap, ScrollTrigger } from 'gsap/all';

export const parallax = () => {
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  mm.add(
    {
      // Define breakpoints
      isDesktop: '(min-width: 768px)',
      isMobile: '(max-width: 767px)',
    },
    (context) => {
      // Access which condition is active
      const { isDesktop, isMobile } = context.conditions;

      // Shared ScrollTrigger setup
      const scrollTrigger = {
        trigger: '.home-hero',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        // markers:true
      };

      // Define animations per breakpoint
      const animations = isDesktop
        ? [
            { target: '.mountain-1', from: { yPercent: 15 }, to: { yPercent: 0 } },
            { target: '.mountain-2', from: { yPercent: 25 }, to: { yPercent: 0 } },
            { target: '.hero-heading', from: { yPercent: 25 }, to: { yPercent: 0 } },
          ]
        : [
            { target: '.mountain-1', from: { yPercent: 25 }, to: { yPercent: 15 } },
            { target: '.mountain-2', from: { yPercent: 50 }, to: { yPercent: 0 } },
            { target: '.hero-heading', from: { yPercent: 15 }, to: { yPercent: 0 } },
          ];

      // Create the tweens
      const tweens = animations.map(({ target, from, to }) =>
        gsap.fromTo(target, from, { ...to, scrollTrigger })
      );

      // Cleanup when conditions change
      return () => {
        tweens.forEach((tween) => tween.scrollTrigger?.kill());
        gsap.killTweensOf(animations.map((a) => a.target));
      };
    }
  );
};
