let omega0 = 80;
let omega1 = 80;
let phi0 = 0;
let phi1 = 0;
let dt = 0.05;
let winkel1 = 0;
let winkel0 = 0;
let amp = 40;
let laenge=[];
let oszipunkte = [];
let abstand;
let oszis;
let offset = 0;
let breite = 1000;
let Xpos = [80, 200, 370];
let distanz = 0;
let bigX =0;
//---------------------------------------------------------------
function setup() {
  createCanvas(1200, 700);

  ampSlider = createSlider(5, 50, 35, 1);
  ampSlider.position(50, 550);
  ampSlider.style('width', '500px');

  lambdaSlider = createSlider(1, 1000, 400, 1);
  lambdaSlider.position(50, 600);
  lambdaSlider.style('width', '500px');

  osziSlider = createSlider(2, 30, 11, 1);
  osziSlider.position(650, 550);
  osziSlider.style('width', '500px');

  cSlider = createSlider(0, 10000, 5000, 1);
  cSlider.position(50, 650);
  cSlider.style('width', '500px');

  xSlider = createSlider(-90, 100, 0, 5);
  xSlider.position(650, 600);
  xSlider.style('width', '500px');

  phiSlider = createSlider(0, 360, 0, 1);
  phiSlider.position(650, 650);
  phiSlider.style('width', '500px');

  button = createButton('reset');
  button.position(1140, 13);
  button.mousePressed(changeOffset);

  for (i=0; i<3; i++) {
    laenge.push([]);
    oszipunkte.push([]);
    for (j=0; j<breite; j++) {
      laenge[i].push(0);
    }
  }
  background(220);
  frameRate(20);
}
//---------------------------------------------------------------
function draw() {
  background(240);
  oszis = osziSlider.value();
  distanz = breite/(oszis-1);
  lambda = lambdaSlider.value();
  phi1 = phiSlider.value()*(Math.PI)/180;
  c = cSlider.value();
  amp = ampSlider.value();
  bigX = 1+xSlider.value()/100;

  omega0 = 2*PI*c/lambda;
  winkelweite0 = 360*breite/lambda;
  winkel0 = winkel0 + omega0*dt;
  winkel0 = winkel0 % 360;

  omega1 = 2*PI*c/(lambda*bigX);
  winkelweite1 = 360*breite/lambda*bigX;
  winkel1 = winkel1 + omega1*dt;
  winkel1 = winkel1 % 360;

  macheLineal();
  macheOszis(0, winkel0, winkelweite0, lambda);
  macheOszis(1, winkel1, winkelweite1, lambda*bigX);
  macheSuperPos();
  macheText();
}
//---------------------------------------------------------------
function macheOszis(welche, winkel, winkelweite, lambda) {
  oszipunkte[welche]=[];
  let twinkelweite;
  let phi;

  if (welche==0) {
    twinkelweite = 360*breite/(lambda*(oszis-1));
    stroke(0, 220, 0);
    fill(0, 220, 0);
    faktor = 1;
    phi = 0;
  }
  if (welche==1) {
    twinkelweite = 360*breite/(lambda*(oszis-1));
    stroke(220, 0, 0);
    fill(220, 0, 0);
    faktor = -1;
    phi = phi1;
  }
  for (i=0; i<oszis; i++) {
    oszipunkte[welche].push(machePfeil(100+distanz*i, Xpos[welche], amp, winkel-faktor* i*twinkelweite, welche));
    circle(100+distanz*i, Xpos[welche]+oszipunkte[welche][i][1], 8);
    machePfeil(100+distanz*i, Xpos[2], amp, winkel-faktor*i*twinkelweite, welche);
  }
  for (i=0; i<oszis; i++) {
    stroke(200, 200, 200);
    strokeWeight(1);
    noFill();
    circle(100+distanz*i, Xpos[welche], 2*amp);
  }
  for (i=0; i<breite; i++) {
    laenge[welche][i] = -amp*sin((PI*winkel/180)-faktor*(2*PI/lambda)*i + phi);
    point(100+i, Xpos[welche]+laenge[welche][i]);
  }
}
//---------------------------------------------------------------
function macheSuperPos() {
  oszipunkte[2]=[];
  stroke(0, 0, 220);
  fill(0, 0, 220);
  faktor = 0;
  for (i=0; i<breite; i++) {
    laenge[2][i]=laenge[0][i]+laenge[1][i];
    point(100+i, Xpos[2]+laenge[2][i]);
  }
  for (i=0; i<oszis; i++) {
    oszipunkte[2].push([oszipunkte[0][i][0]+oszipunkte[1][i][0], oszipunkte[0][i][1]+oszipunkte[1][i][1]]);
    machePfeil2(100+distanz*i, Xpos[2], oszipunkte[2][i][0], oszipunkte[2][i][1]);
  }
}
//---------------------------------------------------------------
function machePfeil(startx, starty, laenge, winkel, welche) {
  wRad = PI*winkel/180;
  if (welche ==1) {
    wRad = wRad + phi1;
  }
  deltax = laenge*cos(wRad);
  deltay = -laenge*sin(wRad);
  p1x= 10*cos(wRad+4*PI/5);
  p1y= -10*sin(wRad+4*PI/5);
  p2x= 10*cos(wRad-4*PI/5);
  p2y= -10*sin(wRad-4*PI/5);
  stroke(200, 200, 200);
  strokeWeight(1);
  noFill();
  line(startx + deltax, starty + deltay, startx, starty+deltay);
  line(startx, starty, startx, starty + deltay);

  stroke(welche*200, 200*((welche+1)%2), 0);
  fill(welche*200, 200*((welche+1)%2), 0);
  strokeWeight(1);
  line(startx, starty, startx + deltax, starty + deltay);
  line(startx + deltax, starty + deltay, startx + deltax+p1x, starty + deltay+p1y);
  line(startx + deltax+p1x, starty + deltay+p1y, startx + deltax+p2x, starty + deltay+p2y);
  line(startx + deltax+p2x, starty + deltay+p2y, startx + deltax, starty + deltay);
  return [deltax, deltay];
}
//---------------------------------------------------------------
function machePfeil2(startx, starty, deltax, deltay) {
  v = createVector(deltax, deltay);
  w = -v.heading();
  l = v.mag();
  p1x= 10*cos(w+4*PI/5);
  p1y= -10*sin(w+4*PI/5);
  p2x= 10*cos(w-4*PI/5);
  p2y= -10*sin(w-4*PI/5);

  stroke(0, 0, 128);
  strokeWeight(1);
  noFill();
  if (l>0.1) {
    line(startx, starty, startx + deltax, starty + deltay);
    line(startx + deltax, starty + deltay, startx + deltax+p1x, starty + deltay+p1y);
    line(startx + deltax+p1x, starty + deltay+p1y, startx + deltax+p2x, starty + deltay+p2y);
    line(startx + deltax+p2x, starty + deltay+p2y, startx + deltax, starty + deltay);
    stroke(200, 200, 200);
    strokeWeight(1);
    noFill();
    circle(startx, starty, 2*Math.sqrt(deltax*deltax+deltay*deltay));
    line(startx + deltax, starty + deltay, startx, starty+deltay);
    line(startx, starty, startx, starty + deltay);
  }
}

