let vector1 = [100, 100, 0];
let vector2 = [50, -50, 0];
let dragging1 = false;
let dragging2 = false;
let mouseDist = [0, 0];
let offset = 250;
let skalar = 0;
let a = Math.PI;
//-------------------------------------------------------------------------
function setup() {
  createCanvas(800, 500);
  header = createP("Vector Dot Product | V1.0");
  header.style("font-size", "20px");
  header.style("color", "#800000");
  header.style("font-family", "sans-serif");
  header.style("font-weight", "bold");
  header.position(500, 0);
}

function draw() {
  background(220);
  fill(255);
  noStroke();
  rect(20, 20, 460, 460);

  drawArrow(vector1, 'red');
  drawArrow(vector2, 'blue');

  if (dragging1) {
    dragging2 = false;
    vector1[0] = mouseX-offset;
    vector1[1] = mouseY-offset;
  }
  if (dragging2) {
    dragging1 = false;
    vector2[0] = mouseX-offset;
    vector2[1] = mouseY-offset;
  }
  drawBalken(vector1, vector2);
  if (mouseX > 470 || mouseX < 30 || mouseY > 470 && mouseY < 30) {
    dragging1 = false;
    dragging2 = false;
  }
}
//-------------------------------------------------------------------------
function drawBalken(vec1, vec2) {
  skalar = vektorMult(vec1, vec2)
  fill(128);
  rect(600, offset, 80, -skalar/500);
  noFill();

  stroke(50);
  strokeWeight(2);
  arc(offset, offset, 60, 60, vector1[2], vector2[2]);
  stroke(50);
  strokeWeight(1);
  line(500, offset, 500 + 280, offset);
  noStroke();
  fill(0);
  text("Skalarproduct: " + vector1[0] + "*" + vector2[0] + " + " + (-vector1[1]) + "*" + (-vector2[1]) + " = " + skalar, 500, 460);
  winkel = Math.round(180*(vector2[2] - vector1[2])/3.141592654);
  if(winkel == 90 || winkel == (-90)){
    skalar = 0;
  }
  text("Winkel zw. Rot & Blau: " + winkel, 500, 480);
}

function drawArrow(vec, myColor) {
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  line(offset, offset, offset + vec[0], offset + vec[1]);
  a = calculateAngle(vec);
  if (myColor == "red") {
    vector1[2] = a;
  }
  if (myColor == "blue") {
    vector2[2] = a;
  }
  dx1 = 0*cos(a) + 0*sin(a);
  dy1 = 0*sin(a) - 0*cos(a);
  dx2 = (-8)*cos(a) + 5*sin(a);
  dy2 = (-8)*sin(a) - 5*cos(a);
  dx3 = (-8)*cos(a) + (-5)*sin(a);
  dy3 = (-8)*sin(a) - (-5)*cos(a);
  triangle(offset + vec[0] + dx1, offset + vec[1] + dy1, offset + vec[0]+dx2, offset + vec[1]+dy2, offset + vec[0]+dx3, offset + vec[1]+dy3);

  fill(0, 0, 0);
  noStroke();
  textSize(14);
  textStyle(NORMAL);
  textAlign(LEFT);
  text("Vektor rot:   (" + vector1[0] + ", " + (-vector1[1]) + ")", 500, 70,10000);
  text("Vektor blau: (" + vector2[0] + ", " + (-vector2[1]) + ")", 500, 90,10001);
}

function calculateAngle(startVec) {
  let dx = startVec[0];
  let dy = startVec[1];
  let angle = atan2(dy, dx);
  print(angle*180/3.141592654);
  return angle;
}
function vektorMult(vec1, vec2) {
  skalar = vec1[0]*vec2[0]+(-vec1[1])*(-vec2[1]);
  return skalar;
}
function calcDist(vecA, vecB) {
  let dist = Math.sqrt((vecA[0] - vecB[0])*(vecA[0] - vecB[0]) + (vecA[1] - vecB[1])*(vecA[1] - vecB[1]));
  return dist;
}
//-------------------------------------------------------------------------
function mousePressed() {
  if (mouseX > 30 && mouseX < 470 && mouseY > 30 && mouseY < 470) {
    mouseDist[0] = mouseX-offset;
    mouseDist[1] = mouseY-offset;
    let dist1 = calcDist(mouseDist, vector1);
    let dist2 = calcDist(mouseDist, vector2);

    if (dist1 < 50) {
      dragging1 = true;
    }
    if (dist2 < 50) {
      dragging2 = true;
    }
  } else {
    dragging1 = false;
    dragging2 = false;
  }
}

function mouseReleased() {
  dragging1 = false;
  dragging2 = false;
}
