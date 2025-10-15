const stickyImageMobile = () => {
  let mm = gsap.matchMedia();
  mm.add("(max-width: 797px)", () => {
    ScrollTrigger.create({
      trigger: ".banner",
      start: "top top",
      end: "bottom bottom-=50px",
    //   markers: true,
      pin: ".sticky-images",
      pinSpacing: false,
    });
  });
};
stickyImageMobile();