//---------------------------------------------------------------
function macheLineal() {
  stroke(200, 200, 200);
  strokeWeight(1);
  for (i=1; i<12; i++) {
    for (j=0; j<550; j=j+3) {
      point(i*100, j);
    }
  }
  noStroke();
  textSize(12);
  textStyle(NORMAL);
  fill(180, 180, 180);
  for (i=1; i<12; i++) {
    text(((i-1)*100).toString() + "px", 5+ i*100, 497);
  }
}
//---------------------------------------------------------------
function changeOffset() {
  offset = millis();
}
//---------------------------------------------------------------
function macheText() {
  noStroke();
  fill(210, 210, 210);
  rect(0, 500, 1200, 200);

  fill(0, 0, 0);
  textSize(16);
  textStyle(NORMAL);
  text("Amplitude = " + amp.toString()+"px", 100, 550);
  text("Anzahl sichtbare Oszillatoren = " + oszis.toString(), 735, 550);
  text("Lambda = " + lambda.toString()+"px", 100, 600);
  text("c = " + round(c/60).toString() + "px/s", 100, 650);
  text("Prozent Wellenlänge grüne Welle: " + round(bigX*100).toString() + "%", 735, 600);
  text("Phasenverschiebung grüne Welle: " + (round(10*phi1/Math.PI)/10).toString() + " Pi", 735, 650);

  textStyle(BOLDITALIC);
  fill(160, 0, 0);
  var aktMillis = millis() - offset;
  text("Sekunden: " + round(aktMillis/1000), 1002, 28);

  noStroke();
  textSize(12);
  textStyle(ITALIC);
  fill(0, 0, 128);
  text("Zeigermodell V1.0, Thomas Jörg, 6.Juni 2021", 940, 690);
}
