let scaleFactor = 5; // 28 * 5 = 140
let img, filteredImg, pooledImg, filteredImg2, pooledImg2;
let kernel = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];
let kernel2 = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];
let kernelInputs = [];
let kernel2Inputs = [];
let offX = 70;
let offY = 130;
let dimensions = 14;

function preload() {
  img = loadImage("mnist1.png");
}

function setup() {
  createCanvas(800, 560);
  frameRate(10);
  background(220);
  noSmooth();
  dimensions = img.width;
  filteredImg = createImage(img.width, img.height);
  pooledImg = createImage(img.width / 2, img.height / 2);
  filteredImg2 = createImage(img.width / 2, img.height / 2);
  pooledImg2 = createImage(img.width / 4, img.height / 4);

  createDropdown1();
  createMultipleInputs1();
  createDropdown2();
  createMultipleInputs2();

  header = createP('Conv2d mit Custom Kernel | V1.1');
  header.style('font-size', '20px');
  header.style('color', '#800000');
  header.style('font-family', 'sans-serif');
  header.style('font-weight', 'bold');
  header.position(20, 0);

  h2 = createP('Conv2d →');
  h2.style('font-size', '14px');
  h2.style('color', '#800000');
  h2.style('font-family', 'sans-serif');
  h2.style('font-weight', 'bold');
  h2.position(offX + 190, offY + 60);

  h3 = createP('MaxPool ↓');
  h3.style('font-size', '14px');
  h3.style('color', '#000080');
  h3.style('font-family', 'sans-serif');
  h3.style('font-weight', 'bold');
  h3.position(offX + 353, offY + 140);

  h4 = createP('Conv2d →');
  h4.style('font-size', '14px');
  h4.style('color', '#800000');
  h4.style('font-family', 'sans-serif');
  h4.style('font-weight', 'bold');
  h4.position(offX + 480, offY + 237);

  h5 = createP('MaxPool ↓');
  h5.style('font-size', '14px');
  h5.style('color', '#000080');
  h5.style('font-family', 'sans-serif');
  h5.style('font-weight', 'bold');
  h5.position(offX + 610, offY + 305);

  tArea = createElement("textarea", "");
  tArea.elt.rows = 15;
  tArea.elt.cols = 35;
  tArea.elt.value = "Auf das obige Bild können zwei mal nacheinander ein 2D-Convolution-Kernel und ein Average Pool 2D berechnet werden. \n\nIn das submit-Feld können 1D-Arrays eingefügt werden, die in quadratische Graustufen-Bitmaps umgewandelt werden.";
  tArea.style('font-size', '12px');
  tArea.style('color', '#000000');
  tArea.style('background-color', '#DCDCDC');
  tArea.style('font-family', 'sans-serif');
  tArea.style('font-weight', 'normal');
  tArea.style('border', '0');
  tArea.style('resize', 'none');
  tArea.position(offX+30, offY + 170);

  inputBild = createInput();
  inputBild.position(20, offY-50);
  inputBild.size(185);

  button = createButton('submit');
  button.position(20+inputBild.width, offY-50);
  button.mousePressed(makeBild);

  button = createButton('Bild 1');
  button.position(20, offY);
  button.mousePressed(loadBild1);

  button = createButton('Bild 2');
  button.position(20, offY+30);
  button.mousePressed(loadBild2);

  button = createButton('Bild 3');
  button.position(20, offY+60);
  button.mousePressed(loadBild3);

  button = createButton('Bild 4');
  button.position(20, offY+90);
  button.mousePressed(loadBild4);
}

function draw() {
  background(220);
  Bildstring = dimensions + " x " + dimensions + " px";
  textAlign(LEFT);
  text(Bildstring, offX+60, 260);
  scaleFactor = Math.floor(120/img.width);
  image(img, offX+30, offY, img.width * scaleFactor, img.height * scaleFactor);
  applyConvolutionFilter(img, filteredImg, kernel);
  image(filteredImg, offX + 320, offY, filteredImg.width * scaleFactor, filteredImg.height * scaleFactor);
  applyMaxPooling(filteredImg, pooledImg);
  image(pooledImg, offX + 350, offY + 200, pooledImg.width * scaleFactor, pooledImg.height * scaleFactor);
  applyConvolutionFilter(pooledImg, filteredImg2, kernel2);
  image(filteredImg2, offX + 610, offY + 200, filteredImg2.width * scaleFactor, filteredImg2.height * scaleFactor);
  applyMaxPooling(filteredImg2, pooledImg2);
  image(pooledImg2, offX + 625, offY + 370, pooledImg2.width * scaleFactor, pooledImg2.height * scaleFactor);
}

