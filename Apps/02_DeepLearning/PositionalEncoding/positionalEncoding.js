//Dies ist ein Satz mit insgesamt acht Wörtern
let inp, button;
let gridX, gridY = 0;
let words = [];
let posEncodings = [];
let d = 50; // dimension of the embedding vector
let d_alt = 1;
let sentence = "";
let barWidth = (800 - 40) / d;
let barHeightFactor = 600 / 5;
let img;

function setup() {
  createCanvas(800, 600);
  frameRate(20);
  background(220);
  
  header = createP("Positional Encodings | V1.0");
  header.style("font-size", "20px");
  header.style("color", "#800000");
  header.style("font-family", "sans-serif");
  header.style("font-weight", "bold");
  header.position(20, 0);

  inp = createInput();
  inp.position(20, 80);
  inp.size(640);
  inp.value("Dies ist ein Satz mit insgesamt acht Wörtern");

  button = createButton("submit");
  button.position(inp.x + inp.width, 80);
  button.mousePressed(positionalEncoding);

  ASlider = createSlider(10, 512, d, 1);
  ASlider.position(20, 150);
  ASlider.style("width", "251px");
  
  img = createImg("vashwani.png");
  img.hide();
}

function positionalEncoding() {
  sentence = inp.value();
  words = sentence.split(/[.\s\?\!\:\;\,]+/);
  if (words.length > 8) {
    words.splice(7, words.length - 8);
  }
  posEncodings = words.map((word, pos) => {
    let posEncoding = new Array(d);
    for (let i = 0; i < d; i++) {
      posEncoding[i] = i % 2 === 0 ? Math.sin(pos / Math.pow(10000, (2 * i) / d)) : Math.cos(pos / Math.pow(10000, (2 * i) / d));
    }
    return posEncoding;
  }
  );
}

function draw() {
  background(220);
  image(img, 430, 120, img.width/1.2, img.height/1.2);
  d = ASlider.value();
  if (d_alt != d) {
    positionalEncoding();
  }

  noStroke();
  barWidth = (width - 40) / d;
  barHeightFactor = height / (5 * words.length);
  for (let pos = 0; pos < words.length; pos++) {
    for (let i = 0; i < d; i++) {
      let x = 20 + i * barWidth;
      let y = pos * 50 + 210;
      fill((posEncodings[pos][i] + 1) * 128);
      rect(x, y, barWidth, 30);
    }
  }
  fill(0, 0, 0);
  textSize(14);
  textStyle(NORMAL);
  textAlign(LEFT);
  text("Gib einen Satz mit maximal 8 Wörtern ein:", 20, 70);
  text("d          : Dimensionalität Embedding Vektor: " + d, 20, 144);
  text("model", 28, 148);
  for (let pos = 0; pos < words.length; pos++) {
    let y = pos * 50 + 205;
    text("pos = " + pos + ": Positional Encoding für das Wort '" + words[pos] + "':", 20, y);
  }
  if (mouseIsPressed) {
    gridX = Math.floor((mouseX - 20) / barWidth);
    gridY = Math.floor((mouseY - 210) / 50);
    if (gridX > -1 && gridY > -1 && gridX < d && gridY < words.length) {

      textSize(14);
      textStyle(BOLD);
      textAlign(LEFT);
      if (mouseX<655) {
        x_koord = mouseX;
      } else {
        x_koord = mouseX-145;
      }
      posWert = Math.round(1000*posEncodings[gridY][gridX])/1000;
      fill(255, 255, 128);
      rect(x_koord, mouseY-15, 148, 20);
      fill(0, 0, 0);
      text("Index i:" + gridX + ", Wert: " + posWert, x_koord+5, mouseY-10, 10000);
    }
  }
  d_alt = d;
}

function mouseReleased() {
  gridX = gridY = -1;
}
