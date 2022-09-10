const scal = 3;

actualSize = 256;
const width= actualSize*scal; 
const height= actualSize*scal;

var colors = [
    //["lightcyan", 92, 160, 181],
    //["cyan", 89, 147, 171], 
    ["koiaqua", 181, 248, 255],
    //["aqua", 103,214,235],
    //["white", 255,255,255],
    //["blue", 31, 110, 158],
    //["deepblue", 31, 95, 143],
];

var topX_1 = 83*scal;
var topY_1 = 64*scal;
var topX_2 = 100*scal;
var topY_2 = 102*scal;
var topX_3 = 109*scal;
var topY_3 = 121*scal;

var width_1 = 98*scal;
var height_1 = 118*scal;
var width_2 = 60*scal; 
var height_2 = 71*scal;
var width_3 = 41*scal; 
var height_3 = 47*scal;

var nisX = topX_1;
var nisY = topY_1;

var noiseValX = Math.random()*100;
var noiseValY = Math.random()*100;

var yval = 0;
var yval2 = 1;
var yval3 = 0.5;
var ylefttop = Math.random(1);
var yleftmid = Math.random(1,2);
var yrighttop = Math.random(2,3);
var yrightmid = Math.random(3,4);

var noiseVar = 1;

// for sine curve 
let xspacing = scal; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 60.0; // Height of wave
let period = 180.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave


function preload() {
    // Font
    font = loadFont("misaki_gothic.ttf");

    // Images
    //imgbk = loadImage("images/back.png");
    imghk_bk= loadImage("images/hackle_koi_back.png");
    imgsky = loadImage("images/sky.png");
    imghk = loadImage("images/hackle_koi.png");
    koibl = loadImage("images/bluekoi.png");// 鯉たちは11x18
    koiaq = loadImage("images/lightbluekoi.png");
    koiye = loadImage("images/yellowkoi.png");
    koired = loadImage("images/redkoi.png");
}

function setup () {
    createCanvas(width, height);
    noFill();
    frameRate(30);
    background(181, 248, 255);

    // for sine curve
    w =  width + xspacing;
    dx = (TWO_PI / period) * xspacing;
    yvalues = new Array(floor(w / xspacing));

}

