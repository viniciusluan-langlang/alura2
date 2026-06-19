// src/main.js - Vite entry point
import '/css/styles.css';
import sketchFactory from './sketch.js';
import './dashboard.js';
import p5 from 'p5';

// Instantiate p5 with the sketch factory function
const instance = new p5(sketchFactory, document.getElementById('canvas-container'));

// Optionally expose for debugging
window.__p5Instance = instance;
