function Player(){
    // Set player vars here
    // Original fitness is score given by the game, adjusted_fitness is score specific fitness sharing
    this.original_fitness = 0;
    this.adjusted_fitness = 0;
    // this var is to keep track if the player is still alive
    this.enabled = true;
    // Method call to generate the brain for the first generation
    // Usually called by from the population class
    this.init = function(nodes_history_list, connections_history_list, mutation_rates, weight_shift_coeff){
        this.brain = new Genome();
        this.brain.init(nodes_history_list, connections_history_list, mutation_rates, weight_shift_coeff);
    };
    /*------------------------------------------------------------------------------------*/
    // Function called to get the player to 'play'
    // In essence, this feeds in the input into the brain and gets an output which is returned
    this.play = function(inputs){
        if(this.enabled){
            // If the player can still play, send the output when called
            const outputs = this.brain.think(inputs);
            return outputs;
        }
    };
    // Utility function
    this.setScore = function(score){
        this.original_fitness = score;
        this.enabled = false;
    };
}