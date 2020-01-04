const NEAT_CONFIGS = {
    // Populations configurations
    total_pop: 500,
    // NEAT configurations
    mutation_rates: {
        add_node: 0.01,
        add_connection: 0.05,
        shift_weight: 0.3,
        new_weight: 0.05,
        enable_connection: 0.4 
    },
    weight_shift_coeff: 0.5,
    c1: 1,
    c2: 0.5,
    compatibility_threshold: 3,
    prune_percentage: 0.5,
    // Genome configs
    input_nodes: 17,
    output_nodes: 4,
};
