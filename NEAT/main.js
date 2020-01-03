const population = new Population();

function setup(){
    // population.init(NEAT_CONFIGS);
    // population.initPopulation();
    // for(let i=0; i<20; i++){
    //     for(let player of population.population){
    //         player.setScore(1);
    //     }
    //     population.getNewPopulation();
    // }
    // let player = population.population[0];
    // console.log(JSON.stringify(player.savePlayer()));

    let player = new Player();
    model = JSON.parse(model);
    player.loadPlayer(model);
    // console.log(player.brain.nodes_genes_needed);

    const nv = new NEAT_VISUAL();
    nv.init(player);
    nv.getModelVisual();
}

function draw(){

}

