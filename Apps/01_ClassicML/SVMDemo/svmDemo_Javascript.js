let Data1=[[6.88, 15.92, 'a'], [4.32, 14.64, 'a'], [2.08, 9.44, 'a'], [7.2, 11.36, 'a'], [10.24, 15.92, 'a'], [6, 13.44, 'a'], [5.4, 9.68, 'a'], [8.52, 12.24, 'a'], [16.64, 6.04, 'b'], [17.32, 9.24, 'b'], [13, 7.32, 'b'], [7.48, 1.68, 'b'], [12.96, 1.84, 'b'], [10.56, 5.16, 'b'], [8.76, 2.84, 'b'], [12.84, 4.24, 'b'], [10.96, 7.2, 'b']];
let Data2=[[11.16, 15.16, "b"], [14.52, 12.12, "b"], [11.36, 11.28, "b"], [3.32, 7.12, "a"], [8.76, 7.76, "a"], [7.84, 3.6, "a"], [7.2, 10.32, "a"]];
let Data3=[[11, 15, 'a'], [14, 12, 'a'], [3, 7, 'b'], [8, 7, 'b'], [7, 3, 'b'], ];
//let Data4=[[11.16, 15.16, 'b'], [14.52, 12.12, 'b'], [11.36, 11.28, 'b'], [3.32, 7.12, 'a'], [8.76, 7.76, 'a'], [7.84, 3.6, 'a'], [7.2, 10.32, 'a'], [11.8, 7.96, 'a'], [19.04, 4.96, 'b']];
let Data4=[[4, 4, 'a'], [4, 16, 'a'], [16, 16, 'b'], [16, 4, 'a']];
let Data5=[[4, 4, 'a'], [4, 16, 'a'], [16, 16, 'b'], [16, 4, 'a'], [10.5, 10.5, 'b']];
let Data6=[[6.4, 10.32, 'a'], [7.52, 9.2, 'a'], [6.04, 8.68, 'a'], [7.36, 6.16, 'a'], [6.76, 4.6, 'a'], [5.52, 3.8, 'a'], [5, 5.44, 'a'], [6.8, 7.2, 'a'], [8.44, 8.24, 'a'], [9.6, 6.4, 'a'], [8.68, 6.8, 'a'], [11.44, 6.88, 'a'], [9.88, 7.8, 'a'], [9.8, 9.52, 'a'], [4.76, 7.8, 'a'], [8.64, 5.24, 'a'], [8.12, 3.64, 'a'], [5.84, 6.4, 'a'], [11.52, 11, 'b'], [14.76, 13.88, 'b'], [11.24, 16.8, 'b'], [12.16, 14.6, 'b'], [10.12, 15.12, 'b'], [12.4, 13.12, 'b'], [15.56, 11.84, 'b'], [17.48, 15, 'b'], [14.84, 16, 'b'], [13.36, 15.16, 'b'], [12.48, 16.36, 'b'], [10, 13.4, 'b'], [13.52, 12.16, 'b'], [11.28, 12.72, 'b'], [14, 14.16, 'b'], [16.08, 13.16, 'b'], [14.32, 11.36, 'b'], [14.44, 8.64, 'b'], [6.96, 13.48, 'b']];
let Data7=[[3.4,9.68,'a'],[5.2,10.24,'a'],[7.44,9.4,'a'],[8.12,11.68,'a'],[11.48,12.64,'a'],[9.72,14.04,'a'],[9.2,16.24,'a'],[7.12,13.52,'a'],[6.16,12.36,'a'],[3.36,12.64,'a'],[2.56,11.6,'a'],[4.16,11.96,'a'],[4.28,14.76,'a'],[7.32,15,'a'],[11.08,15.84,'a'],[11.2,17.92,'a'],[13.6,18.6,'a'],[13.96,19.48,'a'],[14.48,17.76,'a'],[13.44,15.28,'a'],[12.12,17.92,'a'],[12.6,15.52,'a'],[12.28,14.12,'a'],[11.6,14.56,'a'],[6.28,16.92,'a'],[6.56,17.68,'a'],[0.88,13.88,'a'],[1.6,13.16,'a'],[2.04,14.68,'a'],[3.72,15.04,'a'],[8.4,18.64,'a'],[7.48,16.28,'a'],[5.72,15.84,'a'],[5.72,12.76,'a'],[4.48,13.32,'a'],[4.32,8.72,'a'],[3.2,7.36,'a'],[2.2,9.48,'a'],[0.8,10.6,'a'],[0.92,8.8,'a'],[9.96,3.16,'b'],[10.76,4.68,'b'],[12.64,4.4,'b'],[15.6,4.8,'b'],[16.88,6.84,'b'],[17.04,8.4,'b'],[17.28,9.6,'b'],[19.64,7.52,'b'],[18.32,4.76,'b'],[15.96,2.72,'b'],[13.76,1.88,'b'],[9.68,1.08,'b'],[8,1.44,'b'],[8.12,2.52,'b'],[11.84,2.52,'b'],[13.64,7.76,'b'],[12.8,6.56,'b'],[10.84,6.68,'b'],[6.64,2.56,'b'],[15.72,10.96,'b'],[8.36,4.32,'b'],[14.48,5.96,'b'],[15.6,8.48,'b'],[14.72,3.96,'b'],[6.72,4.28,'b'],[9.08,6.36,'b'],[14.04,9.76,'b'],[4.24,3.8,'b']];
let Data = Data1;
//---------------------------------------------------------------
let A = [];
let B = [];
let distA = [];
let distB = [];
let multA = [];
let multB = [];
let midV = [0, 0];
let dirV = [0, 0];
let svA = 0;
let svB = 0;
let sv3 = 0;
//Koordinatenform:lineC[0]*x + lineC[1]*y = lineC[2] bzw. lineC[3]
let lineC = [];
//linear Function: y = lFunc[0]*x + lFunc[1] bzw. lFunc[2]
let lFunc = [];
let street = 0;
let pokal = "";
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
  noLoop();

  radio1 = createRadio();
  radio1.option(1, "Set 1 |");
  radio1.option(2, "Set 2 |");
  radio1.option(3, "Set 3 |");
  radio1.option(4, "Set 4 |");
  radio1.option(5, "Set 5 |");
  radio1.option(6, "Set 6 |");
  radio1.option(7, "Set 7");
  radio1.position(Width+100, 160);
  radio1.style("font-size", "14px");
  radio1.style("font-family", "sans-serif");
  radio1.value("1");

  changeSet = createButton('change Dataset');
  changeSet.position(Width + 420, 190);
  changeSet.mousePressed(calcRadio);

  button = createButton('do next Step');
  button.position(Width + 100, 230);
  button.mousePressed(drawNochmal);

  tArea = createElement("textarea", "");
  tArea.elt.rows = 8;
  tArea.elt.cols = 53;
  tArea.position(Width + 100, 270);

  makeCoord(Width, mar, pad, scale);
  drawData();
  Initialize();
  calcAllDistToLine();
  drawAllLines();
}
//---------------------------------------------------------------
function drawNochmal() {
  background(220);
  noStroke();
  textSize(20);
  makeCoord(Width, mar, pad, scale);
  drawData();
  makeSupportVector();
  calcAllDistToLine();
  drawAllLines();
}
//---------------------------------------------------------------
function Initialize() {
  let DistAB = [];
  A = [];
  B = [];
  for (i = 0; i < Data.length; i++) {
    if (Data[i][2] == "a") {
      A.push(Data[i]);
    }
    if (Data[i][2] == "b") {
      B.push(Data[i]);
    }
  }
  for (a = 0; a < A.length; a++) {
    for (b = 0; b < B.length; b++) {
      distance = Math.sqrt(Math.pow(A[a][0] - B[b][0], 2) + Math.pow(A[a][1] - B[b][1], 2));
      DistAB.push([distance, a, b]);
    }
  }
  minAB = DistAB[0][0];
  for (i = 0; i < DistAB.length; i++) {
    if (minAB >= DistAB[i][0]) {
      minAB = DistAB[i][0];
      svA = DistAB[i][1];
      svB = DistAB[i][2];
    }
  }
  dy = B[svB][0] - A[svA][0];
  dx = A[svA][1] - B[svB][1];
  if (dx>=0) {
    macheGeradenGleichungen(dx, dy);
  } else {
    macheGeradenGleichungen(-dx, -dy);
  }
}
//---------------------------------------------------------------
function macheGeradenGleichungen(dx, dy) {
  nrm = Math.sqrt(dx * dx + dy * dy);
  dirV = [dx / nrm, dy / nrm];
  //midV = [(A[svA][0]+B[svB][0])/2, (A[svA][1]+B[svB][1])/2];
  lineC[0] = -dirV[1];
  lineC[1] = dirV[0];
  lineC[2] = A[svA][0] * lineC[0] + A[svA][1] * lineC[1];
  lineC[3] = B[svB][0] * lineC[0] + B[svB][1] * lineC[1];
  lFunc[0] = -lineC[0]/lineC[1];
  lFunc[1] = lineC[2]/lineC[1];
  lFunc[2] = lineC[3]/lineC[1];
  midV = [10, lFunc[0]*10 + (lFunc[1]+lFunc[2])/2];
  street = 2*Math.abs(lineC[0]*midV[0] + lineC[1]*midV[1] - lineC[3]);
  tArea.elt.value = "Width of corridor: " + Math.round(street*10)/10 + "\n\n";
  tArea.elt.value += "line coordinates (1): " + Math.round(lineC[0]*10)/10 + "*x + " + Math.round(lineC[1]*10)/10 + "*y = " + Math.round(lineC[2]*10)/10 + "\n";
  tArea.elt.value += "linear function  (1): y = " + Math.round(10*lFunc[0])/10 + "*x + " + Math.round(10*lFunc[1])/10 + "\n\n";
  tArea.elt.value += "line coordinates (2): " + Math.round(lineC[0]*10)/100 + "*x + " + Math.round(lineC[1]*10)/10 + "*y = " + Math.round(lineC[3]*10)/10 + "\n";
  tArea.elt.value += "linear function  (2): y = " + Math.round(10*lFunc[0])/10 + "*x + " + Math.round(10*lFunc[2])/10;
}
//---------------------------------------------------------------
function calcAllDistToLine() {
  distA = [];
  multA = [];
  falscheSeite = Math.sign(B[svB][0] * lineC[0] + B[svB][1] * lineC[1] - lineC[2]);
  for (a = 0; a < A.length; a++) {
    multA.push((A[a][0] - A[svA][0]) * dirV[0] + (A[a][1] - A[svA][1]) * dirV[1]);
    distX = A[svA][0] + multA[a] * dirV[0] - A[a][0];
    distY = A[svA][1] + multA[a] * dirV[1] - A[a][1];
    seitePunkt = Math.sign(A[a][0] * lineC[0] + A[a][1] * lineC[1] - lineC[2]);
    if (seitePunkt == falscheSeite) {
      distA.push(-Math.sqrt(distX * distX + distY * distY));
    } else {
      distA.push(Math.sqrt(distX * distX + distY * distY));
    }
  }
  distB = [];
  multB = [];
  falscheSeite = Math.sign(A[svA][0] * lineC[0] + A[svA][1] * lineC[1] - lineC[3]);
  for (b = 0; b < B.length; b++) {
    multB.push((B[b][0] - B[svB][0]) * dirV[0] + (B[b][1] - B[svB][1]) * dirV[1]);
    distX = B[svB][0] + multB[b] * dirV[0] - B[b][0];
    distY = B[svB][1] + multB[b] * dirV[1] - B[b][1];
    seitePunkt = Math.sign(B[b][0] * lineC[0] + B[b][1] * lineC[1] - lineC[3]);
    if (seitePunkt == -falscheSeite) {
      distB.push(-Math.sqrt(distX * distX + distY * distY));
    } else {
      distB.push(Math.sqrt(distX * distX + distY * distY));
    }
  }
}
//---------------------------------------------------------------
function makeSupportVector() {
  tempA = svA;
  tempB = svB;
  minA = distA[svA];
  maxB = distB[svB];
  for (i = 0; i < distA.length; i++) {
    if (minA > distA[i]) {
      minA = distA[i];
      tempA = i;
    }
  }
  for (j = 0; j < distB.length; j++) {
    if (maxB < distB[j]) {
      maxB = distB[j];
      tempB = j;
    }
  }

  if (minA < 0 || maxB > 0) {
    if (minA + maxB <= 0) {
      if (pokal =="a") {
        svA = sv3;
        sv3 = tempA;
      } else {
        sv3 = tempA;
      }
      pokal = "a";
      dx = A[sv3][0] - A[svA][0];
      dy = A[sv3][1] - A[svA][1];
    } else {
      if (pokal =="b") {
        svB = sv3;
        sv3 = tempB;
      } else {
        sv3 = tempB;
      }
      pokal = "b";
      dx = B[svB][0] - B[sv3][0];
      dy = B[svB][1] - B[sv3][1];
    }
    if (dx>=0) {
      macheGeradenGleichungen(dx, dy);
    } else {
      macheGeradenGleichungen(-dx, -dy);
    }
  }
}
//---------------------------------------------------------------
function drawAllLines() {
  strokeWeight(1);
  for (b = 0; b < distB.length; b++) {
    if (distB[b] <= 0) {
      stroke('rgba(0,0,255, 0.33)');
    } else {
      stroke('rgba(255,0,0, 0.33)');
    }
    line(sX(B[svB][0] + multB[b] * dirV[0]), sY(B[svB][1] + multB[b] * dirV[1]), sX(B[b][0]), sY(B[b][1]));
    fill(0, 0, 255);
    circle(Width + offset1D + (distB[b]-street/2)*scale, y1D, 8);
  }
  for (a = 0; a < distA.length; a++) {
    if (distA[a] <= 0) {
      stroke('rgba(0,0,255, 0.33)');
    } else {
      stroke('rgba(255,0,0, 0.33)');
    }
    line(sX(A[svA][0] + multA[a] * dirV[0]), sY(A[svA][1] + multA[a] * dirV[1]), sX(A[a][0]), sY(A[a][1]));
    fill(255, 0, 0);
    circle(Width + offset1D + (distA[a]+street/2)*scale, y1D, 8);
  }
  stroke(0, 0, 0);
  midC = (lFunc[1]+lFunc[2])/2;
  makeMarginLine(midC);
  stroke(255, 0, 0);
  makeMarginLine(lFunc[1]);
  stroke(0, 0, 255);
  makeMarginLine(lFunc[2]);
  noFill();
  stroke(0, 200, 0);
  strokeWeight(3);
  circle(sX(A[svA][0]), sY(A[svA][1]), 14);
  circle(sX(B[svB][0]), sY(B[svB][1]), 14);
  circle(Width + offset1D + scale*(distA[svA] + street/2), y1D, 14);
  circle(Width + offset1D + scale*(distB[svB] - street/2), y1D, 14);
  if (pokal=="b") {
    circle(sX(B[sv3][0]), sY(B[sv3][1]), 14);
    circle(Width + offset1D + scale*(distB[sv3] - street/2), y1D, 14);
  }
  if (pokal=="a") {
    circle(sX(A[sv3][0]), sY(A[sv3][1]), 14);
    circle(Width + offset1D + scale*(distA[sv3] + street/2), y1D, 14);
  }
  stroke(0, 0, 0);
  strokeWeight(2);
  line(Width + offset1D, y1D-20, Width + offset1D, y1D+20);
  strokeWeight(1);
  stroke(100, 100, 220);
  line(Width + offset1D - scale*street/2, y1D-20, Width + offset1D - scale*street/2, y1D+20);
  stroke(220, 100, 100);
  line(Width + offset1D + scale*street/2, y1D-20, Width + offset1D + scale*street/2, y1D+20);
}
//---------------------------------------------------------------
function makeMarginLine(offset) {
  c = [];
  for (i=0; i<20; i=i+2/Width) {
    py = offset + lFunc[0]*i;
    if (py>0 && py<20) {
      c.push([i, py]);
    }
  }
  line(sX(c[0][0]), sY(c[0][1]), sX(c[c.length-1][0]), sY(c[c.length-1][1]));
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
  textSize(20);
  textStyle(BOLD);
  text("SVM-Demo | V1.0", Width + 100, 40);
  textSize(14);
  fill(0);
  textStyle(NORMAL);
  text("Demonstration of a simple Support Vector Machine Algorithm", Width + 100, 65);
  text("28th of May 2021, by Thomas Joerg, thomas.joerg@jkgweil.de", Width + 100, 85);
  fill(255);
  noStroke();
  rect(mar - pad, mar - pad, Width + 2 * pad, Width + 2 * pad);
  rect(Width + 100, y1D-20, Width-40, 40);
  stroke(200);
  line(Width + 100, y1D, 2*Width+60, y1D);
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
}
function calcRadio() {
  switch (radio1.value()) {
  case "1":
    Data = Data1;
    reInit();
    break;
  case "2":
    Data = Data2;
    reInit();
    break;
  case "3":
    Data = Data3;
    reInit();
    break;
  case "4":
    Data = Data4;
    reInit();
    break;
  case "5":
    Data = Data5;
    reInit();
    break;
  case "6":
    Data = Data6;
    reInit();
    break;
  case "7":
    Data = Data7;
    reInit();
    break;
  }
}
function reInit() {
  A = [];
  B = [];
  distA = [];
  distB = [];
  multA = [];
  multB = [];
  midV = [0, 0];
  dirV = [0, 0];
  svA = 0;
  svB = 0;
  sv3 = 0;
  lineC = [];
  lFunc = [];
  street = 0;
  pokal = "";
  makeCoord(Width, mar, pad, scale);
  drawData();
  Initialize();
  calcAllDistToLine();
  drawAllLines();
}
