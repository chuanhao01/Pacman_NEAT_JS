/**
 * File: Sketch.js 
 * --------------------
 * Testing file for NEAT x PACMAN
 */

// Constants used for the game
const GAME_CONSTS = new GameConsts();

// tile representation
let tileRep;

// Maze image 
let mazeImg;

// game object array
let gameArr = [];

// NEAT population
const population = new Population();

function preload() {
    // load the maze image
    mazeImg = loadImage("./assets/map.jpg");

    // load the tile representation data
    // need to import the tile representation(contains info of which parts are on which tile)
    // it is a 31 x 28 2D array 
    // 1 = wall
    // 0 = dot
    // 8 = energizer
    // 6 = blank space
    tileRep = loadJSON("./data/tileRep.json");
}


function setup() {
    // setting up NEAT population
    population.init(NEAT_CONFIGS);
    population.initPopulation();

    // init the game array
    for (let i = 0; i < 100; i++) {
        // need to tag each game with player index
        gameArr.push([new Game(), i]);
        gameArr[i][0].init(GAME_CONSTS, tileRep);
    }
}

function draw() {
    // draw the image of maze
    image(mazeImg, 0, 0);

    // if all of the game instances are over, then generate the gameArr again
    // and generate the population again
    if (gameArr.length == 0) {
        // init the game array
        for (let i = 0; i < 100; i++) {
            // need to tag each game with player index
            gameArr.push([new Game(), i]);
            gameArr[i][0].init(GAME_CONSTS, tileRep);
        }
        population.getNewPopulation();

    } else {
        for (let i = gameArr.length - 1; i >= 0; i--) {
            // if the game instance is over,
            // set the fitness score of the player and 
            // splice the game that is over out of the game array
            if (gameArr[i][0].gameOver) {
                population.population[gameArr[i][1]].setScore(gameArr[i][0].getFitnessScore());
                gameArr.splice(i, 1);
            } else {
                // if not, let the players in population play , run and show the game instance
                gameArr[i][0].play(population.population[gameArr[i][1]]);
                gameArr[i][0].run();
                gameArr[i][0].show();
            }
        }
    }


    // Right before splicing the game when game is over, call population.population[i].setScore(fitnessScore)
    // After every game instance is over, call population.getNewPopulation(); to get new population

    // // Game events execution order
    // // ---------------------------
    // // 1) Coordination of setting current mode of ghost
    // // 2) Handling what to do for the current mode of ghost
    // // 3) Move ghost 
    // // 4) Keyboard controls for pacman
    // // 5) Move pacman
    // // 6) Background 
    // // 7) Show dots / energizers
    // // 8) Show ghost
    // // 9) Show pacman

    // // Game functions to be in the game run function
    // // 1) Coordination of setting current mode of ghost
    // // 2) Handling what to do for the current mode of ghost
    // // 3) Updating position of entities (Move ghost, Keyboard controls for pacman, Move pacman)

    // // Show entities (Background, Show dots / energizers, Show ghost, Show pacman)
}