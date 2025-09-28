import gsap, { ScrollTrigger } from 'gsap/all';

const Banner = () => {
  gsap.registerPlugin(ScrollTrigger);

  const nonSticky = document.querySelectorAll('.flex-center');
  const stickyImg = document.querySelectorAll('.sticky-img');

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
      isDesktop: "(min-width: 768px)",
      // smaller screens
      isMobile: "(max-width: 767px)",
    },
    (context) => {
      let { isDesktop, isMobile } = context.conditions;

      nonSticky.forEach((curr, i) => {
        ScrollTrigger.create({
          trigger: curr,
          start: isDesktop ? "top center" : "top 60%",
          end: isDesktop ? "bottom center" : "bottom 60%",
        //   markers: true,
          onEnter: () => showImage(i),
          onEnterBack: () => showImage(i),
        });
      });
    }
  );
};

export default Banner;
