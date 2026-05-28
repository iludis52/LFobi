let Data1=[[0.1, 0.1, 0], [0.9, 0.1, 1], [0.1, 0.9, 1], [0.9, 0.9, 0]];
let Data2=[[0.1, 0.1, 1], [0.9, 0.1, 0], [0.1, 0.9, 0], [0.9, 0.9, 1]];
let Data3=[[0.5, 0.1, 1], [0.5, 0.9, 1], [0.1, 0.5, 0], [0.9, 0.5, 0]];
let Data4=[[0.5, 0.4, 1], [0.5, 0.6, 1], [0.1, 0.5, 0], [0.9, 0.5, 0]];
let Data = Data1;
let pData = [0, 0, 0, 0];
//---------------------------------------------------------------
let w2_11=1;
let b2_1=0;

let w2_12=1;
let w2_22=1;
let b2_2=0;

let w2_23=1;
let b2_3=0;

let w3_11=1;
let w3_21=1;
let w3_31=1;
let b3_1=0;
let error = 0;
//---------------------------------------------------------------
let mar = 40;
let pad = 20;
let Width = 240;
let scale = Width / 1;
let lr = 0.1;
let aF = "sigm";

function setup() {
  createCanvas(800, 600);
  background(220);
  frameRate(25);

  header = createP('Neural Net alternative version| V1.0');
  header.style('font-size', '20px');
  header.style('color', '#800000');
  header.style('font-family', 'sans-serif');
  header.style('font-weight', 'bold');
  header.position(Width+100, 0);

  abstr = createP();
  abstr.html('Neural Net with Sigmoid Gradient-Decent Backpropagation<br>'+'1st of May 2022, by Thomas Joerg, thomas.joerg@jkgweil.de');
  abstr.style('font-size', '14px');
  abstr.style('color', '#000000');
  abstr.style('font-family', 'sans-serif');
  abstr.style('font-weight', 'normal');
  abstr.position(Width+100, 35);

  radio1 = createRadio();
  radio1.option(1, "XOR |");
  radio1.option(2, "XNOR |");
  radio1.option(3, "Cross |");
  radio1.option(4, "narrow Cross");
  radio1.position(20, 310);
  radio1.style("font-size", "14px");
  radio1.style("font-family", "sans-serif");
  radio1.selected("1");
  radio1.attribute('name', 'first');

  changeSet = createButton('change dataset');
  changeSet.position(20, 335);
  changeSet.mousePressed(calcRadio);

  changeActF = createButton('Randomize Weights');
  changeActF.position(20, 455);
  changeActF.mousePressed(randomizeWeights);

  ASlider = createSlider(0.05, 0.5, 0.1, 0.05);
  ASlider.position(20, 400);
  ASlider.style('width', '280px');

  img = createImg('http://iludis.de/wp-content/uploads/2022/05/XOR_Perceptron2.png');
  img.hide();

  imgdice = createImg('http://iludis.de/wp-content/uploads/2022/05/dice.png');
  imgdice.hide();

  tArea = createElement("textarea", "");
  tArea.elt.rows = 7;
  tArea.elt.cols = 45;
  tArea.position(Width + 100, 460);

  randomizeWeights();
}
//---------------------------------------------------------------
function draw() {
  background(220);
  lr = ASlider.value();
  makeCoord(Width, mar, pad, scale);
  drawClassArea();
  drawData();
  calcError();
  macheText();
  makeTable();
}
//---------------------------------------------------------------
function calcError() {
  error = 0;
  for (ep=0; ep<100; ep++) {
    for (i=0; i<4; i++) {
      sum2_1 = Data[i][0]*w2_11 + b2_1;
      out2_1 = 1/(1+exp(-sum2_1));

      sum2_2 = Data[i][0]*w2_12 + Data[i][1]*w2_22 + b2_2;
      out2_2 = 1/(1+exp(-sum2_2));

      sum2_3 = Data[i][1]*w2_23 + b2_3;
      out2_3 = 1/(1+exp(-sum2_3));

      sum3_1 = out2_1*w3_11 + out2_2*w3_21 + out2_3*w3_31 + b3_1;
      out3_1 = 1/(1+exp(-sum3_1));
      pData[i]= out3_1;

      soll = Data[i][2];
      n3_1Delta = (out3_1-soll)*out3_1*(1-out3_1);

      w3_11=w3_11 - lr*n3_1Delta*out2_1;
      w3_21=w3_21 - lr*n3_1Delta*out2_2;
      w3_31=w3_31 - lr*n3_1Delta*out2_3;
      b3_1=b3_1 - lr*n3_1Delta;

      n2_1Delta = n3_1Delta*w3_11*out2_1*(1-out2_1);
      w2_11=w2_11-lr*n2_1Delta*Data[i][0];
      b2_1=b2_1-lr*n2_1Delta;

      n2_2Delta = n3_1Delta*w3_21*out2_2*(1-out2_2);
      w2_12=w2_12-lr*n2_2Delta*Data[i][0];
      w2_22=w2_22-lr*n2_2Delta*Data[i][1];
      b2_2=b2_2-lr*n2_2Delta;

      n2_3Delta = n3_1Delta*w3_31*out2_3*(1-out2_3);
      w2_23=w2_23-lr*n2_3Delta*Data[i][1];
      b2_3=b2_3-lr*n2_3Delta;

      error = error + (soll-out3_1)*(soll-out3_1);
    }
  }
  error = error/100;
}
//---------------------------------------------------------------
function drawClassArea() {
  noStroke();
  for (x=1/80; x<=1.0; x=x+1/40) {
    for (y=1/80; y<=1.0; y=y+1/40) {   
      sum2_1 = x*w2_11 + b2_1;
      out2_1 = 1/(1+exp(-sum2_1));

      sum2_2 = x*w2_12 + y*w2_22 + b2_2;
      out2_2 = 1/(1+exp(-sum2_2));

      sum2_3 = y*w2_23 + b2_3;
      out2_3 = 1/(1+exp(-sum2_3));

      sum3_1 = out2_1*w3_11 + out2_2*w3_21 + out2_3*w3_31 + b3_1;
      out3_1 = 1/(1+exp(-sum3_1));

      fill(255*(1-out3_1), 255*out3_1, 0, 130);
      rect(sX(x-1/80), sY(y-1/80), 6, -6);
    }
  }
}
//---------------------------------------------------------------
function sX(DataX) {
  return mar + scale * DataX;
}
function sY(DataY) {
  return mar + Width - scale * DataY;
}
//---------------------------------------------------------------
function drawData() {
  stroke(1);
  for (i = 0; i < Data.length; i++) {
    if (Data[i][2] == 0) {
      fill(255, 0, 0);
    }
    if (Data[i][2] == 1) {
      fill(0, 255, 0);
    }
    circle(sX(Data[i][0]), sY(Data[i][1]), 15);
  }
}
//---------------------------------------------------------------
function makeCoord(Width, mar, pad, scale) {

  fill(255);
  rect(mar - pad, mar - pad, Width + 2 * pad, Width + 2 * pad);
  stroke(200);
  strokeWeight(1);
  fill(180);
  textSize(12);
  for (i = 0; i < 1; i=i+0.1) {
    stroke(200);
    line(mar, mar + i * scale, Width + 2 * pad, mar + i * scale);
    line(mar + i * scale, mar, mar + i * scale, Width + 2 * pad);
    noStroke();
    temp = Math.round(i*10);
    if (temp % 2 == 0) {
      text((temp/10).toString(), mar - 6 + i * scale, Width + 12 + 2 * pad);
      text((temp/10).toString(), mar - 16, Width + mar - i * scale);
    }
  }
}
//---------------------------------------------------------------
function macheText() {
  imageX = Width + 100;
  imageY = 115;
  image(img, imageX, imageY);
  image(imgdice, 155, 445);
  noStroke();

  textSize(14);
  textStyle(NORMAL);
  fill(128, 0, 0);
  text(macheZahlenString(w3_11), imageX + 200, imageY + 85);
  text(macheZahlenString(w3_21), imageX + 200, imageY + 142);
  text(macheZahlenString(w3_31), imageX + 200, imageY + 200);
  text(macheZahlenString(b3_1), imageX + 274, imageY + 85);

  fill(0, 128, 0);
  text(macheZahlenString(w2_11), imageX + 62, imageY + 52);
  text(macheZahlenString(b2_1), imageX + 126, imageY - 5);
  
  fill(128, 128, 0);
  text(macheZahlenString(w2_12), imageX + 22, imageY + 115);
  text(macheZahlenString(w2_22), imageX + 22, imageY + 210);
  text(macheZahlenString(b2_2), imageX + 22, imageY + 160);

  fill(0, 0, 128);
  text(macheZahlenString(w2_23), imageX + 60, imageY + 270);
  text(macheZahlenString(b2_3), imageX + 126, imageY + 328);

  textStyle(BOLD);
  fill(128, 0, 0);
  text("Error:" + macheZahlenString(error), imageX + 350, imageY + 145);

  text("learning rate: " + lr, 20, 390);
}
function makeTable() {
  tArea.elt.value = "Input A | Input B | Target Out | Predicted Out" + "\n";
  tArea.elt.value += "----------------------------------------------" + "\n";
  for (i=0; i<4; i++) {
    tArea.elt.value += "   " + Data[i][0] +  "      " + Data[i][1] + "         " + Data[i][2] + "           " + Math.round(100*pData[i])/100+ "\n";
  }
}
//---------------------------------------------------------------
function macheZahlenString(v) {
  sign = 0;
  v = Math.round(v*100)/100
    if (v<0) {
    sign = 1;
    v = -v;
  }
  vStr = str(v);
  if (vStr.length==1) {
    vStr = vStr + ".0"
  }
  if (vStr.length==3) {
    vStr = vStr + "0"
  }
  if (sign==1) {
    vStr = "-" + vStr
  }
  if (sign==0) {
    vStr = " " + vStr
  }
  return vStr;
}
//---------------------------------------------------------------
function calcRadio() {
  switch (radio1.value()) {
  case "1":
    Data = Data1;
    break;
  case "2":
    Data = Data2;
    break;
  case "3":
    Data = Data3;
    break;
  case "4":
    Data = Data4;
    break;
  }
}
//---------------------------------------------------------------
function calcActF() {
  switch (radio2.value()) {
  case "2":
    aF = "relu";
    break;
  case "3":
    aF = "sigm";
    break;
  }
}
//---------------------------------------------------------------
function randomizeWeights() {
  w2_11=random(-0.99, 0.99);
  b2_1=random(-0.99, 0.99);

  w2_12=random(-0.99, 0.99);
  w2_22=random(-0.99, 0.99);
  b2_2=random(-0.99, 0.99);

  w2_23=random(-0.99, 0.99);
  b2_3=random(-0.99, 0.99);

  w3_11=random(-0.99, 0.99);
  w3_21=random(-0.99, 0.99);
  w3_31=random(-0.99, 0.99);
  b3_1=random(-0.99, 0.99);
}
