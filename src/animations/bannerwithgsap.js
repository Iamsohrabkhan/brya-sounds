import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Banner = () => {
  gsap.registerPlugin(ScrollTrigger);

  // iOS Safari scroll configuration
  ScrollTrigger.config({
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    ignoreMobileResize: true,
  });

  const nonSticky = document.querySelectorAll('.non-sticky-card');
  const stickyImg = document.querySelectorAll('.sticky-img');
  const stickyImages = document.querySelector('.sticky-images');
  const maskedBackground = document.querySelector('.masked-bottom');

  // Early return if elements don't exist
  if (!stickyImages || stickyImg.length === 0 || nonSticky.length === 0) {
    console.warn('Banner elements not found');
    return;
  }

  function updateMargin() {
    if (stickyImages && stickyImg.length > 0) {
      const parentHeight = stickyImages.offsetHeight;
      const childHeight = stickyImg[0].offsetHeight;
      const distanceFromTop = parentHeight / 2 - childHeight / 2;

      document.documentElement.style.setProperty('--dynamic-margin-top', `${distanceFromTop}px`);
      document.documentElement.style.setProperty('--dynamic-margin-bottom', `${distanceFromTop}px`);
    }
  }

  // Helper function to show only one img at a time
  const showImage = (index) => {
    stickyImg.forEach((img, i) => {
      if (i === index) {
        img.classList.add('opacity-1');
        img.classList.remove('opacity-0');
      } else {
        img.classList.remove('opacity-1');
        img.classList.add('opacity-0');
      }
    });
  };

  // Initialize
  showImage(0);
  updateMargin();

  // Debounced resize handler for better iOS performance
  let resizeTimer;
  const handleResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateMargin();
      ScrollTrigger.refresh();
    }, 250);
  };

  window.addEventListener('resize', handleResize, { passive: true });

  // iOS specific: refresh on orientation change
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      updateMargin();
      ScrollTrigger.refresh();
    }, 200);
  });

  // Create matchMedia instance
  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: '(min-width: 768px)',
      isMobile: '(max-width: 767px)',
    },
    (context) => {
      let { isDesktop } = context.conditions;

      nonSticky.forEach((curr, i) => {
        ScrollTrigger.create({
          trigger: curr,
          start: () => {
            const top = window.innerHeight / 2 - stickyImg[0].getBoundingClientRect().height / 2;
            return isDesktop ? `top ${top}` : 'top 60%';
          },
          end: () => {
            const top = window.innerHeight / 2 - stickyImg[0].getBoundingClientRect().height / 2;
            return isDesktop ? `bottom ${top}` : 'bottom 60%';
          },
          markers: true,
          invalidateOnRefresh: true,
          onEnter: () => showImage(i),
          onEnterBack: () => showImage(i),
        });
      });
    }
  );

  // Initial refresh for iOS (after short delay)
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
};

export default Banner;
