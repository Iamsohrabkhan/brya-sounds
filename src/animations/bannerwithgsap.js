import gsap, { ScrollTrigger } from 'gsap/all';

const Banner = () => {
  gsap.registerPlugin(ScrollTrigger);

  const nonSticky = document.querySelectorAll('.non-sticky-card');
  const stickyImg = document.querySelectorAll('.sticky-img');
  const stickyImages = document.querySelector('.sticky-images');
  function updateMargin() {
    if (stickyImages && stickyImg.length) {
      // console.log('parent height:', stickyImages.offsetHeight);
      // console.log('child height:', stickyImg[0].offsetHeight);

      const parentHeight = stickyImages.offsetHeight;
      const childHeight = stickyImg[0].offsetHeight;
      const distanceFromTop = parentHeight / 2 - childHeight / 2;

      // console.log('🚀 ~ updateMargin ~ distanceFromTop:', distanceFromTop);

      document.documentElement.style.setProperty('--dynamic-margin-top', `${distanceFromTop}px`);
      document.documentElement.style.setProperty('--dynamic-margin-bottom', `${distanceFromTop}px`);
    }
  }

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
          // markers: true,
          onEnter: () => showImage(i),
          onEnterBack: () => showImage(i),
        });
      });
    }
  );
};
export default Banner;

// import gsap, { ScrollTrigger } from 'gsap/all';

// const Banner = () => {
//   gsap.registerPlugin(ScrollTrigger);

//   const nonSticky = document.querySelectorAll('.non-sticky-card');
//   const stickyImg = document.querySelectorAll('.sticky-img');
//   const stickyImages = document.querySelector('.sticky-images');

//   function updateMargin() {
//     if (stickyImages && stickyImg.length > 0) {
//       const parentHeight = stickyImages.offsetHeight;
//       const childHeight = stickyImg[0].offsetHeight;
//       const distanceFromTop = parentHeight / 2 - childHeight / 2;

//       // set CSS variable on the child element
//       document.documentElement.style.setProperty('--dynamic-margin-top', `${distanceFromTop}px`);
//       document.documentElement.style.setProperty('--dynamic-margin-bottom', `${distanceFromTop}px`);
//     }
//   }

//   window.addEventListener('load', updateMargin);
//   window.addEventListener('resize', updateMargin);

//   const showImage = (index) => {
//     stickyImg.forEach((img, i) => {
//       if (i === index) {
//         img.classList.add('opacity-1');
//         img.classList.remove('opacity-0');
//       } else {
//         img.classList.remove('opacity-1');
//         img.classList.add('opacity-0');
//       }
//     });
//   };

//   showImage(0);

//   const mm = gsap.matchMedia();

//   mm.add(
//     {
//       isDesktop: '(min-width: 768px)',
//       isMobile: '(max-width: 767px)',
//     },
//     (context) => {
//       let { isDesktop, isMobile } = context.conditions;

//       // ✅ dynamic offset function
//       const getOffsetValue = () => {
//         const elementA = document.querySelector('.sticky-img');
//         const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
//         const elementHeight = elementA.offsetHeight;
//         return (viewportHeight - elementHeight) / 2 + 'px';
//       };

//       nonSticky.forEach((curr, i) => {
//         ScrollTrigger.create({
//           trigger: curr,
//           start: () => (isDesktop ? `top ${getOffsetValue()}` : 'top 60%'),
//           end: () => (isDesktop ? `bottom ${getOffsetValue()}` : 'bottom 60%'),
//           markers: true,
//           onEnter: () => showImage(i),
//           onEnterBack: () => showImage(i),
//         });
//       });

//       // ✅ refresh scrolltrigger on resize/orientation change
//       window.addEventListener('resize', () => ScrollTrigger.refresh());
//       window.addEventListener('orientationchange', () => ScrollTrigger.refresh());
//     }
//   );
// };

// export default Banner;
