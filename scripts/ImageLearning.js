let imageToProcess;
let cnv;

let network = new synaptic.Architect.Perceptron(3,20,3);

let inputColor;
let trainingColor;
let outputColor;

let x = 0;
let y = 0;

const COLOR_SCALE = 1.0 / 255.0;

function preload() {
    imageToProcess = loadImage("../Data/GrandCanyon.jpg");
}

function setup() {
    cnv = createCanvas(imageToProcess.width + 50, imageToProcess.height);

    image(imageToProcess,0,0);
    noStroke();

    imageToProcess.loadPixels();
    console.log(imageToProcess.pixels);
}

function draw() {
    colorMode(HSB,360,100,100,100);
    inputColor = color(Math.random() * 360, Math.random() * 100, Math.random() * 100);
    trainingColor = color((hue(inputColor) + 180) % 360, saturation(inputColor), brightness(inputColor));
    outputColor = network.activate([red(inputColor) * COLOR_SCALE, green(inputColor) * COLOR_SCALE, blue(inputColor) * COLOR_SCALE]);
    network.propagate(.05, [red(trainingColor) * COLOR_SCALE, green(trainingColor) * COLOR_SCALE, blue(trainingColor) * COLOR_SCALE]);

    fill(inputColor);
    square(imageToProcess.width, 0, 50);
    fill(trainingColor);
    square(imageToProcess.width, 50, 50);

    colorMode(RGB,255,255,255,255);
    fill(color(outputColor[0] * 255, outputColor[1] * 255, outputColor[2] * 255));
    square(imageToProcess.width, 100, 50);

    for (var i = 0; i < 100; i++) {
        inputColor = color(imageToProcess.pixels[(x + y * imageToProcess.width) * 4],
                           imageToProcess.pixels[(x + y * imageToProcess.width) * 4 + 1],
                           imageToProcess.pixels[(x + y * imageToProcess.width) * 4 + 2]);
        outputColor = network.activate([red(inputColor) * COLOR_SCALE, green(inputColor) * COLOR_SCALE, blue(inputColor) * COLOR_SCALE]);
        fill(color(outputColor[0] * 255, outputColor[1] * 255, outputColor[2] * 255));
        square(x, y, 1);

        x++;
        if (x == imageToProcess.width) {
            x = 0;
            y++;
        }
        if (y == imageToProcess.height) {
            y = 0;
        }
    }
}