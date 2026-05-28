let dimensions = 28;
let maxdim = 28;
let paintColor = 255;
let bitmap = new Array(maxdim*maxdim).fill(0);
let cellSize = 10;
let offset = 20;
let colorbutton;
let interpolation = 0.6;

function setup() {
  createCanvas(800, 560);
  noStroke();

  colorButton = createButton('Wechsle Farbe');
  colorButton.mousePressed(toggleColor);

  //Button zum Kopieren des Bitmaps in die Zwischenablage
  copyButton = createButton("Copy to Clipboard");
  copyButton.mousePressed(copyArray);

  saveButton = createButton('Bild speichern');
  saveButton.mousePressed(saveImage);

  tArea = createElement("textarea", "");
  tArea.elt.rows = 4;
  tArea.elt.cols = 35;

  header = createP('Grayscale-Maker | V1.0');
  header.style('font-size', '20px');
  header.style('color', '#800000');
  header.style('font-family', 'sans-serif');
  header.style('font-weight', 'bold');

  header.position(dimensions*cellSize + 45, 0);
  colorButton.position(offset, dimensions*cellSize + 40);
  saveButton.position(dimensions*cellSize - 80, dimensions*cellSize + 40);
  tArea.position(offset, dimensions*cellSize + 105);
  copyButton.position(offset, dimensions*cellSize + 180);
}

function draw() {
  background(220);

  // Draw the bitmap
  for (let i = 0; i < maxdim * maxdim; i++) {
    let x = offset + (i % 28) * cellSize;
    let y = offset + Math.floor(i / 28) * cellSize;
    fill(bitmap[i]); // Graustufenfarbe
    rect(x, y, cellSize, cellSize);
  }

  // Display the bitmap array
  fill(0);
  bmptext = "";
  textSize(8);
  textAlign(CENTER, CENTER);
  for (let i=0; i<dimensions; i++) {
    for (let j=0; j<dimensions; j++) {
      text(bitmap[dimensions*i+j], dimensions*cellSize + 50 + j*15, 50 + offset + i*14);
      bmptext = bmptext + bitmap[dimensions*i+j] + ",";
    }
  }

  img = createImage(dimensions, dimensions);
  img.loadPixels();

  for (let i = 0; i < dimensions*dimensions; i++) {
    let val = bitmap[i]*255; // Von 0-1 zu 0-255 umwandeln
    img.pixels[i*4] = val; // R
    img.pixels[i*4 + 1] = val; // G
    img.pixels[i*4 + 2] = val; // B
    img.pixels[i*4 + 3] = 255; // A
  }
  img.updatePixels();

  offx = dimensions*cellSize - 120;
  offy = dimensions*cellSize + 40;
  image(img, offx, offy);

  bmptext = bmptext.substring(0, bmptext.length - 1);
  tArea.elt.value = bmptext;
}

function mouseDragged() {
  let gridX = Math.floor((mouseX - offset) / cellSize);
  let gridY = Math.floor((mouseY - offset) / cellSize);

  if (gridX < 28 && gridY < 28) {
    let index = gridY * 28 + gridX;
    bitmap[index] = Math.ceil(lerp(bitmap[index], paintColor, interpolation)); // Mischen der Farben für Antialiasing
  }
}
// Funktion zum Umschalten der Farbe
function toggleColor() {
  if (paintColor === 0) {
    paintColor = 255;
    brushSize = 1;
    interpolation = 0.6;
  } else {
    paintColor = 0;
    brushSize = 3;
    interpolation = 1;
  }
}
// Funktion zum Kopieren des Bitmaps in die Zwischenablage
function copyArray() {
  tArea.elt.select();
  document.execCommand('copy');
}
function saveImage() {
  img.save('pixelbild', 'png');
}
