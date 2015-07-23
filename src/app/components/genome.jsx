class Component extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        var el = React.findDOMNode(this);
        this.create(el, {
            width: '200px',
            height: '300px'
        }, this.getChartState());
    }

    componentDidUpdate() {
        var el = React.findDOMNode(this);
        this.update(el, this.getChartState());
    }

    getChartState() {
        return {
            data: this.props.data.toD3()
        };
    }

    componentWillUnmount() {
        var el = React.findDOMNode(this);
        this.destroy(el);
    }

    create(el, props, state){
        var width = 300,
            height = 300;

        this.force = d3.layout.force()
            .gravity(1)
            .charge(-120)
            .linkDistance(10)
            .size([width, height]);

        this.svg = d3.select(el).append("svg")
            .attr("width", width)
            .attr("height", height);

        this.update(el, state);
    }

    update(el,state){
        this.svg.selectAll(".link").remove();
        this.svg.selectAll(".node").remove();

        this.force
            .nodes(state.data.nodes)
            .links(state.data.links)
            .start();

        var link =  this.svg.selectAll(".link")
            .data(state.data.links)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke", "red")
            .style("stroke-width", function(d) { return Math.sqrt(d.value); });

        var node = this.svg.selectAll(".node")
            .data(state.data.nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", 2)
            .style("fill", "green")
            .call(this.force.drag);

        node.append("tit02.le")
            .text(function(d) { return d.name; });

        this.force.on("tick", function() {
            link.attr("x1", function(d) { return Math.floor(d.source.x); })
                .attr("y1", function(d) { return Math.floor(d.source.y); })
                .attr("x2", function(d) { return Math.floor(d.target.x); })
                .attr("y2", function(d) { return Math.floor(d.target.y); });

            node.attr("cx", function(d) { return Math.floor(d.x); })
                .attr("cy", function(d) { return Math.floor(d.y); });
        });
        this.force.start();
    }

    destroy(el){

    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

module.exports = Component;