import { gsap, ScrollTrigger } from 'gsap/all';

export const pallax = () => {
  gsap.registerPlugin(ScrollTrigger);

  const scrollTrigger = {
    trigger: '.home-hero',
    start: 'top top',
    end: 'bottom 20%',
    scrub: 1,
    // markers: true,
  };
  // gsap.set('.hero-earbuds', {
  //   scale: 0.8,
  // });
  const animations = [
    { target: '.mountain-1', from: { yPercent: 25 }, to: { yPercent: 10 } },
    { target: '.mountain-2', from: { yPercent: 10 }, to: { yPercent: 0 } },
    // { target: '.hero-earbuds', from: { yPercent: 25 }, to: { yPercent: 10 } },
    // { target: '.hero-heading', from: { yPercent: 0 }, to: { yPercent: 10 } },
    // { target: '.hero-paragraph', from: { yPercent: 0 }, to: { yPercent: -100 } },
  ];

  animations.forEach(({ target, from, to }) => {
    gsap.fromTo(target, from, { ...to, scrollTrigger });
  });
};

// import { gsap, ScrollTrigger } from 'gsap/all';
// export const pallax = () => {
//   gsap.registerPlugin(ScrollTrigger);
//   const scrollTrigger = {
//     trigger: '.home-hero',
//     start: 'top top',
//     end: 'bottom 20%',
//     scrub: 1,
//     markers: true,
//   };
//   gsap.fromTo(
//     ['.mountain-1'],
//     { yPercent: 10 },
//     {
//       yPercent: 0,
//       scrollTrigger,
//     }
//   );
//   gsap.fromTo(
//     ['.mountain-2'],
//     { yPercent: 10 },
//     {
//       yPercent: 0,
//       scrollTrigger,
//     }
//   );
//   gsap.fromTo(
//     ['.hero-earbuds'],
//     { yPercent: 0 },
//     {
//       yPercent: -20,
//       scrollTrigger,
//     }
//   );
//   gsap.fromTo(
//     ['.hero-heading',],
//     { yPercent: 0 },
//     {
//       yPercent: -100,
//       scrollTrigger,
//     }
//   );
//   gsap.fromTo(
//     ['.hero-paragraph'],
//     { yPercent: 0 },
//     {
//       yPercent: -100,
//       scrollTrigger,
//     }
//   );
// };
