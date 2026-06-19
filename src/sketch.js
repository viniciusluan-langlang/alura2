// src/sketch.js - p5.js sketch in instance mode
export default function(p) {
  let bgColor = '#0f172a';
  let animating = false;
  let t = 0;
  let canvasEl;

  function createCanvasInContainer() {
    const container = document.getElementById('canvas-container');
    if (!container) return;
    const w = container.clientWidth;
    const h = Math.max(360, container.clientHeight);
    if (canvasEl) canvasEl.remove();
    canvasEl = p.createCanvas(w, h);
    canvasEl.parent('canvas-container');
    p.pixelDensity(1);
  }

  p.setup = function() {
    const container = document.getElementById('canvas-container');
    const w = container ? container.clientWidth : p.windowWidth;
    const h = container ? Math.max(360, container.clientHeight) : p.windowHeight;
    canvasEl = p.createCanvas(w, h);
    canvasEl.parent('canvas-container');
    p.pixelDensity(1);
    p.noLoop();
  };

  p.draw = function() {
    p.clear();
    p.background(bgColor);
    p.noStroke();
    p.fill(255, 255, 255, 12);
    for (let i = 0; i < 10; i++) {
      const r = 60 + i * 40;
      const x = p.width * 0.5 + Math.cos((t + i) / 50) * (i * 8);
      const y = p.height * 0.5 + Math.sin((t + i) / 40) * (i * 6);
      p.ellipse(x, y, r, r);
    }
    if (p.mouseX > 0 && p.mouseY > 0) {
      p.fill(255, 255, 255, 20);
      p.ellipse(p.mouseX, p.mouseY, 30, 30);
    }
    if (animating) {
      t += 1;
    }
  };

  p.windowResized = function() {
    createCanvasInContainer();
    p.redraw();
  };

  // Expose API compatible with dashboard (on window for no-refactor compatibility)
  window.setBgColor = function(color) {
    bgColor = color;
    p.redraw();
  };

  window.toggleAnimation = function(on) {
    animating = !!on;
    if (animating) {
      p.loop();
      p.frameRate(60);
    } else {
      p.noLoop();
      p.redraw();
    }
  };

  window.clearCanvas = function() {
    t = 0;
    p.redraw();
  };
}
