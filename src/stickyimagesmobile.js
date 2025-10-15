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

