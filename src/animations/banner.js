const Banner = () => {
  const nonSticky = document.querySelectorAll('.non-sticky-card');
  const stickyImg = document.querySelectorAll('.sticky-img');

  // Make only the first image visible initially
  stickyImg.forEach((img, i) => {
    if (i === 0) {
      img.classList.add('opacity-1');
      img.classList.remove('opacity-0');
    } else {
      img.classList.add('opacity-0');
    }
  });

  // IntersectionObserver to track elements
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(nonSticky).indexOf(entry.target);

          // Hide all, then show the matching sticky image
          stickyImg.forEach((img, i) => {
            if (i === index) {
              img.classList.add('opacity-1');
              img.classList.remove('opacity-0');
            } else {
              img.classList.remove('opacity-1');
              img.classList.add('opacity-0');
            }
          });
        }
      });
    },
    { threshold: 0.6 }
  );

  // Observe each non-sticky card
  nonSticky.forEach((card) => observer.observe(card));
};

export default Banner;
