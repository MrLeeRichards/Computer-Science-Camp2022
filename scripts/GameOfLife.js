var grid = [];
var gridUpdate = [];

var gridNeural = [];
var gridUpdateNeural = [];

var perceptron = new synaptic.Architect.Perceptron(9,12,1);

var brightness = 0; 

$(function() {
    $("#aStart").on("click", function() {
        loop();
    });

    $("#aTrain").on("click", function() {
        noLoop();
        train(500);
        initGrids();
    });

    $("#inputBrightness").on("change", function() {
        brightness = $("#inputBrightness").val();
    });
});

function updateCell(cells) {
    var cellState = cells[4];
    var neighborState = 0;

    for (var i = 0; i < 9; i++) {
        if (i != 4) {
            neighborState += cells[i];
        }
    }

    return neighborState == 3 || (cellState == 1 && neighborState == 2) ? 1 : 0;
}

function initGrids() {
    for (var x = 0; x < 50; x++) {
        grid[x] = [];
        gridUpdate[x] = [];
        gridNeural[x] = [];
        gridUpdateNeural[x] = [];

        for (var y = 0; y < 50; y++) {
            grid[x][y] = Math.random() >= 0.5 ? 1 : 0;
            gridUpdate[x][y] = grid[x][y];
            gridNeural[x][y] = grid[x][y];
            gridUpdateNeural[x][y] = grid[x][y];
        }
    }
}

function train(iters) {
    var trainingInput = [];

    for (var i = 0; i < iters; i++) {
        for (var j = 0; j < 9; j++) {
            trainingInput[j] = Math.random() >= 0.5 ? 1 : 0;
        }

        perceptron.activate(trainingInput);
        perceptron.propagate(.3, [updateCell(trainingInput)]);
    }
}

function setup() {
    noLoop();
    initGrids();

    var canvas = createCanvas(500, 500);
    background(0);
    noStroke();
}

function draw() {
    blendMode(BLEND);
    background(0);

    blendMode(SCREEN);
        for (var x = 0; x < 50; x++) {
            for (var y = 0; y < 50; y++) {
                fill(255, 0, 0, grid[x][y] * 255);
                square(x * 10, y * 10, 10);

                fill(0, 0, 255, gridNeural[x][y] * brightness);
                square(x * 10, y * 10, 10);
            }
        }
        
        for (var x = 0; x < 50; x++) {
            for (var y = 0; y < 50; y++) {
                // Run accurate rule
                gridUpdate[x][y] = updateCell([
                    grid[(x + 49) % 50][(y + 49) % 50],
                    grid[x][(y + 49) % 50],
                    grid[(x + 51) % 50][(y + 49) % 50],
                    grid[(x + 49) % 50][y],
                    grid[x][y],
                    grid[(x + 51) % 50][y],
                    grid[(x + 49) % 50][(y + 51) % 50],
                    grid[x][(y + 51) % 50],
                    grid[(x + 51) % 50][(y + 51) % 50]
                ]);

                // Run learning network
                gridUpdateNeural[x][y] = perceptron.activate([
                    gridNeural[(x + 49) % 50][(y + 49) % 50],
                    gridNeural[x][(y + 49) % 50],
                    gridNeural[(x + 51) % 50][(y + 49) % 50],
                    gridNeural[(x + 49) % 50][y],
                    gridNeural[x][y],
                    gridNeural[(x + 51) % 50][y],
                    gridNeural[(x + 49) % 50][(y + 51) % 50],
                    gridNeural[x][(y + 51) % 50],
                    gridNeural[(x + 51) % 50][(y + 51) % 50]
                ])[0];
            }
        }   

        for (var x = 0; x < 50; x++) {
            for (var y = 0; y < 50; y++) {
                grid[x][y] = gridUpdate[x][y];
                gridNeural[x][y] = gridUpdateNeural[x][y];
            }
        }
}

