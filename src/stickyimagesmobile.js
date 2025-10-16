const stickyImageMobile = () => {
  let mm = gsap.matchMedia();
  mm.add('(max-width: 797px)', () => {
    ScrollTrigger.create({
      trigger: '.banner',
      start: 'top top',
      end: 'bottom bottom-=50px',
      //   markers: true,
      pin: '.sticky-images',
      pinSpacing: false,
    });
  });
};
const lastBannerzIndex = () => {
  let mm = gsap.matchMedia();
  mm.add('(min-width: 797px)', () => {
    const cards = document.querySelectorAll('.non-sticky-card');
    const stickyImages = document.querySelector('.sticky-images');

    const lastCard = cards[cards.length - 1];
    if (cards.length && stickyImages) {
      ScrollTrigger.create({
        trigger: lastCard,
        start: () => {
          const maskedBackground2 = document
            .querySelectorAll('.masked-background')[1]
            .getBoundingClientRect().height;
          return `top ${maskedBackground2}px`;
        },
        end: () => {
          const maskedBackground2 = document
            .querySelectorAll('.masked-background')[1]
            .getBoundingClientRect().height;
          return `bottom ${maskedBackground2}px`;
        },
        // markers: true,
        onEnter: () => {
          lastCard.classList.add('z-22');
          stickyImages.classList.add('z-22');
        },
        onLeaveBack: () => {
          lastCard.classList.remove('z-22');
          stickyImages.classList.remove('z-22');
        },
      });
    }
    return () => {
      if (cards.length && stickyImages) {
        const lastCard = cards[cards.length - 1];
        lastCard.classList.remove('z-22');
        stickyImages.classList.remove('z-22');
      }
    };
  });
};

function createScrollSequence(selector, url, frameCount) {
  const canvas = document.querySelector(selector);
  // Enable alpha transparency in canvas
  const context = canvas.getContext('2d', { alpha: true });
  const images = [];
  const sequence = { frame: 0 };
  const dpr = window.devicePixelRatio || 1;

  const currentFrame = (index) => `${url}${(index + 1).toString().padStart(4, '0')}.webp`;

  // Load all frames
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    img.crossOrigin = 'anonymous';
    images.push(img);
  }

  images.reverse(); // optional, remove if you want normal order

  // Resize logic
  const resizeCanvas = () => {
    const container = canvas.parentElement;
    const width = container.offsetWidth;
    const height = width; // keep square
    const currentDpr = window.devicePixelRatio || 1;

    canvas.width = Math.round(width * currentDpr);
    canvas.height = Math.round(height * currentDpr);

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    render();
  };

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  gsap.to(sequence, {
    frame: frameCount - 1,
    snap: 'frame',
    ease: 'none',
    scrollTrigger: {
      trigger: canvas.closest('.canvas-container') || canvas,
      start: 'bottom 90%',
      end: 'bottom center',
      scrub: 0.5,
      markers: true,
    },
    onUpdate: render,
  });

  images[0].onload = () => resizeCanvas();
context.clearRect(0, 0, canvas.width, canvas.height);
context.fillStyle = 'rgba(255, 0, 0, 0.2)';
context.fillRect(0, 0, canvas.width, canvas.height);

  function render() {
    const img = images[Math.floor(sequence.frame)];
    if (!img || !img.complete || !img.naturalWidth) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const cssWidth = canvas.offsetWidth;
    const cssHeight = canvas.offsetHeight;

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = cssWidth / cssHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgAspect > canvasAspect) {
      drawWidth = cssWidth * dpr;
      drawHeight = drawWidth / imgAspect;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawHeight = cssHeight * dpr;
      drawWidth = drawHeight * imgAspect;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';

    // Remove the black background fill
    // context.fillStyle = '#000';
    // context.fillRect(0, 0, canvasWidth, canvasHeight);

    context.drawImage(
      img,
      0,
      0,
      img.naturalWidth,
      img.naturalHeight,
      Math.round(offsetX),
      Math.round(offsetY),
      Math.round(drawWidth),
      Math.round(drawHeight)
    );

    context.restore();
  }
}

