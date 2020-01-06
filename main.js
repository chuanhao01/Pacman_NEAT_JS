const main = {
    // NEAT population
    population: new Population(),

    // Game array
    gameArr: [],

    // Game batch array
    gameBatch: [],

    // population size
    popSize: 500,

    // batch size
    batchSize: 20,

    // tile representation
    tileRep: null,

    // maze image
    mazeImg: null,

    // slider object
    slider: null,

    // Slider min value
    sliderMinVal: 1,

    // Slider max value
    sliderMaxVal: 50,

    // to be put into function preload
    loadData() {
        // load the maze image
        this.mazeImg = loadImage("./Game/assets/map.jpg");

        // load the tile representation data
        // need to import the tile representation(contains info of which parts are on which tile)
        // it is a 31 x 28 2D array 
        // 1 = wall
        // 0 = dot
        // 8 = energizer
        // 6 = blank space
        this.tileRep = loadJSON("./Game/data/tileRep.json");

    },
    setUp() {
        // Main set up here
        // setting up NEAT population
        this.population.init(NEAT_CONFIGS);
        this.population.initPopulation();

        // init the game array
        for (let i = 0; i < this.popSize; i++) {
            // need to tag each game with player index
            this.gameArr.push([new Game(), i]);
            this.gameArr[i][0].init(GAME_CONSTS, this.tileRep);
        }

        // init the game batch array (taking the first 5 game instances array)
        for (let i = 0; i < this.batchSize; i++) {
            this.gameBatch.push(this.gameArr[i]);
        }
        // init slider to speed up the training process
        this.slider = createSlider(this.sliderMinVal, this.sliderMaxVal, this.sliderMinVal);
    },
    run() {
        // Main run function here
        for (let x = 0; x < this.slider.value(); x++) {
            // draw the image of maze
            image(this.mazeImg, 0, 0);

            // if all of the game instances are over, then generate the gameArr again
            // and generate the population again
            // also, take the first 5 game instances in gameArr into the gameBatch Arr
            if (this.gameArr.length == 0) {
                // init the game array
                for (let i = 0; i < this.popSize; i++) {
                    // need to tag each game with player index
                    this.gameArr.push([new Game(), i]);
                    this.gameArr[i][0].init(GAME_CONSTS, this.tileRep);
                }
                this.population.getNewPopulation();

                // init the game batch array (taking the first 5 game instances array)
                for (let i = 0; i < this.batchSize; i++) {
                    this.gameBatch.push(this.gameArr[i]);
                }

            } else {
                // Doing batch learning
                // if the batch is done learning, then re-generate the batch
                if (this.gameBatch.length == 0) {
                    // console.log(this.gameArr.length);
                    // init the game batch array (taking the first 5 game instances array)
                    for (let i = 0; i < this.batchSize; i++) {
                        this.gameBatch.push(this.gameArr[i]);
                    }

                } else {
                    for (let i = this.gameBatch.length - 1; i >= 0; i--) {
                        // if the game instance is over,
                        // set the fitness score of the player and 
                        // splice out the game in the batch game array
                        // splice the game that is over out of the game array
                        if (this.gameBatch[i][0].gameOver) {
                            this.population.population[this.gameBatch[i][1]].setScore(this.gameBatch[i][0].getFitnessScore());
                            this.gameBatch.splice(i, 1);
                            this.gameArr.splice(i, 1);

                        } else {
                            // if not, let the players in population play , run and show the game instance
                            this.gameBatch[i][0].play(this.population.population[this.gameBatch[i][1]]);
                            this.gameBatch[i][0].run();
                            this.gameBatch[i][0].show();

                        }
                    }
                }
            }

        }

    }
};

// P5.js below
function preload() {
    main.loadData();
}

function setup() {
    main.setUp();
}

function draw() {
    main.run();
}
