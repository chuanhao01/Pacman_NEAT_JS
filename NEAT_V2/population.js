// This is the main population object that is interfaced with, think of it as the NEAT object
function Population(){
    this.init = function(config){
        // Call this function intialise the population object. Also act as setting up the object
        // Here config is an object. For specs look at neat.md
        // Setting up population configs
        this.total_pop = config.total_pop;
        this.global_innovation_number = 1;
        this.global_node_number = 1;
        this.global_connection_history_list = [];
        this.global_node_history_list = [];
        this.global_add_node_mutation_list = [];
        this.population = [];
        this.all_species_list = [];
        this.mating_pool = [];
        this.crossover_population = [];
        this.generation = 1;
        // NEAT configs
        this.mutation_rates = config.mutation_rates;
        this.c1 = 1;
        this.c2 = 0.5;
        this.compatibility_threshold = 2.5;
        this.prune_percentage = 0.5;
    };
}