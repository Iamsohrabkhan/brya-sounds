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
