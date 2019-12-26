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
        this.population = [];
        this.generation = 1;
        // NEAT configs
        this.mutation_rates = config.mutation_rates;
        this.weight_shift_coeff = config.weight_shift_coeff;
        this.c1 = config.c1;
        this.c2 = config.c2;
        this.compatibility_threshold = config.compatibility_threshold;
        this.prune_percentage = config.prune_percentage;
        // Genome configs
        this.input_nodes = config.input_nodes;
        this.output_nodes = config.output_nodes;
    };
    this.initPopualtion = function(){
        // Getting the number of input and output nodes from config file
        let input_nodes = this.input_nodes,
        output_nodes = this.output_nodes;
        // Generating input and output nodes history below
        // Does this once as all of the players in gen 1 have the same number of nodes
        let node_history_list = [];
        let input_nodes_list = [],
        output_nodes_list = [];
        for(let i=0; i<input_nodes; i++){
            let node = new NodeHistory();
            node.init(this.global_node_number, 'input', 0);
            input_nodes_list.push(node);
            node_history_list.push(node);
            this.global_node_number++;
        }
        for(let i=0; i<output_nodes; i++){
            let node = new NodeHistory();
            node.init(this.global_node_number, 'output', -1);
            output_nodes_list.push(node);
            node_history_list.push(node);
            this.global_node_number++;
        }
        // Update global list
        this.global_node_history_list = node_history_list;
        // Generate population here
        let population = [];
        for(let i=0; i<this.total_pop; i++){
            let new_nodes_history_list = this.cloneGlobalNodeHistory(),
            new_connections_history_list = [];
            // For every input node, map it to an output node, until a fully connected layer is formed
            for(let input_node of input_nodes_list){
                for(let output_node of output_nodes_list){
                    // Connection history is generated here
                    let new_connection = this.generateConnection(input_node.node_number, output_node.node_number);
                    new_connections_history_list.push(new_connection);
                }
            }
            // Now create the player, passing in the node_history and connection_history
            let player = new Player();
            player.init(new_nodes_history_list, new_connections_history_list, this.mutation_rates, this.weight_shift_coeff);
            population.push(player);
        }
        // Set current population as the population generated here
        this.population = population;
    };
    // Main functions
    // Function called to generate a connection_history based on nodes and previously generated connections
    this.generateConnection = function(in_node, out_node){
        // Here in_node and out_node are the node number, not index
        // Generating the first connection if it does not exist
        if(this.global_connection_history_list.length < 1){
            // Generate connection
            let first_connection = new ConnectionHistory();
            let weight = random(-2, 2);
            first_connection.init(in_node, out_node, weight, this.global_innovation_number);
            // Update global connection history
            this.global_connection_history_list.push(first_connection);
            this.global_innovation_number++;
            return first_connection.clone();
        }
        // If there are already other connections
        else{
            // Checking through all connections to see if the connection has been made before
            let is_new = true,
            old_connection;
            for(let connection of this.global_connection_history_list){
                if(connection.in_node === in_node && connection.out_node === out_node){
                    is_new = false;
                    old_connection = connection.clone();
                    let new_weight = random(-2, 2);
                    old_connection.weight = new_weight;
                }
            }
            // If the connection is new generate the new one
            if(is_new){
                // Gen
                let new_connection = new ConnectionHistory();
                let weight = random(-2, 2);
                new_connection.init(in_node, out_node, weight, this.global_innovation_number);
                // Update
                this.global_connection_history_list.push(new_connection);
                this.global_innovation_number++;
                // console.log(new_connection);
                return new_connection.clone();
            }
            // If the connection has been made before, return it
            else{
                return old_connection;
            }
        }
    };
    // Utility functions
    this.cloneGlobalNodeHistory = function(){
        let cloned_list = [];
        for(let node_history of this.global_node_history_list){
            cloned_list.push(node_history.clone());
        }
        return cloned_list;
    };
}