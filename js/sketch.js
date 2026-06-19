// sketch.js - p5.js sketch with simple optimized rendering
let canvas;
let bgColor = '#0f172a';
let animating = false;
let t = 0;

function createCanvasInContainer(){
  const container = document.getElementById('canvas-container');
  const w = container.clientWidth;
  const h = Math.max(360, container.clientHeight);
  if(canvas){
    canvas.remove();
  }
  canvas = createCanvas(w, h);
  canvas.parent('canvas-container');
  pixelDensity(1);
}

function setup(){
  // create a temporary canvas; actual size set in createCanvasInContainer
  const container = document.getElementById('canvas-container');
  const w = container ? container.clientWidth : windowWidth;
  const h = container ? Math.max(360, container.clientHeight) : windowHeight;
  canvas = createCanvas(w,h);
  canvas.parent('canvas-container');
  noLoop(); // optimized: draw only on demand
}

function draw(){
  clear();
  background(bgColor);
  // low-cost procedural visuals
  noStroke();
  fill(255, 255, 255, 12);
  for(let i=0;i<10;i++){
    const r = 60 + i * 40;
    const x = width * 0.5 + Math.cos((t + i)/50) * (i*8);
    const y = height * 0.5 + Math.sin((t + i)/40) * (i*6);
    ellipse(x, y, r, r);
  }

  // interactive cursor highlight
  if(mouseX > 0 && mouseY > 0){
    fill(255,255,255,20);
    ellipse(mouseX, mouseY, 30, 30);
  }

  if(animating){
    t += 1;
  }
}

function windowResized(){
  // responsive canvas
  createCanvasInContainer();
  redraw();
}

// Public API for dashboard
window.setBgColor = function(color){
  bgColor = color;
  redraw();
}

window.toggleAnimation = function(on){
  animating = !!on;
  if(animating){
    loop();
    frameRate(60);
  } else {
    noLoop();
    redraw();
  }
}

window.clearCanvas = function(){
  t = 0;
  redraw();
}
