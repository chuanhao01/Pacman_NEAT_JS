function Player(){
    // Set player vars here
    // Original fitness is score given by the game, adjusted_fitness is score specific fitness sharing
    this.original_fitness = 0;
    this.adjusted_fitness = 0;
    // this var is to keep track if the player is still alive
    this.enabled = true;
    // Method call to generate the brain for the first generation
    // Usually called by from the population class
    this.init = function(nodes_history_list, connections_history_list, mutation_rate){
        this.brain = new Genome();
        this.brain.init(nodes_history_list, connections_history_list, mutation_rate);
    };
    /*------------------------------------------------------------------------------------*/
}