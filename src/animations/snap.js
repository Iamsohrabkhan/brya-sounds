import { gsap, ScrollTrigger } from 'gsap/all';
export const Snap = () => {
  gsap.registerPlugin(ScrollTrigger);

  let iteration = 0;
  const time = 2,
    cards = gsap.utils.toArray('.snap'),
    totalDuration = cards.length,
    spacing = 1,
    snap = gsap.utils.snap(spacing);

  //
  const animation = gsap
    .timeline({
      paused: true,
      defaults: { ease: 'none' },
    })
    .to('#__page', {
      yPercent: -100,
      duration: totalDuration,
      immediateRender: false,
    });
  //
  const scrub = gsap.to(animation, {
    totalTime: 0,
    duration: time,
    ease: 'power2',
    paused: true,
  });

  ScrollTrigger.create({
    trigger: '#__page',
    start: 'top top',
    pin: '#__page',
    onUpdate: (self) => {
      scrub.vars.totalTime = snap((iteration + self.progress) * animation.duration());
      scrub.invalidate().restart();
    },
  });
};