//----------------------------------------------------
function createDropdown1() {
  sel1 = createSelect();
  sel1.position(180+offX, offY + 95);
  sel1.option('sharpen');
  sel1.option('blur');
  sel1.option('top sobel');
  sel1.option('bottom sobel');
  sel1.option('left sobel');
  sel1.option('right sobel');
  sel1.option('emboss');
  sel1.option('outline');
  sel1.option('identity');
  sel1.selected('identity');
  sel1.changed(SelectEvent1);
}
function SelectEvent1() {
  let item = sel1.value();
  switch (item) {
  case 'sharpen':
    kernel = [[0, -1, 0], [-1, 5, -1], [0, -1, 0]];
    break;
  case 'blur':
    kernel = [[0.06, 0.12, 0.06], [0.12, 0.24, 0.12], [0.06, 0.12, 0.06]];
    break;
  case 'top sobel':
    kernel = [[1, 2, 1], [0, 0, 0], [-1, -2, -1]];
    break;
  case 'bottom sobel':
    kernel = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];
    break;
  case 'left sobel':
    kernel = [[1, 0, -1], [2, 0, -2], [1, 0, -1]];
    break;
  case 'right sobel':
    kernel = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
    break;
  case 'emboss':
    kernel = [[-2, -1, 0], [-1, 1, 1], [0, 1, 2]];
    break;
  case 'outline':
    kernel = [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]];
    break;
  default:
    kernel = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];
  }
  createMultipleInputs1();
}
function createMultipleInputs1() {
  kernelInputs = [];
  for (let spalte=0; spalte<3; spalte++) {
    for (let zeile=0; zeile<3; zeile++) {
      ip1 = createInput(kernel[zeile][spalte], float);
      ip1.position(offX + 182+32*spalte, offY + 25*zeile);
      ip1.size(24);
      ip1.style('text-align:center');
      ip1.style('font-size: 12px');
      ip1.mouseOver(mausDrueber);
      ip1.mouseOut(mausRaus);
      ip1.input(Eventhandler);
      ip1.id = zeile*3+spalte;
      kernelInputs.push(ip1);
    }
  }
}
function createDropdown2() {
  sel2 = createSelect();
  sel2.position(offX + 463, offY + 270);
  sel2.option('sharpen');
  sel2.option('blur');
  sel2.option('top sobel');
  sel2.option('bottom sobel');
  sel2.option('left sobel');
  sel2.option('right sobel');
  sel2.option('emboss');
  sel2.option('outline');
  sel2.option('identity');
  sel2.selected('identity');
  sel2.changed(SelectEvent2);
}
function SelectEvent2() {
  let item = sel2.value();
  switch (item) {
  case 'sharpen':
    kernel2 = [[0, -1, 0], [-1, 5, -1], [0, -1, 0]];
    break;
  case 'blur':
    kernel2 = [[0.06, 0.12, 0.06], [0.12, 0.24, 0.12], [0.06, 0.12, 0.06]];
    break;
  case 'top sobel':
    kernel2 = [[1, 2, 1], [0, 0, 0], [-1, -2, -1]];
    break;
  case 'bottom sobel':
    kernel2 = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];
    break;
  case 'left sobel':
    kernel2 = [[1, 0, -1], [2, 0, -2], [1, 0, -1]];
    break;
  case 'right sobel':
    kernel2 = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
    break;
  case 'emboss':
    kernel2 = [[-2, -1, 0], [-1, 1, 1], [0, 1, 2]];
    break;
  case 'outline':
    kernel2 = [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]];
    break;
  default:
    kernel2 = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];
  }
  createMultipleInputs2();
}
function createMultipleInputs2() {
  kernel2Inputs = [];
  for (let spalte=0; spalte<3; spalte++) {
    for (let zeile=0; zeile<3; zeile++) {
      ip2 = createInput(kernel2[zeile][spalte], float);
      ip2.position(offX + 465 + 32*spalte, offY + 176+25*zeile);
      ip2.size(24);
      ip2.style('text-align:center');
      ip2.style('font-size: 12px');
      ip2.mouseOver(mausDrueber);
      ip2.mouseOut(mausRaus);
      ip2.input(Eventhandler2);
      ip2.id = zeile*3+spalte;
      kernel2Inputs.push(ip2);
    }
  }
}
function mausRaus() {
  this.style('background-color: white');
}
function mausDrueber() {
  this.style('background-color: lightblue');
}
function Eventhandler() {
  stelle = this.id;
  zeile = Math.floor(stelle / 3);
  spalte = stelle - 3*zeile;
  kernel[zeile][spalte]= this.value();
}
function Eventhandler2() {
  stelle = this.id;
  zeile = Math.floor(stelle / 3);
  spalte = stelle - 3*zeile;
  kernel2[zeile][spalte]= this.value();
}

