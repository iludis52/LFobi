let omega = 80;
let dt = 0.05;
let winkel = 0;
let amp = 40;
let punkte=[];
let abstand;
let oszis;
let offset = 0;
function setup() {
  createCanvas(1200, 700);

  ampSlider = createSlider(0, 100, 40, 1);
  ampSlider.position(140, 400);
  ampSlider.style('width', '400px');

  lambdaSlider = createSlider(1, 1000, 200, 1);
  lambdaSlider.position(140, 450);
  lambdaSlider.style('width', '1000px');

  cSlider = createSlider(0, 10000, 5000, 1);
  cSlider.position(140, 500);
  cSlider.style('width', '1000px');

  breiteSlider = createSlider(0, 1000, 1000, 1);
  breiteSlider.position(140, 630);
  breiteSlider.style('width', '1000px');

  osziSlider = createSlider(0, 30, 10, 1);
  osziSlider.position(140, 680);
  osziSlider.style('width', '360px');

  button = createButton('reset');
  button.position(1150, 331);
  button.mousePressed(changeOffset);

  background(220);
  frameRate(20);
}

function draw() {
  background(240);
  var oszis = 1+osziSlider.value();
  var breite = breiteSlider.value();
  var distanz = breite/(oszis-1);
  var lambda = lambdaSlider.value();
  var c = cSlider.value();
  var omega = 2*PI*c/lambda;
  var winkelweite = 360*breite/lambda;
  if (oszis>1) {
    winkelweite = 360*breite/(lambda*(oszis-1));
  }
  var amp = ampSlider.value();

  winkel = winkel + omega*dt;
  winkel = winkel % 360;

  macheLineal();

  noFill();
  if (oszis<2) {
    distanz=0;
  }
  for (i=0; i<oszis; i++) {
    punkte[i] = machePfeil(100+distanz*i, 130, amp, winkel - i*winkelweite);
  }

  fill(255, 0, 0);
  for (i=0; i<oszis; i++) {
    noStroke();
    circle(punkte[i][0], punkte[i][1], 10);
  }
  stroke(255, 0, 0);
  for (i=0; i<breite; i++) {
    point(100+i, 130-amp*sin((PI*winkel/180)-(2*PI/lambda)*i));
  }

  noStroke();
  fill(210, 210, 210);
  rect(0, 260, 1200, 700);

  fill(0, 0, 0);
  textSize(16);
  textStyle(NORMAL);
  text("Amplitude = " + amp.toString()+"px", 90, 350);
  text("Lambda = " + lambda.toString()+"px", 90, 400);
  text("c = " + round(c/60).toString() + "px/s", 90, 450);
  text("Gesamtbreite in Pixel = " + breite.toString(), 90, 580);
  text("Anzahl sichtbare Oszillatoren = " + oszis.toString(), 90, 630);

  textSize(20);
  textStyle(BOLD);
  text("Wellenparameter", 50, 300);
  text("Darstellungsparameter", 50, 530);

  textStyle(BOLDITALIC);
  fill(160, 0, 0);
  var aktMillis = millis() - offset;
  text("Sekunden: " + round(aktMillis/1000), 940, 300);

  noStroke();
  textSize(12);
  textStyle(ITALIC);
  fill(0, 0, 128);
  text("Zeigermodell V0.9, Thomas Jörg, 16.Mai 2021", 940, 690);
}

function machePfeil(startx, starty, laenge, winkel) {
  wRad = PI*winkel/180;
  deltax = laenge*cos(wRad);
  deltay = -laenge*sin(wRad);
  p1x= 10*cos(wRad+4*PI/5);
  p1y= -10*sin(wRad+4*PI/5);
  p2x= 10*cos(wRad-4*PI/5);
  p2y= -10*sin(wRad-4*PI/5);
  stroke(200, 200, 200);
  strokeWeight(1);
  circle(startx, starty, 2*laenge);
  line(startx + deltax, starty + deltay, startx, starty+deltay);
  line(startx, starty, startx, starty + deltay);
  stroke(0, 0, 0);
  strokeWeight(1);
  line(startx, starty, startx + deltax, starty + deltay);
  line(startx + deltax, starty + deltay, startx + deltax+p1x, starty + deltay+p1y);
  line(startx + deltax+p1x, starty + deltay+p1y, startx + deltax+p2x, starty + deltay+p2y);
  line(startx + deltax+p2x, starty + deltay+p2y, startx + deltax, starty + deltay);
  return [startx, starty + deltay];
}
function macheLineal() {
  stroke(200, 200, 200);
  strokeWeight(1);
  for (i=1; i<12; i++) {
    for (j=0; j<250; j=j+3) {
      point(i*100, j);
    }
  }
  noStroke();
  textSize(12);
  textStyle(NORMAL);
  fill(180, 180, 180);
  for (i=1; i<12; i++) {
    text(((i-1)*100).toString() + "px", 5+ i*100, 250);
  }
}
function changeOffset() {
  offset = millis();
}
