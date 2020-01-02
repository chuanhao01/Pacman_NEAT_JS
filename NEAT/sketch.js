let population = new Population();
population.init(total_pop, mutation_rate);

let game = new Game();
let player_bird; 

function setup(){
    createCanvas(400, 600);
    background(0);
    population.initPopualtion(7, 1);

    game.init();
    game.setUpBirds(population.population);
}


function draw(){
    if(population.generation < 10){
        for(let i=0; i<200; i++){
            background(0);
            let is_done = game.updateFrame();
            if(is_done){
                population.generateSpecies();
                population.sortSpecies();
                population.prunePopulation();
                population.calculateSpecificFitness();
                population.generateMatingPool();
                population.crossoverPopulation();
                population.mutateCrossoverPopulation();
                game.resetGame();
                game.setUpBirds(population.population);
            }
        }
    }
    else{
        background(0);
        let is_done = game.updateFrame();
        if(is_done){
            population.generateSpecies();
            population.sortSpecies();
            population.prunePopulation();
            population.calculateSpecificFitness();
            population.generateMatingPool();
            population.crossoverPopulation();
            population.mutateCrossoverPopulation();
            game.resetGame();
            game.setUpBirds(population.population);
        } 
    }
}

function keyPressed(){
    if(key === ' '){
        player_bird.birdJump();
    }
}