import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

export const snapto = () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const hero = document.querySelector('.home-hero');
  if (!hero) {
    console.warn("⚠️ .home-hero not found");
    return;
  }

  let heroInView = false;

  // Intersection Observer to track hero visibility
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        heroInView = entry.isIntersecting;
      });
    },
    { threshold: 0.9 }
  );

  observer.observe(hero);

  // Function to scroll to target
  const scrollToTarget = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: '#custom-snapped',
      ease: 'power2.inOut',
    });
  };

  // Handle wheel (desktop/trackpad)
  window.addEventListener(
    'wheel',
    (e) => {
      if (heroInView && e.deltaY > 0) {
        scrollToTarget();
      }
    },
    { passive: true }
  );

  // Handle touch (mobile)
  let touchStartY = 0;
  window.addEventListener(
    'touchstart',
    (e) => {
      touchStartY = e.touches[0].clientY;
    },
    { passive: true }
  );

  window.addEventListener(
    'touchend',
    (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      if (heroInView && touchStartY - touchEndY > 50) {
        // user swiped up (scrolling down)
        scrollToTarget();
      }
    },
    { passive: true }
  );
};
