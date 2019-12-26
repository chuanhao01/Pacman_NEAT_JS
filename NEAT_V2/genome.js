// Class template to create a genome, the 'brain'/ 'NNW' of the player
function Genome(){
    // Intialising the object
    this.init = function(nodes_history_list, connections_history_list, mutation_rates, weight_shift_coeff){
        // setting up genome configs
        this.weight_shift_coeff = weight_shift_coeff;
        this.nodes_history_list = nodes_history_list;
        this.connections_history_list = connections_history_list;
        this.mutation_rates = mutation_rates;
        this.nodes_genes_list = [];
        this.connections_genes_list = [];
        this.nodes_genes_needed = [];
        // Setting up the genes in the genome based on the history
        this.sortConnectionsHistory();
        this.generateNodeGenes();
        this.generateConnectionGenes();
        this.generateNodesGenesNeeded();
    };
    // Main functions
    this.think = function(inputs){
        // Clear the inputs of the nodes before starting
        this.clearNodes();
        // Feed in the inputs into the nodes
        for(let i=0; i<inputs.length; i++){
            this.nodes_genes_needed[i].input_sum = inputs[i];
        }
        // feedfwd the nodes and to get the outputs
        const max_layer = this.getMaxLayer();
        for(let i=0; i<=max_layer; i++){
            for(let node_gene of this.nodes_genes_needed){
                if(node_gene.layer_number === i){
                    node_gene.feedForward();
                }
            }
        }
        // Then get the output
        const outputs = this.getOutput();
        return outputs;
    };
    // Utility functions
    // This sorts this.connection_history_list by innovation number
    this.sortConnectionsHistory = function(){
        this.connections_history_list.sort((connection_a, connection_b) => {
            return connection_a.innovation_number - connection_b.innovation_number;
        });
    };
    // Here we generate the required node_genes used by the genome
    this.generateNodeGenes = function(){
        let new_node_genes_list = [];
        for(let node of this.nodes_history_list){
            let node_gene = new NodeGene();
            node_gene.init(node.node_number, node.type, node.layer_number);
            new_node_genes_list.push(node_gene);
        }
        this.nodes_genes_list = new_node_genes_list;
    };
    // Here we generate the required connection_genes by the genome
        this.generateConnectionGenes = function(){
        let new_connections_genes_list = [];
        for(let connection of this.connections_history_list){
            let connection_gene = new ConnectionGene();
            // Here the input and output node are passed by reference
            connection_gene.init(this.getNode(connection.in_node), this.getNode(connection.out_node), connection.weight, connection.innovation_number);
            new_connections_genes_list.push(connection_gene);
        }
        this.connections_genes_list = new_connections_genes_list;
    };
    // Gets the node at the index node_number - 1. As index = number_wanted - 1
    this.getNode = function(node_number){
        return this.nodes_genes_list[node_number - 1];
    };
    // Generate the nodes that the genome uses based on the connections
    this.generateNodesGenesNeeded = function(){
        let nodes_needed = [];
        // Here, for every connection, check if it is used. Then add the node_gene into the list based on connections used
        for(let connection_gene of this.connections_genes_list){
            if(connection_gene.enabled){
                let in_node = connection_gene.in_node,
                out_node = connection_gene.out_node; 
                in_node.output_connections.push(connection_gene);
                if(nodes_needed.length < 1){
                    nodes_needed.push(in_node);
                    nodes_needed.push(out_node);
                }
                else{
                    let add_in = true,
                    add_out = true;
                    for(let node_gene of nodes_needed){
                        if(node_gene.node_number === in_node.node_number){
                            add_in = false;
                        }
                        if(node_gene.node_number === out_node.node_number){
                            add_out = false;
                        }
                    }
                    if(add_in){
                        nodes_needed.push(in_node);
                    }
                    if(add_out){
                        nodes_needed.push(out_node);
                    }
                }
            }
        }
        // Set the nodes_genes needed in the object var
        this.nodes_genes_needed = nodes_needed;
    };
    // Clears the input sum in all the node_gene used for the genome
    this.clearNodes = function(){
        for(let node_gene of this.nodes_genes_needed){
            node_gene.clearNode();
        }
    };
    // Gets the max layer number of all the node_gene used, returns the layer number
    this.getMaxLayer = function(){
        let max_layer = 0;
        for(let node_gene of this.nodes_genes_needed){
            if(node_gene.layer_number > max_layer){
                max_layer = node_gene.layer_number;
            }
        }
        return max_layer;
    };
    // Getting the output of output nodes in an array of [output_1, output_2, ...]
    this.getOutput = function(){
        let outputs = [];
        for(let node_gene of this.nodes_genes_needed){
            if(node_gene.type === 'output'){
                outputs.push(node_gene.getOutput());
            }
        }
        return outputs;
    };
}