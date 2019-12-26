const population = new Population();
let player = null;
let count = 0,
done = false;
const inputs = [0, 0, 0, 0, 0, 0, 0, 0];
let scores = [];
function setup(){
    population.init(NEAT_CONFIGS);
    population.initPopualtion();
    console.log(population.population);
    player = population.population[0];
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
        done = true;
    }
}