function draw() {
    // sine curve
    calcWave();
    renderWave();
    //image(ly, 0, 0);
    theta += 0.001;
    let phi = theta;
    for (let i = 0; i < yvalues.length; i++){
        yvalues[i] = sin(phi) * amplitude;
        phi +=dx;
    }
    noStroke();
    fill(255);
    for (let x = 0; x < yvalues.length; x++) {
        rect(x*xspacing, 20*scal +yvalues[x], scal, scal);
        rect(x*xspacing, 40*scal +yvalues[x], scal, scal);
        rect(x*xspacing, 65*scal +yvalues[x], scal, scal);
        rect(x*xspacing, 95*scal + yvalues[x], scal, scal);
    }
    
    //読み込んだ画像の表示
    //image(imgbk, 0, 0, width, height);
    image(imgsky, 0, 0, width, height);
    image(imghk_bk, 0, 0, width, height);

    // 青空の描画
    x = int(random(-15, actualSize))*scal;// x とy が頂点; 
    y = int(random(-15, actualSize/3))*scal;

    colorDice = int(random(0, colors.length));
    r = int(random(2, 15))*2-1;// 奇数で出力
    tr = random(0, 70);
    for (i = 0; i < r; i++) {
        ii = i*2+1;
        j = (r - ii)/2;
        l = r - j*2;
        noStroke();
        fill(colors[colorDice][1], colors[colorDice][2], colors[colorDice][3], tr);
        for (k = 0; k<l; k++) {
            rect(x+j*scal+k*scal, y+i*scal, scal, scal);
            if(i!=r-1){
                rect(x+j*scal+k*scal, y+2*r*scal-i*scal-scal*2, scal, scal);
            }
        }
    }
    

    // 左斜一段目
    var xlefttop = 0;
    for (i = 0; i < 12; i++){
        var y = map(noise(xlefttop, ylefttop), 0, 1, topY_1-4*scal, topY_1+4*scal);
        var x = topX_3 - (topX_3-topX_1)/10*i;
        var wid_i = map(i, 0, 11, 9, 36);
        var hei_i = map(i, 0, 11, 16, 64);
        var k = (topY_3-topY_1)/(topX_3-topX_1);
        image(koiye, x, y+scal*4+k*(x-topX_1) , wid_i, hei_i);
        xlefttop += 0.02;
    }
    ylefttop += 0.01;

    // 左斜2段目
    var xleftmid = 0;
    for (i = 0; i < 12; i++){
        var y = map(noise(xleftmid, yleftmid), 0, 1, topY_1-4*scal, topY_1+4*scal);
        var x = topX_3 - (topX_3-topX_1)/10*i;
        var wid_i = map(i, 0, 11, 9, 36);
        var hei_i = map(i, 0, 11, 16, 64);
        var k = (topY_3-topY_1)/(2*(topX_3-topX_1));
        image(koiye, x, y+scal*4+k*(x-topX_1) + height_1/3, wid_i, hei_i);
        xleftmid += 0.02;
    }
    yleftmid += 0.01;

    // 右斜一段目
    var xrighttop = 0;
    for (i = 0; i < 12; i++){
        var y = map(noise(xrighttop, yrighttop), 0, 1, topY_3-4*scal, topY_3+4*scal);
        var x = topX_3+width_3 + (topX_3-topX_1)/10*i;
        var wid_i = map(i, 0, 11, 9, 36);
        var hei_i = map(i, 0, 11, 16, 64);
        var k = (topY_3-topY_1)/(topX_3-topX_1);
        image(koiaq, x-36, y+scal*4-k*(x-(topX_3+width_3)), wid_i, hei_i);
        xrighttop += 0.02;
    }
    yrighttop += 0.01;

    // 右斜2段目
    var xrightmid = 0;
    for (i = 0; i < 12; i++){
        var y = map(noise(xrightmid, yrightmid), 0, 1, topY_3-4*scal, topY_3+4*scal);
        var x = topX_3+width_3 + (topX_3-topX_1)/10*i;
        var wid_i = map(i, 0, 11, 9, 36);
        var hei_i = map(i, 0, 11, 16, 64);
        var k = (topY_3-topY_1)/(2*(topX_3-topX_1));
        image(koired, x-36, y+scal*4-k*(x-(topX_3+width_3)) + height_3/4, wid_i, hei_i);
        xrightmid += 0.02;
    }
    yrightmid += 0.01;

    // 横1列目
    var xval = 0;
    for (i = 0; i < 9; i++) {
        var y =  map(noise(xval, yval), 0, 1, topY_1-4*scal, topY_1+4*scal);

        image(koibl, topX_1 + (width_1 / 10 * i)+y-topY_1, y , 36,64);
        xval += 0.05;
    }
    //endShape(CLOSE);
    yval += 0.015;
    
    // 横2列目
    var xval2 = 0;
    for (i = 0; i < 9; i++) {
        var y =  map(noise(xval2, yval2), 0, 1, topY_2-4*scal, topY_2+4*scal);

        image(koiaq, topX_2 + (width_2 / 10 * i)+y-topY_2, y , 18,32);
        xval2 += 0.03;
    }
    //endShape(CLOSE);
    yval2 += 0.01;
    
    // 横3列目
    var xval3 = 0.1;
    for (i = 0; i < 9; i++) {
        var y =  map(noise(xval3, yval3), 0, 1, topY_3-4*scal, topY_3+4*scal);

        image(koired, topX_3 + (width_3 / 10 * i)+y-topY_3, y , 12,24);
        xval3 += 0.02;
    }
    //endShape(CLOSE);
    yval3 += 0.005;
    
    // Hackle くんの表示
    image(imghk, 0,0,width,height);

    // sign
    textFont(font);
    textAlign(RIGHT);
    fill(255);
    noStroke();
    textSize(12);
    text("#ドット絵再考察", -10, height - 16*2, width);
    text("さよならさんすう", -10, height - 16, width);
}

function calcWave() {
    // Increment theta (try different values for
    // 'angular velocity' here)
    theta += 0.02;
  
    // For every x value, calculate a y value with sine function
    let x = theta;
    for (let i = 0; i < yvalues.length; i++) {
      yvalues[i] = sin(x) * amplitude;
      x += dx;
    }
  }
  
  function renderWave() {
    // A simple way to draw the wave with an ellipse at each location
    for (let x = 0; x < yvalues.length; x++) {
      //ly.ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16);
    }
  }
  