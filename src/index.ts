// @ts-ignore
// @ts-nocheck
import useLenis from './animations/lenis.js';
import banner from './animations/bannerwithgsap.js';
import marginSize from './animations/marginsize.js';
// import Banner from './animations/bannerwithmotion.js';
import { Snap } from './animations/snap.js';
import { snapto } from './animations/snapto.js';
import { pallax } from './animations/pallax.js';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  useLenis();
  pallax();
  banner();
  marginSize();
});
