const population = new Population();
let inputs = [];

for(let i=0.01; i<1; i += 0.1){
    inputs.push(i);
}


function setup(){
    population.init(NEAT_CONFIGS);
    population.initPopulation();
    console.log(inputs);
    for(let i=0; i<inputs.length; i++){
        for(let player of population.population){
            let output = player.play([inputs[i]]);
            let fitness = 1 / Math.sqrt(((inputs[i] ** 2) - output[0]) ** 2);
            player.original_fitness += fitness;
        }
    }
    for(let player of population.population){
        player.setScore(player.original_fitness / inputs.length);
    }
    let best_player = population.getBestPlayer();
    best_player.enabled = true;
    console.log(best_player.play([0.5]), 0.5**2);
    console.log(best_player.original_fitness);
    population.getNewPopulation();

    for(let i=0; i<60; i++){
        for(let i=0; i<inputs.length; i++){
            for(let player of population.population){
                let output = player.play([inputs[i]]);
                let fitness = 1 / Math.sqrt(((inputs[i] ** 2) - output[0]) ** 2);
                player.original_fitness += fitness;
            }
        }
        for(let player of population.population){
            player.setScore(player.original_fitness / inputs.length);
        }
        population.getNewPopulation();
    }
    for(let i=0; i<inputs.length; i++){
        for(let player of population.population){
            let output = player.play([inputs[i]]);
            let fitness = 1 / Math.sqrt(((inputs[i] ** 2) - output[0]) ** 2);
            player.original_fitness += fitness;
        }
    }
    for(let player of population.population){
        player.setScore(player.original_fitness / inputs.length);
    }
    best_player = population.getBestPlayer();
    best_player.enabled = true;
    console.log(best_player.play([0.5]), 0.5**2);
    console.log(best_player.original_fitness);
    console.log('done');

    // for(let i=0; i<10; i++){
    //     for(let i=0; i<inputs.length; i++){
    //         for(let player of population.population){
    //             let output = player.play(inputs[i]);
    //             output = sigmoidActivation(output[0]);
    //             let fitness = customFitness(y[i], output);
    //             player.original_fitness += fitness;
    //         }
    //     }
    //     for(let player of population.population){
    //         player.setScore(player.original_fitness / 4);
    //     }
    //     population.getNewPopulation();
    // }
    // let best_player = population.getBestPlayer();
    // best_player.enabled = true;
    // for(let i=0; i<inputs.length; i++){
    //     let output = best_player.play(inputs[i]);
    //     output = sigmoidActivation(output[0]);
    //     let fitness = customFitness(y[i], output);
    //     console.log(inputs[i], output, fitness);
    // }
    // console.log(best_player);
    // console.log('done');
}

// function draw(){

// }

