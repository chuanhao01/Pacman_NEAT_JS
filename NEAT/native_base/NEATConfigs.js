const NEAT_CONFIGS = {
    // Populations configurations
    total_pop: 500,
    // NEAT configurations
    mutation_rates: {
        add_node: 0.0001,
        add_connection: 0.0002,
        shift_weight: 0.1,
        new_weight: 0.01,
        enable_connection: 0.4 
    },
    weight_shift_coeff: 0.03,
    c1: 1,
    c2: 0.5,
    compatibility_threshold: 2.5,
    prune_percentage: 0.5,
    // Genome configs
    input_nodes: 17,
    output_nodes: 4,
};
