let dimensions = 4;
let maxdim = 14;
let bitmap = new Array(maxdim*maxdim).fill(0);
let cellSize = 30;
let offset = 20;

function setup() {
  createCanvas(800, 560);
  noStroke();
  //Button zum Kopieren des Bitmaps in die Zwischenablage
  copyButton = createButton("Copy to Clipboard");
  copyButton.mousePressed(copyArray);

  saveButton = createButton('Bild speichern');
  saveButton.mousePressed(saveImage);

  ASlider = createSlider(4, maxdim, dimensions, 1);
  ASlider.position(offset, 520);
  ASlider.style("width", "200px");

  tArea = createElement("textarea", "");
  tArea.elt.rows = 10;
  tArea.elt.cols = 40;

  header = createP('Bitmap-Maker | V1.0');
  header.style('font-size', '20px');
  header.style('color', '#800000');
  header.style('font-family', 'sans-serif');
  header.style('font-weight', 'bold');
}

function draw() {
  dimensions = ASlider.value();
  copyButton.position(dimensions*cellSize + 45, dimensions * 20 + 240);
  saveButton.position(dimensions*cellSize - 80, dimensions*cellSize + 40);
  tArea.position( dimensions*cellSize + 45, dimensions * 20 + 70);
  header.position(dimensions*cellSize + 45, 0);
  background(220);

  // Draw the bitmap
  for (let i = 0; i < dimensions*dimensions; i++) {
    let x = (i % dimensions) * cellSize;
    let y = Math.floor(i / dimensions) * cellSize;

    if (bitmap[i] === 0) {
      fill(0); // Black for 0
    } else {
      fill(255); // White for 1
    }
    rect(x + offset, y + offset, cellSize, cellSize);
  }

  // Display the bitmap array
  fill(0);
  bmptext = "";
  textSize(Math.ceil(cellSize/2));
  textAlign(CENTER, CENTER);
  for (let i=0; i<dimensions; i++) {
    for (let j=0; j<dimensions; j++) {
      text(bitmap[dimensions*i+j], dimensions*cellSize + 50 + j*20, 50 + offset + i*20);
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
  offx = dimensions*cellSize - 100;
  offy = dimensions*cellSize + 44;
  image(img, offx, offy);

  bmptext = bmptext.substring(0, bmptext.length - 1);
  tArea.elt.value = bmptext;
  sliderstring = "Pixeldimensionen: " + dimensions + " x " + dimensions + " px";
  textAlign(LEFT);
  text(sliderstring, offset + 5, 510);
}

function mousePressed() {
  let gridX = Math.floor((mouseX - offset) / cellSize);
  let gridY = Math.floor((mouseY - offset) / cellSize);

  if (gridX < dimensions && gridY < dimensions) {
    let index = gridY * dimensions + gridX;
    bitmap[index] = bitmap[index] === 0 ? 1 : 0; // Toggle value
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
