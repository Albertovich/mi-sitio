/* sketch.js – Nova x p5.js (ondas iridiscentes) */
let t = 0;           // tiempo animación
let paused = false;  // para pausar con click

function setup() {
  const holder = document.getElementById('p5-holder');
  const c = createCanvas(holder.clientWidth, holder.clientHeight);
  c.parent(holder);
  pixelDensity(1);
  noStroke();
}

function windowResized() {
  const holder = document.getElementById('p5-holder');
  if (holder) resizeCanvas(holder.clientWidth, holder.clientHeight);
}

function draw() {
  if (paused) return;
  // Fondo suave que respira
  const c1 = color(124, 92, 255);   // --accent
  const c2 = color(6, 182, 212);    // --accent-2
  for (let y = 0; y < height; y++) {
    const f = y / height;
    const col = lerpColor(c1, c2, 0.5 + 0.5 * sin(TWO_PI*(f + t*0.05)));
    stroke(col);
    line(0, y, width, y);
  }

  // Ondas diagonales con ruido
  noStroke();
  const bands = 36;
  for (let i = 0; i < bands; i++) {
    const a = i / bands;
    const hue = lerpColor(color(255,255,255,40), color(255,255,255,120), 0.5 + 0.5*sin(t*0.8 + a*6.283));
    fill(hue);
    beginShape();
    for (let x = -50; x <= width + 50; x += 12) {
      const n = noise(x*0.002 + a*3.3, t*0.25 + a*1.7);
      const y = map(n, 0, 1, -60, height + 60) + (a-0.5)*40;
      vertex(x, y + (i%2 ? 14 : -14)); // alterna bandas
    }
    for (let x = width + 50; x >= -50; x -= 12) {
      const n = noise(x*0.002 + a*3.3, t*0.25 + a*1.7);
      const y = map(n, 0, 1, -60, height + 60) + (a-0.5)*40;
      vertex(x, y + (i%2 ? -14 : 14));
    }
    endShape(CLOSE);
  }

  // Marco suave para integrarlo con el mockup
  noFill();
  stroke(255, 255, 255, 80);
  strokeWeight(2);
  rect(10, 10, width-20, height-20, 16);

  t += 0.01;
}

// Click para pausar/reanudar
function mousePressed() { paused = !paused; }
