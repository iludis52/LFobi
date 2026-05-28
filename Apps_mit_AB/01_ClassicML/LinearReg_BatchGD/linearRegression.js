let Data1=[[3.96,5.04,'a'],[7.24,8.92,'a'],[10.2,8.84,'a'],[12.12,12.08,'a'],[15.76,13.04,'a'],[16.64,15.28,'a']];
let Data2=[[3,16,'a'],[18,3,'a'],[3,13,'a'],[18,6,'a']];
let Data3=[[16,12,'a']];
let Data4=[[9.12,11.6,'a'],[7.56,12.24,'a'],[6.48,10.68,'a'],[5.48,9.04,'a'],[6.96,6.64,'a'],[10.52,6.6,'a'],[12.8,5.76,'a'],[15.36,7.92,'a'],[16.64,9.2,'a'],[16.24,10.52,'a'],[15.48,10.68,'a'],[14.56,9.52,'a'],[13.6,8.88,'a'],[13.32,8.56,'a'],[11.44,8.8,'a'],[10,8.72,'a'],[8.64,8.32,'a'],[8.08,8.72,'a'],[8,9.64,'a'],[10.16,9.68,'a'],[12.08,10.4,'a'],[13.6,11.32,'a'],[12.96,12.04,'a'],[11.68,11.68,'a'],[10.52,10.96,'a'],[8.8,10.52,'a'],[8.52,10.8,'a'],[8.6,12.4,'a'],[10.4,12.4,'a'],[11.28,13.32,'a'],[13.76,12.88,'a'],[15.76,11.6,'a'],[18.12,11.72,'a'],[6.96,8.08,'a'],[8,7,'a'],[9.6,7.56,'a'],[11.12,7.48,'a'],[13.24,7.12,'a'],[15.16,6.04,'a'],[12.8,4.72,'a'],[11.36,4.92,'a'],[9.2,5.56,'a']];
let Data5=[[3,13,'a'],[6,12,'a'],[9,11,'a'],[12,10,'a'],[15,9,'a'],[18,8,'a'],[11,14,'a']];
let Data6=[[5.28,6.64,'a'],[4.48,7.4,'a'],[3.68,6.68,'a'],[3.16,3.96,'a'],[4.48,3,'a'],[5.76,3.88,'a'],[6.88,5.04,'a'],[5.32,5.2,'a'],[4.32,4.16,'a'],[3.4,6.04,'a'],[4.32,5.76,'a'],[3.64,4.88,'a'],[5.68,5.68,'a'],[2.68,5.16,'a'],[17.96,18,'a']];
let Data7=[[2.96,10.12,'a'],[17,10.12,'a']];
let Data8=[[1.52,15.12,'a'],[2.52,15.12,'a'],[2.56,14.48,'a'],[2.72,14.28,'a'],[3.32,14.36,'a'],[3.88,14.88,'a'],[4.48,14.48,'a'],[4.6,14.16,'a'],[4.76,13.76,'a'],[4.88,13.04,'a'],[6.72,13.12,'a'],[5.96,13.84,'a'],[5.64,13.84,'a'],[5.72,12.92,'a'],[7.36,12.08,'a'],[8.16,12.56,'a'],[8.64,12.8,'a'],[11.04,12.28,'a'],[10.88,12.12,'a'],[9.72,11.76,'a'],[9.12,11.52,'a'],[11.56,10.56,'a'],[12.6,10.52,'a'],[13.84,10.12,'a'],[14.52,9.48,'a'],[15.2,9.08,'a'],[15.68,8.44,'a'],[17.12,7.44,'a'],[17.76,7.48,'a'],[18.64,7.44,'a'],[19.4,6.88,'a'],[19.08,6.64,'a'],[18.48,6.8,'a'],[16.96,8.08,'a'],[16.12,7.88,'a'],[16.36,8.4,'a'],[15.88,9.04,'a'],[15.2,9.92,'a'],[13.12,10.08,'a'],[11.92,9.84,'a'],[12.04,11.6,'a'],[10.36,11.12,'a'],[9.92,10.96,'a'],[9.88,12.72,'a'],[8.88,12.16,'a'],[8.44,11.92,'a'],[7.2,12.56,'a'],[7.52,12.88,'a'],[7.44,13.52,'a'],[5.68,14.44,'a'],[5.2,14.4,'a'],[4.48,15.12,'a'],[3.48,15.44,'a'],[3.24,15.12,'a'],[2.84,15.44,'a'],[1.88,15.76,'a'],[1.08,15.64,'a'],[0.64,16.16,'a'],[0.48,16.44,'a'],[0.52,15.32,'a'],[0.96,14.48,'a'],[2.2,14.32,'a'],[2.72,13.8,'a'],[3.52,13.6,'a'],[3.92,13.88,'a'],[6.16,12.4,'a'],[6.84,13.96,'a'],[8.12,13.72,'a'],[11.2,11.44,'a'],[10.68,10.32,'a'],[11.28,9.44,'a'],[13.16,9.36,'a'],[13.4,8.76,'a'],[13.6,8.48,'a'],[14.92,8.16,'a'],[15.16,7.92,'a'],[15.72,7.44,'a'],[16.28,7,'a'],[17.16,6.64,'a'],[18.24,6.24,'a'],[17.92,8.28,'a'],[16.68,9.04,'a'],[16.28,10.84,'a'],[14.56,11.24,'a'],[13.72,11.44,'a'],[12.64,11.92,'a'],[12.84,11.12,'a'],[16.16,9.8,'a'],[17.52,9.64,'a'],[17.68,9.16,'a'],[18.24,8.72,'a'],[18.72,9.32,'a'],[18.16,9.68,'a'],[18.92,10.12,'a'],[19.32,9.56,'a'],[19.2,8.68,'a'],[19.04,8.36,'a'],[19.56,7.8,'a']];
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
let epochCurr;
let epochMax;
let stateMachine = 0;
let StochInd = [];
let aktIndex = 0;
let learnrate = 0.01;
let error = [];
let b_gradient;
let m_gradient;
//---------------------------------------------------------------
let mar = 40;
let pad = 20;
let Width = 440;
let scale = Width / 20;
let offset1D = 300;
let y1D = 480;

