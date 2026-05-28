let Data1=[[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 1]];
let Data2=[[0, 0, 0], [1, 0, 1], [0, 1, 1], [1, 1, 1]];
let Data3=[[0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 0]];
let Data4=[[0, 0, 1], [1, 0, 0], [0, 1, 0], [1, 1, 0]];
let TData=[[0, 0], [1, 0], [0, 1], [1, 1]];
let Data = Data1;
//---------------------------------------------------------------
let Distance = [];
let mult = [];
let midV = [0, 0];
let dirV = [0, 0];
//Koordinatenform:lineC[0]*x + lineC[1]*y = lineC[2]
let lineC = [];
//linear Function: y = lFunc[0]*x + lFunc[1] bzw. lFunc[2]
let lFunc = [];
let aktIndex = 0;
let error = 0;
//---------------------------------------------------------------
let mar = 40;
let pad = 20;
let Width = 240;
let scale = Width / 1;
let offset1D = 300;
let y1D = 480;
let aF = "step";
let backprop = false;

function setup() {
  createCanvas(800, 520);
  background(220);
  frameRate(20);
  loop();

  header = createP('Perceptron-Classifier | V1.0');
  header.style('font-size', '20px');
  header.style('color', '#800000');
  header.style('font-family', 'sans-serif');
  header.style('font-weight', 'bold');
  header.position(Width+100, 0);

  abstr = createP();
  abstr.html('Simple Perceptron Demonstration with Perceptron Backpropagation<br>'+'23th of April 2022, by Thomas Joerg, thomas.joerg@jkgweil.de');
  abstr.style('font-size', '14px');
  abstr.style('color', '#000000');
  abstr.style('font-family', 'sans-serif');
  abstr.style('font-weight', 'normal');
  abstr.position(Width+100, 35);

  radio1 = createRadio();
  radio1.option(1, "AND |");
  radio1.option(2, "OR |");
  radio1.option(3, "NAND |");
  radio1.option(4, "NOR");
  radio1.position(20, 310);
  radio1.style("font-size", "14px");
  radio1.style("font-family", "sans-serif");
  radio1.selected("1");
  radio1.attribute('name', 'first');

  changeSet = createButton('change dataset');
  changeSet.position(20, 335);
  changeSet.mousePressed(calcRadio);

  radio2 = createRadio();
  radio2.option(1, "Heaviside Step |");
  radio2.option(2, "ReLU | ");
  radio2.option(3, "Sigmoid");
  radio2.position(20, 380);
  radio2.style("font-size", "14px");
  radio2.style("font-family", "sans-serif");
  radio2.selected("1");
  radio1.attribute('name', 'second');

  changeActF = createButton('change activation function');
  changeActF.position(20, 405);
  changeActF.mousePressed(calcActF);

  radio3 = createRadio();
  radio3.option(1, "Slider");
  radio3.option(2, "Backprop");
  radio3.position(20, 450);
  radio3.style("font-size", "14px");
  radio3.style("font-family", "sans-serif");
  radio3.selected("1");
  radio3.attribute('name', 'third');

  changeBPrp = createButton('change calculation mode');
  changeBPrp.position(20, 475);
  changeBPrp.mousePressed(calcBackprop);

  ASlider = createSlider(-3, 3, 0.5, 0.01);
  ASlider.position(Width + 100, 150);
  ASlider.style('width', '400px');

  BSlider = createSlider(-3, 3, 0.5, 0.01);
  BSlider.position(Width + 100, 200);
  BSlider.style('width', '400px');

  biasSlider = createSlider(-3, 3, -0.5, 0.01);
  biasSlider.position(Width + 100, 250);
  biasSlider.style('width', '400px');

  img = createImg('http://iludis.de/wp-content/uploads/2022/04/neuron2.png');
  img.hide();
}
//---------------------------------------------------------------
function draw() {
  background(220);
  makeGGleichungII();
  makeCoord(Width, mar, pad, scale);
  drawClassArea();
  drawData();
  drawDiscriminatorline();
  calcError();
}
//---------------------------------------------------------------
function calcError() {
  error = 0;

  if (aF=="step") {
    for (i=0; i<4; i++) {
      sum = TData[i][0]*lineC[0] + TData[i][1]*lineC[1] + lineC[2];
      out = (sum>=0) ? 1.0 : 0.0;
      soll = Data[i][2];
      if (backprop == true) {
        lineC[0]=lineC[0] - 0.01*(out-soll)*TData[i][0];
        lineC[1]=lineC[1] - 0.01*(out-soll)*TData[i][1];
        lineC[2]=lineC[2] - 0.01*(out-soll);
        ASlider.value(lineC[0]);
        BSlider.value(lineC[1]);
        biasSlider.value(lineC[2]);
      }
      if (out != soll) {
        error ++;
      }
    }
  }
  if (aF=="relu") {
    for (i=0; i<4; i++) {
      sum = TData[i][0]*lineC[0] + TData[i][1]*lineC[1] + lineC[2];
      out = (sum>=0) ? 3*sum : 0.0;
      soll = Data[i][2];
      if (backprop == true) {
        lineC[0]=lineC[0] - 0.04*(out-soll)*TData[i][0];
        lineC[1]=lineC[1] - 0.04*(out-soll)*TData[i][1];
        lineC[2]=lineC[2] - 0.04*(out-soll);
        ASlider.value(lineC[0]);
        BSlider.value(lineC[1]);
        biasSlider.value(lineC[2]);
      }
      if (out != soll) {
        error = error + (soll-out)*(soll-out);
      }
    }
  }
  if (aF=="sigm") {
    for (i=0; i<4; i++) {
      sum = TData[i][0]*lineC[0] + TData[i][1]*lineC[1] + lineC[2];
      out = 1/(1+exp(-sum));
      soll = Data[i][2];
      if (backprop == true) {
        nodeDelta = (out-soll)*out*(1-out);
        lineC[0]=lineC[0] - 0.04*nodeDelta*TData[i][0];
        lineC[1]=lineC[1] - 0.04*nodeDelta*TData[i][1];
        lineC[2]=lineC[2] - 0.04*nodeDelta;
        ASlider.value(lineC[0]);
        BSlider.value(lineC[1]);
        biasSlider.value(lineC[2]);
      }
      if (out != soll) {
        error = error + (soll-out)*(soll-out);
      }
    }
  }
}
//---------------------------------------------------------------
function makeGGleichungII() {
  if (backprop == false) {
    lineC[0] = ASlider.value();
    lineC[1] = BSlider.value();
    lineC[2] = biasSlider.value();
  }
  lFunc[0] = -lineC[0]/lineC[1];
  lFunc[1] = -lineC[2]/lineC[1];
  midV = [0.5, lFunc[1]+lFunc[0]*0.5];
}
//---------------------------------------------------------------
function drawClassArea() {
  noStroke();
  for (x=1/80; x<=1.0; x=x+1/40) {
    for (y=1/80; y<=1.0; y=y+1/40) {
      summe = x*lineC[0] + y*lineC[1] + lineC[2];
      aktivierung = 0;
      if (summe>0) {
        if (aF == "step") {
          aktivierung = 1;
        }
        if (aF == "relu") {
          aktivierung = summe;
        }
      }
      if (aF == "sigm") {
        aktivierung = 1/(1+exp(-summe));
      }
      fill(255*(1-aktivierung), 255*aktivierung, 0, 64);
      rect(sX(x-1/80), sY(y-1/80), 6, -6);
    }
  }
}
//---------------------------------------------------------------
function drawDiscriminatorline() {
  stroke(0, 0, 0);
  c = [];
  for (i=0; i<1; i=i+2/Width) {
    py = lFunc[1] + lFunc[0]*i;
    if (py>0 && py<1) {
      c.push([i, py]);
    }
  }
  if (c.length>0) {
    line(sX(c[0][0]), sY(c[0][1]), sX(c[c.length-1][0]), sY(c[c.length-1][1]));
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
  noStroke();
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
  noStroke();
  fill(128, 0, 0);
  textStyle(BOLD);
  text("Neuron Weights:", Width + 100, 110);

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
  d = -60;
  image(img, Width + 160+d, 320);
  noStroke();
  fill(0, 0, 0);
  textSize(14);
  textStyle(NORMAL);
  wA = macheZahlenString(lineC[0]);
  text(wA, Width + 205+d, 396);
  text("Weight for Node A (wA): " + wA, Width + 100, 150);

  wB = macheZahlenString(lineC[1]);
  text(wB, Width + 205+d, 472);
  text("Weight for Node B (wB): " + wB, Width + 100, 200);

  bias = macheZahlenString(lineC[2]);
  text(bias, Width + 290+d, 366);
  text("Bias weight: " + bias, Width + 100, 250);

  fill(255);
  stroke(2);
  rect(Width + 416, 412, 95, 30);
  noStroke();
  fill(128, 0, 0);
  textStyle(BOLD);
  errorstring = macheZahlenString(error);
  text("Error:" + errorstring, Width + 425, 432);
}

function macheZahlenString(v) {
  sign = 0;
  v = Math.round(v*1000)/1000
    if (v<0) {
    sign = 1;
    v = -v;
  }
  vStr = str(v);
  if (vStr.length==1) {
    vStr = vStr + ".00"
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
function calcBackprop() {
  switch (radio3.value()) {
  case "1":
    backprop = false;
    break;
  case "2":
    backprop = true;
    break;
  }
}

function calcActF() {
  switch (radio2.value()) {
  case "1":
    aF = "step";
    break;
  case "2":
    aF = "relu";
    break;
  case "3":
    aF = "sigm";
    break;
  }
}
