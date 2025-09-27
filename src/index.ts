// @ts-ignore
// @ts-nocheck
import useLenis from './animations/lenis.js';
import banner from './animations/banner.js';
import { Snap } from './animations/snap.js';
import { snapto } from './animations/snapto.js';
import { pallax } from './animations/pallax.js';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  useLenis();
  banner();
  // Snap();
  // snapto();
  pallax();

  const header = document.querySelector('header');

  if (header) {
    const headerHeight = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
  }
});
