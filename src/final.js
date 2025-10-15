
const useLenis = () => {
  const lenis = new Lenis({
    lerp: 0.09,
  });

  // Use requestAnimationFrame to continuously update the scroll
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
};

const parallax = () => {
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
            { target: '.hero-heading', from: { yPercent: -50 }, to: { yPercent: -0 } },
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

const banner = () => {
  gsap.registerPlugin(ScrollTrigger);

  const nonSticky = document.querySelectorAll('.non-sticky-card');
  const stickyImg = document.querySelectorAll('.sticky-img');
  const stickyImages = document.querySelector('.sticky-images');
 
  // helper function to show only one img at a time
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

  // init: show first image
  showImage(0);

  // create matchMedia instance
  const mm = gsap.matchMedia();

  mm.add(
    {
      // larger screens
      isDesktop: '(min-width: 768px)',
      // smaller screens
      isMobile: '(max-width: 767px)',
    },
    (context) => {
      let { isDesktop, isMobile } = context.conditions;

      nonSticky.forEach((curr, i) => {
        ScrollTrigger.create({
          trigger: curr,
          start: isDesktop ? 'top 40%' : 'top 60%',
          end: isDesktop ? 'bottom 40%' : 'bottom 60%',
          // start: () => {
          //   const top = innerHeight / 2 - stickyImg[0].getBoundingClientRect().height / 2;
          //   return isDesktop ? `top ${top}` : 'top 60%';
          // },
          // end: () => {
          //   const top = innerHeight / 2 - stickyImg[0].getBoundingClientRect().height / 2;
          //   return isDesktop ? `bottom ${top}` : 'bottom 60%';
          // },
          // markers: true,
          onEnter: () => showImage(i),
          onEnterBack: () => showImage(i),
          onLeaveBack: () => {
            // scrolling up, leaving viewport
            if (nonSticky[i - 1]) showImage(i - 1); // show previous section
          },
        });
      });
    }
  );
};
function marginSize() {
  const stickyImages = document.querySelector('.sticky-images');
  const stickyImg = document.querySelectorAll('.sticky-img');

  if (!stickyImages || !stickyImg || stickyImg.length === 0) return;

  // Wait for images to load if they haven't
  const img = stickyImg[0].querySelector('img');
  if (img && !img.complete) {
    img.addEventListener('load', updateMargin, { once: true });
    return;
  }

  const parentHeight = stickyImages.getBoundingClientRect().height;
  const childHeight = stickyImg[0].getBoundingClientRect().height;
  console.log('🚀 ~ updateMargin ~ parentHeight:', parentHeight);
  console.log('🚀 ~ updateMargin ~ childHeight:', childHeight);

  if (parentHeight === 0 || childHeight === 0) return;

  const distanceFromTop = (parentHeight - childHeight) / 2;

  document.documentElement.style.setProperty('--dynamic-margin-top', `${distanceFromTop}px`);
  document.documentElement.style.setProperty('--dynamic-margin-bottom', `${distanceFromTop}px`);
}

document.addEventListener('DOMContentLoaded', () => {
  useLenis();
  parallax();
  banner();
  marginSize();
});
window.addEventListener('resize', marginSize);
