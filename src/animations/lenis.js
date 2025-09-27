import Lenis from 'lenis';
const useLenis = () => {
  // Initialize Lenis
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
export default useLenis;
