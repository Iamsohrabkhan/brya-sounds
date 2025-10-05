function updateMargin() {
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

export default updateMargin;
