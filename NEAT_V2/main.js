const population = new Population();
let count = 0,
done = false;
let inputs = [[0, 0], [0, 1], [1, 0], [1, 1]];
let y = [0, 1, 1, 0];

population.init(NEAT_CONFIGS);
population.initPopulation();
for(let i=0; i<5; i++){
    for(let i=0; i<inputs.length; i++){
        for(let player of population.population){
            let output = player.play(inputs[i]);
            output = sigmoidActivation(output[0]);
            let loss = binCrossEntropy(y[i], output);
            let fitness = 1/loss;
            player.original_fitness += fitness;
        }
    }
    for(let player of population.population){
        player.setScore(player.original_fitness / 4);
    }
    console.log(population.population);
    population.getNewPopulation();
}
console.log('done');
// function setup(){
//     population.init(NEAT_CONFIGS);
//     population.initPopualtion();
//     // for(let i=0; i<inputs.length; i++){
//     //     for(let player of population.population){
//     //         let output = player.play(inputs[i]);
//     //         let loss = binCrossEntropy(y[i], output);
//     //         let fitness = 1/loss;
//     //         player.original_fitness += fitness;
//     //     }
//     // }
//     // for(let player of population.population){
//     //     player.setScore(player.original_fitness / 4);
//     // }
//     // population.getNewPopulation();

//     // for(let i=0; i<100; i++){
//     //     for(let i=0; i<inputs.length; i++){
//     //         for(let player of population.population){
//     //             let output = player.play(inputs[i]);
//     //             output = sigmoidActivation(output[0]);
//     //             let loss = binCrossEntropy(y[i], output);
//     //             let fitness = 1/loss;
//     //             player.original_fitness += fitness;
//     //         }
//     //     }
//     //     for(let player of population.population){
//     //         player.setScore(player.original_fitness / 4);
//     //     }
//     //     population.getNewPopulation();
//     // }
//     // console.log('done');
// }

// function draw(){

// }

