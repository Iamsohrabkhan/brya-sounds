// @ts-ignore
// @ts-nocheck
import useLenis from './animations/lenis.js';
import banner from './animations/bannerwithgsap.js';
import { Snap } from './animations/snap.js';
import { snapto } from './animations/snapto.js';
import { pallax } from './animations/pallax.js';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  pallax();
  useLenis();
  banner();
  // Snap();
  // snapto();

  const header = document.querySelector('header');

  if (header) {
    const headerHeight = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
  }
});
