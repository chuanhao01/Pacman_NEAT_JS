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
        // Setting up the genes in the genome based on the history
        this.sortConnectionsHistory();
        this.generateNodeGenes();
        this.generateConnectionGenes();
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
}