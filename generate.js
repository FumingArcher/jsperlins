let cols, rows;
let scl = 1;
let width = 1800;
let height = 900;
let terrain = [];
let noiseScale = 0.01;
let zoomFactor = 5;
let seed = Math.floor(Math.random()*10000);

let generating = false;

function setup() {
  createCanvas(width, height);
  background(200);
  noiseDetail(10,0.5);
  cols = width / scl;
  rows = height / scl;
  noiseSeed(seed);

  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
}

function generateTerrain() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let noiseValue = noise(xoff / zoomFactor,yoff / zoomFactor);
      terrain[x][y] = noiseValue;
      xoff += noiseScale;
    }
    yoff += noiseScale;
  }
}

function labelAndReplaceIsolatedWater() {
  let label = 1;
  let labels = Array.from(Array(cols), () => Array(rows).fill(0));
  let sizes = {};

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (terrain[x][y] < 0.3 && labels[x][y] === 0) {
        let size = floodFillLabel(x, y, label, labels);
        sizes[label] = size;
        label++;
      }
    }
  }

  
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (labels[x][y] > 0 && sizes[labels[x][y]] < 200) { 
        terrain[x][y] = 0.35; 
      }
    }
  }
}

function floodFillLabel(x, y, label, labels) {
  let queue = [[x, y]];
  let size = 0;

  while (queue.length > 0) {
    let [cx, cy] = queue.shift();
    if (cx < 0 || cx >= cols || cy < 0 || cy >= rows || labels[cx][cy] !== 0 || terrain[cx][cy] >= 0.3) {
      continue;
    }

    labels[cx][cy] = label;
    size++;

    queue.push([cx + 1, cy]);
    queue.push([cx - 1, cy]);
    queue.push([cx, cy + 1]);
    queue.push([cx, cy - 1]);
  }

  return size;
}

function draw() {
  if (generating) {
    generateTerrain();
    loadPixels();
    
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let val = terrain[x][y];
        let colorVal = getColor(val);
        
        fill(colorVal);
        noStroke();
        rect(x * scl, y * scl, scl, scl);
      }
    }
    noLoop();
    generating = false;
  }
}

function getColor(val) {
  let c1, c2;

  if (val < 0.35) {
    c1 = color(0, 0, 255); 
    c2 = color(0, 0, 180); 
    val = map(val, 0, 0.3, 0, 1);
  } else if (val < 0.45) {
    c1 = color(244, 164, 96); 
    c2 = color(255, 204, 153);
    val = map(val, 0.3, 0.4, 0, 1);
  } else if (val < 0.7) {
    c1 = color(34, 139, 34);
    c2 = color(0, 100, 0);
    val = map(val, 0.4, 0.7, 0, 1);
  } else {
    c1 = color(139, 69, 19); 
    c2 = color(205, 133, 63);
    val = map(val, 0.7, 1, 0, 1);
  }
  return lerpColor(c1, c2, val);
}

function generateMap() {
  width = parseInt(document.getElementById('width').value);
  height = parseInt(document.getElementById('height').value);
  scl = parseInt(document.getElementById('scale').value);
  noiseScale = parseFloat(document.getElementById('noiseScale').value);
  zoomFactor = parseFloat(document.getElementById('zoomFactor').value);
  seed = parseInt(document.getElementById('seed').value);
  if(!seed){
    seed = Math.floor(Math.random()*10000);
  }

  let url = `map_display.html?width=${width}&height=${height}&scale=${scl}&noiseScale=${noiseScale}&zoomFactor=${zoomFactor}&seed=${seed}`;

  window.location.href = url;
}