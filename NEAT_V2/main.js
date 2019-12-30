const population = new Population();
let count = 0,
done = false;
let scores = [];
function setup(){
    population.init(NEAT_CONFIGS);
    population.initPopualtion();
    console.log(population.population);
    for(let i=0; i<population.population.length; i++){
        scores.push(Math.floor(random(0, 100)));
    }
}

function draw(){
    if(count < 5 && !done){
        // player.play(inputs);
        count++;
    }else if(!done){
        // Kill all the players and set their score
        for(let i=0; i<population.population.length; i++){
            population.population[i].setScore(scores[i]);
        }
        population.getNewPopulation();
        done = true;
    }
}