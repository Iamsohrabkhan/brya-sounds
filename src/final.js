<script src="https://unpkg.com/lenis@1.3.11/dist/lenis.min.js"></script> 
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script> 
<script >
const parallax = () => {
  gsap.registerPlugin(ScrollTrigger);

  const scrollTrigger = {
    trigger: '.home-hero',
    start: 'top top',
    end: 'bottom end',
    scrub: 1,
  };

  const animations = [
    { target: '.mountain-1', from: { yPercent: 25 }, to: { yPercent: 10 } },
    { target: '.mountain-2', from: { yPercent: 10 }, to: { yPercent: 0 } },
  ];

  animations.forEach(({ target, from, to }) => {
    gsap.fromTo(target, from, { ...to, scrollTrigger });
  });
};

const useLenis = () => {
  const lenis = new Lenis({
    lerp: 0.09,
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
};

const banner = () => {
  gsap.registerPlugin(ScrollTrigger);

  const nonSticky = document.querySelectorAll('.non-sticky-card');
  const stickyImg = document.querySelectorAll('.sticky-img');
  const stickyImages = document.querySelector('.sticky-images');
  const maskedBackground = document.querySelector('.masked-bottom');

  function updateMargin() {
    if (stickyImages && stickyImg.length > 0) {
      const parentHeight = stickyImages.offsetHeight;
      const childHeight = stickyImg[0].offsetHeight;
      const distanceFromTop = parentHeight / 2 - childHeight / 2;

      document.documentElement.style.setProperty('--dynamic-margin-top', `${distanceFromTop}px`);
      document.documentElement.style.setProperty('--dynamic-margin-bottom', `${distanceFromTop}px`);
    }
  }

  // run once when page loads
  window.addEventListener('load', updateMargin);

  // run again whenever window is resized
  window.addEventListener('resize', () => {
    updateMargin();
    ScrollTrigger.refresh();
  });

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
          onEnter: () => showImage(i),
          onEnterBack: () => showImage(i),
          //markers: true,
        });
      });
    }
  );
};

document.addEventListener('DOMContentLoaded', () => {
  parallax();
  useLenis();
  banner();
});
</script> 