function applyConvolutionFilter(srcImg, destImg, kernel) {
  srcImg.loadPixels();
  destImg.loadPixels();

  let kernelSize = kernel.length;
  let kHalf = Math.floor(kernelSize / 2);

  for (let y = 0; y < srcImg.height; y++) {
    for (let x = 0; x < srcImg.width; x++) {
      let sum = 0;
      for (let ky = -kHalf; ky <= kHalf; ky++) {
        for (let kx = -kHalf; kx <= kHalf; kx++) {
          let px = x + kx;
          let py = y + ky;

          if (px >= 0 && px < srcImg.width && py >= 0 && py < srcImg.height) {
            let kernelVal = kernel[ky + kHalf][kx + kHalf];
            let pixelVal = srcImg.pixels[(py * srcImg.width + px) * 4];
            sum += kernelVal * pixelVal;
          }
        }
      }

      sum = constrain(sum, 0, 255);
      let index = (y * srcImg.width + x) * 4;
      destImg.pixels[index] = destImg.pixels[index + 1] = destImg.pixels[index + 2] = sum;
      destImg.pixels[index + 3] = 255;
    }
  }
  destImg.updatePixels();
}

function applyMaxPooling(srcImg, destImg) {
  srcImg.loadPixels();
  destImg.loadPixels();

  let poolSize = 2;

  for (let y = 0; y < srcImg.height; y += poolSize) {
    for (let x = 0; x < srcImg.width; x += poolSize) {
      let maxValue = 0;

      for (let py = 0; py < poolSize; py++) {
        for (let px = 0; px < poolSize; px++) {
          let currentY = y + py;
          let currentX = x + px;

          if (currentX < srcImg.width && currentY < srcImg.height) {
            let index = (currentY * srcImg.width + currentX) * 4;
            let pixelValue = srcImg.pixels[index];
            maxValue = max(maxValue, pixelValue);
          }
        }
      }

      let destX = x / poolSize;
      let destY = y / poolSize;
      let destIndex = (destY * destImg.width + destX) * 4;
      destImg.pixels[destIndex] = destImg.pixels[destIndex + 1] = destImg.pixels[destIndex + 2] = maxValue;
      destImg.pixels[destIndex + 3] = 255;
    }
  }
  destImg.updatePixels();
}


function drawKernel() {
  textSize(14);
  textAlign(CENTER, CENTER);
  for (let y = 0; y < kernel.length; y++) {
    for (let x = 0; x < kernel[y].length; x++) {
      let xPos = 190 + x * 20;
      let yPos = 90 + y * 20;
      text(kernel[y][x], xPos, yPos);
    }
  }
}

function drawKernel2() {
  textSize(14);
  textAlign(CENTER, CENTER);
  for (let y = 0; y < kernel.length; y++) {
    for (let x = 0; x < kernel[y].length; x++) {
      let xPos = 590 + x * 20;
      let yPos = 90 + y * 20;
      text(kernel[y][x], xPos, yPos);
    }
  }
}

function makeBild() {
  let string = inputBild.value();
  inputBild.value('');
  let bitmap = string.split(",").map(Number);
  let laenge = bitmap.length;
  dimensions = Math.sqrt(laenge);
  img = createImage(dimensions, dimensions);
  img.loadPixels();

  test = 1;
  for (j=0; j<bitmap.length; j++) {
    if (bitmap[j]>test) {
      test = bitmap[j];
    }
  }
  var faktor = test>1 ? 1 : 255;
  print(faktor);
  //bitmap[index] = bitmap[index] === 0 ? 1 : 0; // Toggle value
  for (let i = 0; i < dimensions*dimensions; i++) {
    let val = bitmap[i]*faktor; // Von 0-1 zu 0-255 umwandeln
    img.pixels[i*4] = val; // R
    img.pixels[i*4 + 1] = val; // G
    img.pixels[i*4 + 2] = val; // B
    img.pixels[i*4 + 3] = 255; // A
  }
  img.updatePixels();

  filteredImg = createImage(img.width, img.height);
  pooledImg = createImage(img.width / 2, img.height / 2);
  filteredImg2 = createImage(img.width / 2, img.height / 2);
  pooledImg2 = createImage(img.width / 4, img.height / 4);
}
function loadBild1() {
  img = loadImage("mnist1.png");
  img.updatePixels();
}
function loadBild2() {
  img = loadImage("mnist2.png");
  img.updatePixels();
}
function loadBild3() {
  img = loadImage("mnist3.png");
  img.updatePixels();
}
function loadBild4() {
  img = loadImage("mnist4.png");
  img.updatePixels();
}
