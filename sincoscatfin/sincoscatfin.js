// for actual size
var scal = 1.5;
var actualSize = 512;
var width = actualSize*scal;
var height = actualSize*scal;

// for sine curve
let xspacing = scal; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = height/4; // Height of wave
let period = 180.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave

let count;
let mask;
let initmask;

var colors = [
    ["wordblue", 41,39,79], 
    ["strokeblue", 0, 33, 54], 
    ["birthblue", 67,140,181],
];

function preload() {
    // Font
    //font = loadFont("../assets/misaki_gothic.ttf");

    // Images
    imghk = loadImage("hackle.png");
    imgkid = loadImage("kid.png");
}

function setup () {
    createCanvas(actualSize*scal, actualSize*scal);
    background(255);
    //frameRate(33);
    //image(img, 0, 0, width, height);

    // for sine curve
    w =  width + xspacing;
    dx = (TWO_PI / period) * xspacing;
    yvalues = new Array(floor(w / xspacing));

    count = 0;
    mask = 0;
    initmask = yvalues.length;

}

function draw() {
    // plot rectangles
    x = int(random(-15, actualSize))*scal;// x とy が頂点; 
    y = int(random(-15, actualSize))*scal;

    r = int(random(2, 15))*2-1;// 奇数で出力
    tr = random(0, 70);
    for (i = 0; i < r; i++) {
        ii = i*2+1;
        j = (r - ii)/2;
        l = r - j*2;
        noStroke();
        if(tr%2 ===0){
            fill(241, 236, 228, tr);
        } else {
            fill(231, 210, 153, tr);
        }
        for (k = 0; k<l; k++) {
            rect(x+j*scal+k*scal, y+i*scal, scal, scal);
            if(i!=r-1){
                rect(x+j*scal+k*scal, y+2*r*scal-i*scal-scal*2, scal, scal);
            }
        }
    }

    // plot sine curve
    calcWave();
    //renderWave();
    theta += 0.001;
    let phi = theta;
    for (let i = 0; i < yvalues.length; i++){
        yvalues[i] = sin(phi) * amplitude;
        phi +=dx;
    }
    fill(255);
    //fill(41,39,79);//for debug
    noStroke();
    for (let x = 0; x < yvalues.length - mask; x++) {
        rect(x*xspacing, height/4+yvalues[x]-4*scal, scal, scal);
    }

    for (let x = 0; x < yvalues.length; x++) {
        rect(x*xspacing, height*3/4+yvalues[x]-4*scal, scal, scal);
    }

    for (let x = 0; x < yvalues.length; x++) {
        rect(x*xspacing, height/2+yvalues[x]-4*scal, scal, scal);
    }



    if (count > 131){
        //calcWave();
        //renderWave();

        //theta += 0.001;
        let phi = theta;
        for (let i = 0; i < yvalues.length; i++){
            yvalues[i] = sin(phi+PI) * amplitude;
            phi +=dx;
        }
        noStroke();
        fill(241, 236, 228);
        for (let x = 0; x < yvalues.length - mask + 50; x++) {
            //rect(x*xspacing+scal, height/2+yvalues[x]-4*scal, scal, scal);
        }
        for (let x = 0; x < yvalues.length - mask + 50; x++) {
            rect(x*xspacing+scal, height*3/4+yvalues[x]-4*scal, scal, scal);
        }
        for (let x = 0; x < yvalues.length - mask + 50; x++) {
            rect(x*xspacing+scal, height/4+yvalues[x]-4*scal, scal, scal);
        }

        initmask = initmask - 1;
        if(count > 262){
            //mask++;
        }
    }
    count++;

    // plot image 
    image(imghk, 0, 0, width, height);
    image(imgkid, 0, 0, width, height);

    //noLoop();
}

// for sine curve

function calcWave() {
    // Increment theta (try different values for
    // 'angular velocity' here)
    theta += 0.02;// 波の速さはここ
  
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
        ellipse(x * xspacing, height / 2 + yvalues[x], scal, scal);
    }
  }
