let xNeu = 0.2;
let c = 2.9;
let newPt = [0, xNeu];
let scale = 400;
let margin = 40;
let padding = 20;
let Width = 400;

function setup() {
  createCanvas(980, 500);
  frameRate(10);
  header = createP("Logistic Map | V1.0");
  header.style("font-size", "20px");
  header.style("color", "#800000");
  header.style("font-family", "sans-serif");
  header.style("font-weight", "bold");
  header.position(Width + 100, 0);

  abstr = createP();
  abstr.html(
    "Logistic Equation with path to chaos<br>" +
      "23th of May 2022, by Thomas Joerg, thomas.joerg@jkgweil.de"
  );
  abstr.style("font-size", "14px");
  abstr.style("color", "#000000");
  abstr.style("font-family", "sans-serif");
  abstr.style("font-weight", "normal");
  abstr.position(Width + 100, 35);

  ASlider = createSlider(0, 4, c, 0.01);
  ASlider.position(Width + 100, 120);
  ASlider.style("width", "400px");

  BSlider = createSlider(0, 1, xNeu, 0.01);
  BSlider.position(Width + 100, 170);
  BSlider.style("width", "400px");
}

function draw() {
  cNeu = ASlider.value();
  xNeu = BSlider.value();
  if (xNeu != newPt[1]) {
    newPt = [0, xNeu];
  }
  if (cNeu != c) {
    c = cNeu;
    xNeu = newPt[1];
    newPt = [0, xNeu];
  }
  d = BSlider.value();
  background(220);
  xNeu = c * newPt[newPt.length - 1] * (1 - newPt[newPt.length - 1]);
  newPt.push(xNeu);
  makeCoord(Width, margin, padding, scale);
  makeCoord2(Width, margin, padding, scale);
  drawCoord();
}

function makeCoord(Width, mar, pad, scale) {
  fill(255);
  noStroke();
  rect(mar - pad, mar - pad, Width + 2 * pad, Width + 2 * pad);
  stroke(200);
  strokeWeight(1);
  fill(180);
  textSize(12);
  for (i = 0; i < 1; i = i + 0.1) {
    stroke(200);
    line(mar, mar + i * scale, Width + 2 * pad, mar + i * scale);
    line(mar + i * scale, mar, mar + i * scale, Width + 2 * pad);
    noStroke();
    temp = Math.round(i * 10);
    if (temp % 2 == 0) {
      text((temp / 10).toString(), mar - 6 + i * scale, Width + 12 + 2 * pad);
      text((temp / 10).toString(), mar - 16, Width + mar - i * scale);
    }
  }
  noStroke();
  fill(0, 0, 0);
  textSize(14);
  textStyle(NORMAL);
  text("Constant c: " + cNeu, Width + 100, 115);
  text("Starting value for x: " + newPt[1], Width + 100, 165);
}

function makeCoord2(Width, mar, pad, scale) {
  fill(255);
  noStroke();
  rect(
    Width + 80 + mar - pad,
    Width / 2 + mar - pad,
    Width + 2 * pad,
    Width / 2 + 2 * pad
  );
  stroke(200);
  strokeWeight(1);
  fill(180);
  textSize(12);
  for (i = 0; i < 1; i = i + 0.1) {
    stroke(200);
    line(
      Width + 80 + mar,
      Width / 2 + mar + (i * scale) / 2,
      Width + 80 + Width + 2 * pad,
      Width / 2 + mar + (i * scale) / 2
    );
    noStroke();
    temp = Math.round(i * 10);
    if (temp % 2 == 0) {
      text(
        (temp / 10).toString(),
        Width + 80 + mar - 16,
        Width + mar - (i * scale) / 2
      );
    }
  }
}

function drawCoord() {
  stroke(70);
  strokeWeight(1);
  for (xR = 0; xR < 100; xR++) {
    y0 = c * (xR / 100.0) * (1 - xR / 100.0);
    y1 = c * ((xR + 1) / 100.0) * (1 - (xR + 1) / 100.0);
    line(
      calcScreenX(xR / 100),
      calcScreenY(y0),
      calcScreenX((xR + 1) / 100),
      calcScreenY(y1)
    );
  }

  line(calcScreenX(0), calcScreenY(0), calcScreenX(1), calcScreenY(1));

  stroke(200, 0, 0);
  strokeWeight(1.5);
  anzahl = newPt.length < 133 ? newPt.length : 133;
  for (i = 2; i < anzahl; i++) {
    line(
      calcScreenX(newPt[i - 1]),
      calcScreenY(newPt[i - 1]),
      calcScreenX(newPt[i - 1]),
      calcScreenY(newPt[i])
    );
    line(
      calcScreenX(newPt[i - 1]),
      calcScreenY(newPt[i]),
      calcScreenX(newPt[i]),
      calcScreenY(newPt[i])
    );
  }
  for (j = 1; j < anzahl; j++) {
    line(
      Width + 80 + calcScreenX((3 * j) / Width),
      calcScreenY(newPt[j - 1] / 2),
      Width + 80 + calcScreenX((3 * (j + 1)) / Width),
      calcScreenY(newPt[j] / 2)
    );
  }
}
function calcDataX(ScreenX) {
  return (ScreenX - margin) / scale;
}
function calcDataY(ScreenY) {
  return (Width - ScreenY + margin) / scale;
}
function calcScreenX(DataX) {
  return margin + scale * DataX;
}
function calcScreenY(DataY) {
  return margin + Width - scale * DataY;
}
function drawData() {
  for (i = 0; i < Data.length; i++) {
    if (Data[i][2] == "a") {
      fill(255, 0, 0);
    }
    if (Data[i][2] == "b") {
      fill(0, 0, 255);
    }
    circle(calcScreenX(Data[i][0]), calcScreenY(Data[i][1]), 10);
  }
  for (j = 0; j < newPt.length; j++) {
    if (newPt[j][2] == "a") {
      fill(255, 0, 0);
    }
    if (newPt[j][2] == "b") {
      fill(0, 0, 255);
    }
    rect(calcScreenX(newPt[j][0]) - 4, calcScreenY(newPt[j][1]) - 4, 8, 8);
  }
}
