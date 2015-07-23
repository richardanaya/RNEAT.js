class Organism {
    species = []
}

class Species {
    genomes = []
}

class Genome {
    nodeCount = 0;

    constructor(inputs,outputs){
        inputs.forEach((n)=>{
            var node = new NodeGene(n);
            node.type = "input";
            this.nodes.push(node)
        });
        outputs.forEach((n)=>{
            var node = new NodeGene(n);
            node.type = "output";
            this.nodes.push(node)
        });
    }

    addNewNode(){
        var node = new NodeGene("Node_"+this.nodeCount);
        this.nodeCount++;
        this.nodes.push(node);
        return node;
    }

    mutate(){
        var source = this.getRandomNode();
        var target = this.getRandomNode(source)
        var connection = this.getConnectionBetween(source,target);
        var s = Math.random();
        if(s<.5){
            this.mutateConnectionBetweenNodes(source,target,connection);
        }
        else {
            this.mutateNodeBetweenNodes(source,target,connection)
        }
    }

    mutateNodeBetweenNodes(source,target,connection){
        if(connection){
            this.removeConnectionBetween(connection);
        }
        var newNode = this.addNewNode();
        this.createConnectionBetween(source,newNode);
        this.createConnectionBetween(newNode,target);
    }

    mutateConnectionBetweenNodes(source,target,connection){
        if(connection){
            connection.disabled = true;
        }
        else {
            this.createConnectionBetween(source,target);
        }
    }

    getConnectionBetween(source,target){
        this.connections.filter((l)=>(l.source == source && l.target == target) || (l.source == target && l.target == source))[0];
    }
    
    createConnectionBetween(source,target){
        this.connections.push(new ConnectGene(source,target))
    }

    removeConnectionBetween(connection){
        this.connections.splice(this.connections.indexOf(connection),1);
    }

    getRandomNode(excludeNode){
        var n = this.nodes[Math.floor(Math.random()*this.nodes.length)];
        while(n == excludeNode){
            n = this.nodes[Math.floor(Math.random()*this.nodes.length)];
        }
        return n;
    }

    fitness = 0
    nodes = []
    connections = []

    toD3(){
        var result = {
            nodes : [],
            links : []
        }

        this.nodes.forEach((n)=>{
            result.nodes.push({name:n.name,group:1,type:n.type})
        })

        this.connections.forEach((c)=>{
            result.links.push({source:this.nodes.indexOf(c.source),target:this.nodes.indexOf(c.target),value:1})
        })

        return result;
    }
}

class NodeGene {
    name = ""

    constructor(name){
        this.name = name;
    }
}

class ConnectGene {
    constructor(source,target){
        this.source = source;
        this.target = target;
    }

    innovationStages = []
    disabled = false
    weight = 0
}

exports.Genome = Genome;