function setup() {
  createCanvas(1000, 520);
  background(220);
  frameRate(60);

  header = createP('Linear-Regression-Demo | V1.0');
  header.style('font-size', '20px');
  header.style('color', '#800000');
  header.style('font-family', 'sans-serif');
  header.style('font-weight', 'bold');
  header.position(Width+100, 0);

  abstr = createP();
  abstr.html('Simple Linear Regression Algorithm using Batch Gradient Decent<br>'+'2nd of June 2021, by Thomas Joerg, thomas.joerg@jkgweil.de');
  abstr.style('font-size', '14px');
  abstr.style('color', '#000000');
  abstr.style('font-family', 'sans-serif');
  abstr.style('font-weight', 'normal');
  abstr.position(Width+100, 35);

  kSlider = createSlider(1, 20, 5);
  kSlider.position(Width + 100, 120);
  kSlider.style('width', '400px');

  radio1 = createRadio();
  radio1.option(1, "Set1 |");
  radio1.option(2, "Set2 |");
  radio1.option(3, "Set3 |");
  radio1.option(4, "Set4 |");
  radio1.option(5, "Set5 |");
  radio1.option(6, "Set6 |");
  radio1.option(7, "Set7 |");
  radio1.option(8, "Set8");
  radio1.position(Width+100, 170);
  radio1.style("font-size", "14px");
  radio1.style("font-family", "sans-serif");
  radio1.value("1");

  changeSet = createButton('change Dataset / re-initialize current Dataset');
  changeSet.position(Width + 100, 200);
  changeSet.mousePressed(calcRadio);

  tArea = createElement("textarea", "");
  tArea.elt.rows = 4;
  tArea.elt.cols = 53;
  tArea.position(Width + 100, 250);

  makeCoord(Width, mar, pad, scale);
  drawData();
  Initialize();
  drawAllLines();
  stateMachine = 0;
}
//---------------------------------------------------------------
function draw() {
  background(220);
  learnrate = kSlider.value()/2500;
  makeCoord(Width, mar, pad, scale);
  drawData();
  drawAllLines();
  switch (stateMachine) {
  case 0:
    makeStochasticData();
    break;
  case 1:
    makeBatchGradientDescent();
    break;
  case 2:
    increaseEpoch();
    break;
  }
}
//---------------------------------------------------------------
function Initialize() {
  stateMachine = 0;
  epochMax = 400;
  epochCurr = 0;
  lFunc[0] = 1-2*Math.random();
  lFunc[1] = 20*Math.random();
  error=[];
  for(i=0;i<epochMax;i++){
    error.push(0);
  }
  makeGGleichungII();
}
//---------------------------------------------------------------
function increaseEpoch() {
  epochCurr = epochCurr+1;
  if (epochCurr>=epochMax) {
    stateMachine=3;
  } else {
    stateMachine=0;
  }
}
//---------------------------------------------------------------
function makeStochasticData() {
  tempData = [];
  StochInd = [];
  for (i=0; i<Data.length; i++) {
    tempData.push(i);
  }
  for (j=0; j<Data.length; j++) {
    tempIndex = Math.floor(Math.random() * tempData.length);
    StochInd.push(tempData[tempIndex]);
    tempData.splice(tempIndex, 1);
  }
  aktIndex =0;
  stateMachine = 1;
}
//---------------------------------------------------------------
function makeBatchGradientDescent() {
  b_gradient = 0;
  m_gradient = 0;
  for (i=0; i<Data.length; i++) {
    makeLinReg(i, Data.length);
  }
  lFunc[1] = lFunc[1] - (learnrate * b_gradient);
  lFunc[0] = lFunc[0] - (learnrate * m_gradient);
  makeGGleichungII();
  stateMachine = 2;
}
//---------------------------------------------------------------
function makeLinReg(aktIndex, N) {
  x = Data[aktIndex][0];
  y = Data[aktIndex][1];
  error[epochCurr] += (y - (lFunc[0] * x + lFunc[1])) * (y - (lFunc[0] * x + lFunc[1]));
  b_gradient = b_gradient - 20*(2/N) * (y - ((lFunc[0] * x) + lFunc[1]));
  m_gradient = m_gradient - (2/N) * x * (y - ((lFunc[0] * x) + lFunc[1]));
}

