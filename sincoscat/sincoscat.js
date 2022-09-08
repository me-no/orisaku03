// for actual size
var scal = 2;
var actualSize = 512;
var width = actualSize*scal;
var height = actualSize*scal;

// for sine curve
let xspacing = 2*scal; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 24.0*scal; // Height of wave
let period = 180.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave

let count;
let mask;

var colors = [
    ["lightpink", 208, 125, 155],
    ["mainpink", 199, 77, 100], 
    ["lightorange", 251, 188, 37],
    ["orange", 238, 133, 46],
    //["deepblue", 31, 95, 143],
    ["wordblue", 41,39,79], 
    ["strokeblue", 0, 33, 54], 
    ["birthblue", 67,140,181],
];

function preload() {
    // Font
    //font = loadFont("../assets/misaki_gothic.ttf");

    // Images
    img = loadImage("main.png");
    imgcat = loadImage("cat.png");
    imglet = loadImage("letter.png");
}

function setup () {
    createCanvas(actualSize*scal, actualSize*scal);
    background(255);
    //frameRate(33);
    image(img, 0, 0, width, height);

    // for sine curve
    w =  width + xspacing;
    dx = (TWO_PI / period) * xspacing;
    yvalues = new Array(floor(w / xspacing));

    count = 0;
    mask = 0;

}

function draw() {
    image(img, 0, 0, width, height);

    // plot sine curve
    calcWave();
    //renderWave();
    theta += 0.001;
    let phi = theta;
    for (let i = 0; i < yvalues.length; i++){
        yvalues[i] = sin(phi) * amplitude;
        phi +=dx;
    }
    for (let x = 0; x < yvalues.length - mask; x++) {
        noStroke();
        fill(41,39,79);
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
        for (let x = 0; x < yvalues.length - mask + 50; x++) {
            noStroke();
            fill(41,39,79);
            rect(x*xspacing+scal, height/2+yvalues[x]-4*scal, scal, scal);
        }
        if(count > 262){mask++;}
    }
    count++;

    // plot image 
    image(imgcat, 0, 0, width, height);

    //noLoop();
}

// for sine curve

function calcWave() {
    // Increment theta (try different values for
    // 'angular velocity' here)
    theta += 0.03;// 波の速さはここ
  
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
