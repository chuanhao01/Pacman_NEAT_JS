function NEAT_VISUAL(){
    this.init = function(player){
        this.player = player;
    };
    // Main functions
    this.getModelVisual = function(){
        let nodes_needed = this.player.brain.nodes_genes_needed,
        connections = this.player.brain.connections_history_list;
        let max_layer = this.player.brain.getMaxLayer();
        let layers = this.getLayers(nodes_needed, max_layer);
        let connections_needed = this.getEnabledConnections(connections);
        console.log(layers);
        console.log(connections_needed);
    };
    // Utility functions
    this.getLayers =  function(nodes_needed, max_layer){
        let layers = [];
        for(let i=0; i<max_layer; i++){
            for(let node of nodes_needed){
                if(node.layer_number === i){
                    // If the node is in the current layer
                    if(layers.length === 0){
                        // If there are no layers yet, init one
                        let layer = new Layer();
                        layer.init(i);
                        layer.addNode(node);
                        layers.push(layer);
                    }
                    else{
                        // If there are already layers made
                        let new_layer = true; 
                        for(let layer of layers){
                            if(layer.layer_number === node.layer_number){
                                // If it belongs to an existsing layer
                                new_layer = false;
                                layer.addNode(node);
                            }
                        }
                        if(new_layer){
                            // If a new layer is needed
                            let layer = new Layer();
                            layer.init(node.layer_number);
                            layer.addNode(node);
                            layers.push(layer);
                        }
                    }
                }
            }
        }
        return layers;
    };
    this.getEnabledConnections = function(connections){
        let enabled_connections = [];
        for(let connection of connections){
            if(connection.enabled){
                enabled_connections.push(connection);
            }
        }
        return enabled_connections;
    };
}