//---------------------------------------------------------------
function makeGGleichungII() {
  lineC[1] = 1;
  lineC[0] = -lFunc[0];
  lineC[2] = lFunc[1];

  dirL = Math.sqrt(lineC[0]*lineC[0]+lineC[1]*lineC[1]);
  dirV[1] =-lineC[0]/dirL;
  dirV[0] = lineC[1]/dirL;
  midV = [10, lFunc[1]+lFunc[0]*10];
  makeTextarea();
}
function makeTextarea() {
  tArea.elt.value = "learning rate: " + learnrate +"\n";
  tArea.elt.value += "epoch: " + epochCurr + "  Error: "+ Math.round(error[epochCurr]*100)/100 + "\n";
  tArea.elt.value += "line coordinates: " + Math.round(lineC[0]*100)/100 + "*x + " + Math.round(lineC[1]*100)/100 + "*y = " + Math.round(lineC[2]*100)/100 + "\n";
  tArea.elt.value += "linear function: y = " + Math.round(100*lFunc[0])/100 + "*x + " + Math.round(100*lFunc[1])/100;
}
//---------------------------------------------------------------
function drawAllLines() {
  strokeWeight(1);
  stroke(0, 0, 0);
  makeMarginLine();
  stroke(255, 0, 0);
  noFill();
  stroke(0, 200, 0);
  strokeWeight(3);
  circle(sX(midV[0]), sY(midV[1]), 14);
  for(i=0;i<epochCurr;i++){
    circle(Width+105 + i, 490- 100* error[i]/error[0],1);
  }
}
//---------------------------------------------------------------
function makeMarginLine() {
  c = [];
  for (i=0; i<20; i=i+2/Width) {
    py = lFunc[1] + lFunc[0]*i;
    if (py>0 && py<20) {
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
    if (Data[i][2] == "a") {
      fill(255, 0, 0);
    }
    if (Data[i][2] == "b") {
      fill(0, 0, 255);
    }
    circle(sX(Data[i][0]), sY(Data[i][1]), 10);
  }
}
//---------------------------------------------------------------
function makeCoord(Width, mar, pad, scale) {
  noStroke();
  fill(128, 0, 0);
  textStyle(BOLD);
  text("learning Rate: " + learnrate, Width + 100, 110);
  fill(255);
  rect(mar - pad, mar - pad, Width + 2 * pad, Width + 2 * pad);
  stroke(200);
  strokeWeight(1);
  fill(180);
  textSize(12);
  for (i = 0; i < 1 + Width / scale; i++) {
    stroke(200);
    line(mar, mar + i * scale, Width + 2 * pad, mar + i * scale);
    line(mar + i * scale, mar, mar + i * scale, Width + 2 * pad);
    noStroke();
    if (i % 2 == 0) {
      text(i.toString(), mar - 6 + i * scale, Width + 12 + 2 * pad);
      text(i.toString(), mar - 16, Width + mar - i * scale);
    }
  }
  
  noStroke();
  fill(255,255,255);
  rect(Width + 100, 345, 400, 155);
  fill(128, 0, 0);
  textSize(14);
  textStyle(BOLD);
  text("Error vs. time", Width + 105, 360);
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
  case "5":
    Data = Data5;
    break;
  case "6":
    Data = Data6;
    break;
  case "7":
    Data = Data7;
    break;
  case "8":
    Data = Data8;
    break;
  }
  reInit();
}
function reInit() {
  epochCurr=0;
  epochMax=400;
  stateMachine = 0;
  StochInd = [];
  aktIndex = 0;
  makeCoord(Width, mar, pad, scale);
  drawData();
  Initialize();
  drawAllLines();
  loop();
}
