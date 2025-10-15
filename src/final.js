
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


//version 2

  let lenis = null;

function createLenis() {
  lenis = new Lenis({
    lerp: 0.09,
  });

  function raf(time) {
    if (!lenis) return;
    lenis.raf(time);
    lenis.rafId = requestAnimationFrame(raf);
  }

  lenis.rafId = requestAnimationFrame(raf);
  window.lenis = lenis;
  document.documentElement.style.overflowY = "auto";
}
 function destroyLenis() {
   if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    ScrollTrigger.clearMatchMedia();
    console.log("ScrollTriggers destroyed");
  }
  if (!lenis) return;
  cancelAnimationFrame(lenis.rafId);
  lenis.destroy();
  lenis = null;
  window.lenis = null;

  // Optional: reset any transforms
  document.documentElement.style.transform = '';
  document.documentElement.style.overflowY = "hidden";
}
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
        end: 'bottom center',
        scrub: 1,
       // markers:true
      };

      // Define animations per breakpoint
      const animations = isDesktop  ? [
            { target: '.mountain-1', from: { yPercent: 20 }, to: { yPercent: 0 } },
            { target: '.mountain-2', from: { yPercent: 25 }, to: { yPercent: 0 } },
            { target: '.hero-heading', from: { yPercent: 25 }, to: { yPercent: 0 } },
         { target: '.hero-background', from: { yPercent: -25 }, to: { yPercent: 0 } },
          ]
        : [
            { target: '.mountain-1', from: { yPercent: 25 }, to: { yPercent: 15 } },
            { target: '.mountain-2', from: { yPercent: 50 }, to: { yPercent: 0 } },
            { target: '.hero-heading', from: { yPercent: -50 }, to: { yPercent: -0 } },
           { target: '.hero-background', from: { yPercent: -10 }, to: { yPercent: -0 } },
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
  
  const cardSize = () => {
  const images = document.querySelectorAll('.banner .sticky-img'),
    nonStickyCard = document.querySelectorAll('.non-sticky-card');
  if (images.length && nonStickyCard.length) {
    const img1Height = images[0].getBoundingClientRect().height,
      img2Height = images[1].getBoundingClientRect().height,
      img3Height = images[2].getBoundingClientRect().height;
    nonStickyCard[0].style.height = `${img1Height}px`;
    nonStickyCard[1].style.height = `${img2Height}px`;
    nonStickyCard[2].style.height = `${img3Height}px`;
  }
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
          trigger: curr, start: isDesktop ? 'top center' : 'top 80%',
          end: isDesktop ? 'bottom center' : 'bottom 80%',
          // markers:true,
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

  if (parentHeight === 0 || childHeight === 0) return;

  const distanceFromTop = (parentHeight - childHeight) / 2;

  document.documentElement.style.setProperty('--dynamic-margin-top', `${distanceFromTop}px`);
  document.documentElement.style.setProperty('--dynamic-margin-bottom', `${distanceFromTop}px`);
}
  
function createScrollSequence(selector, url, frameCount) {
  const canvas = document.querySelector(selector);
  const context = canvas.getContext("2d");
  const images = [];
  const sequence = { frame: 0 };
  const dpr = window.devicePixelRatio || 1;

  const currentFrame = (index) =>
    `${url}${(index + 1).toString().padStart(4, "0")}.webp`;

  // Load all frames
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    img.crossOrigin = "anonymous";
    images.push(img);
  }

  images.reverse(); // optional, remove if you want normal order

  // Resize logic
  const resizeCanvas = () => {
  const container = canvas.parentElement;
  const width = container.offsetWidth;
  const height = width; // keep square
  const currentDpr = window.devicePixelRatio || 1;

  // Set canvas internal resolution
  canvas.width = Math.round(width * currentDpr);
  canvas.height = Math.round(height * currentDpr);
  
  // Set CSS display size
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  render();
};

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Scroll animation using GSAP
  gsap.registerPlugin(ScrollTrigger);
  gsap.to(sequence, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      trigger: canvas.closest(".canvas-container") || canvas,
      start: "bottom 90%",
      end: "bottom center",
      scrub: 0.5,
     // markers: true, // enable for debugging
    },
    onUpdate: render,
  });

  images[0].onload = () => resizeCanvas();

 function render() {
  const img = images[Math.floor(sequence.frame)];
  if (!img || !img.complete || !img.naturalWidth) return;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // Work with CSS dimensions for aspect ratio calculations
  const cssWidth = canvas.offsetWidth;
  const cssHeight = canvas.offsetHeight;

  const imgAspect = img.naturalWidth / img.naturalHeight;
  const canvasAspect = cssWidth / cssHeight;

  let drawWidth, drawHeight, offsetX, offsetY;

  // Contain logic - calculate in CSS space, then scale to canvas space
  if (imgAspect > canvasAspect) {
    drawWidth = cssWidth * dpr;
    drawHeight = (drawWidth / imgAspect);
    offsetX = 0;
    offsetY = (canvasHeight - drawHeight) / 2;
  } else {
    drawHeight = cssHeight * dpr;
    drawWidth = (drawHeight * imgAspect);
    offsetX = (canvasWidth - drawWidth) / 2;
    offsetY = 0;
  }

  // Save context state
  context.save();
  
  // Clear with identity matrix
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  
  // Set high-quality rendering
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  
  // Black background
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvasWidth, canvasHeight);

  // Draw image at exact pixel dimensions
  context.drawImage(
    img,
    0, 0, img.naturalWidth, img.naturalHeight,  // Source dimensions
    Math.round(offsetX), Math.round(offsetY),    // Round to prevent sub-pixel rendering
    Math.round(drawWidth), Math.round(drawHeight) // Round dimensions
  );
  
  // Restore context
  context.restore();
}
}


document.addEventListener('DOMContentLoaded', () => {
  //useLenis();
  createLenis();
  cardSize();
  parallax();
  banner();
  marginSize();
  
const arr = [
  {
    ele: "#yellow-image-sequance",
    url: "https://bryasound.com/wp-content/uploads/2025/10/Untitled-7_",
    frame: 25,
  },
  {
    ele: "#red-image-sequance",
    url: "https://bryasound.com/wp-content/uploads/2025/10/Untitled-10_",
    frame: 25,
  },
];

arr.forEach(({ ele, url, frame }) => {
  createScrollSequence(ele, url, frame);
});

 
  
});
window.addEventListener('resize', ()=>{
  marginSize();
  cardSize();
});
  
  
  

 