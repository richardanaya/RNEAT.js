(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
  var Main = require('./components/main.jsx');
  var Network = require('./components/network.jsx');

  var routes = React.createElement(
    ReactRouter.Route,
    { handler: Main },
    React.createElement(ReactRouter.Route, { path: "/", handler: Network })
  );

  ReactRouter.run(routes, ReactRouter.HashLocation, function (Root) {
    React.render(React.createElement(Root, null), document.body);
  });
})();

},{"./components/main.jsx":4,"./components/network.jsx":5}],2:[function(require,module,exports){
"use strict";

exports.mutate = Action.create();

},{}],3:[function(require,module,exports){
'use strict';

var Component = (function (_React$Component) {
    babelHelpers.inherits(Component, _React$Component);

    function Component(props) {
        babelHelpers.classCallCheck(this, Component);

        babelHelpers.get(Object.getPrototypeOf(Component.prototype), 'constructor', this).call(this, props);
    }

    babelHelpers.createClass(Component, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var el = this.refs.holder.getDOMNode();
            this.create(el, {
                width: '200px',
                height: '300px'
            }, this.getChartState());
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var el = React.findDOMNode(this);
            this.update(el, this.getChartState());
        }
    }, {
        key: 'getChartState',
        value: function getChartState() {
            return {
                data: this.props.data.toD3()
            };
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var el = React.findDOMNode(this);
            this.destroy(el);
        }
    }, {
        key: 'create',
        value: function create(el, props, state) {
            var width = 300,
                height = 300;

            this.force = d3.layout.force().gravity(1).charge(-200).linkDistance(50).size([width, height]);

            this.svg = d3.select(el).append("svg").attr("width", width).attr("height", height);

            this.update(el, state);
        }
    }, {
        key: 'update',
        value: function update(el, state) {
            this.svg.selectAll(".link").remove();
            this.svg.selectAll(".node").remove();

            this.force.nodes(state.data.nodes).links(state.data.links).start();

            var link = this.svg.selectAll(".link").data(state.data.links).enter().append("line").attr("class", "link").style("stroke", "black").style("stroke-width", function (d) {
                return Math.sqrt(d.value);
            });

            var node = this.svg.selectAll(".node").data(state.data.nodes).enter().append("circle").attr("class", "node").attr("r", 6).style("fill", function (d) {
                if (d.type == "input") {
                    return "red";
                } else if (d.type == "output") {
                    return "blue";
                }
                return "green";
            }).call(this.force.drag);

            node.append("tit02.le").text(function (d) {
                return d.name;
            });

            this.force.on("tick", function () {
                link.attr("x1", function (d) {
                    return Math.floor(d.source.x);
                }).attr("y1", function (d) {
                    return Math.floor(d.source.y);
                }).attr("x2", function (d) {
                    return Math.floor(d.target.x);
                }).attr("y2", function (d) {
                    return Math.floor(d.target.y);
                });

                node.attr("cx", function (d) {
                    return Math.floor(d.x);
                }).attr("cy", function (d) {
                    return Math.floor(d.y);
                });
            });
            this.force.start();
        }
    }, {
        key: 'destroy',
        value: function destroy(el) {}
    }, {
        key: 'render',
        value: function render() {
            var nodeDivs = this.props.data.nodes.map(function (n) {
                return React.createElement(
                    'div',
                    { key: n.name },
                    n.name
                );
            });

            return React.createElement(
                'div',
                null,
                React.createElement('div', { ref: "holder" }),
                nodeDivs
            );
        }
    }]);
    return Component;
})(React.Component);

module.exports = Component;

},{}],4:[function(require,module,exports){
"use strict";

var Main = (function (_React$Component) {
  babelHelpers.inherits(Main, _React$Component);

  function Main() {
    babelHelpers.classCallCheck(this, Main);
    babelHelpers.get(Object.getPrototypeOf(Main.prototype), "constructor", this).apply(this, arguments);
  }

  babelHelpers.createClass(Main, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(ReactRouter.RouteHandler, null)
      );
    }
  }], [{
    key: "childContextTypes",
    value: {
      router: React.PropTypes.object
    },
    enumerable: true
  }, {
    key: "contextTypes",
    value: {
      router: React.PropTypes.func
    },
    enumerable: true
  }]);
  return Main;
})(React.Component);

module.exports = Main;

},{}],5:[function(require,module,exports){
"use strict";

var _storesNetworkStore = require("../stores/networkStore");

var _storesNetworkStore2 = babelHelpers.interopRequireDefault(_storesNetworkStore);

var _actionsNetworkActions = require("../actions/networkActions");

var _actionsNetworkActions2 = babelHelpers.interopRequireDefault(_actionsNetworkActions);

var _genomeJsx = require("./genome.jsx");

var _genomeJsx2 = babelHelpers.interopRequireDefault(_genomeJsx);

var _rneatJs = require("../rneat.js");

var Component = (function (_React$Component) {
    babelHelpers.inherits(Component, _React$Component);

    function Component() {
        babelHelpers.classCallCheck(this, Component);
        babelHelpers.get(Object.getPrototypeOf(Component.prototype), "constructor", this).apply(this, arguments);
        this.state = {
            genome: new _rneatJs.Genome(["Button A", "Button B"], ["Go"])
        };
    }

    babelHelpers.createClass(Component, [{
        key: "doMutate",
        value: function doMutate() {
            this.state.genome.mutate();
            this.setState(this.state);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "page" },
                React.createElement(
                    "form",
                    { className: "col s12" },
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "h4",
                            null,
                            "Neural Network Experiment"
                        ),
                        "Let's make some organism!"
                    ),
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "input-field col s4" },
                            React.createElement(_genomeJsx2["default"], { data: this.state.genome })
                        ),
                        React.createElement(
                            "div",
                            { className: "input-field col s4" },
                            React.createElement(
                                "button",
                                { onClick: this.doMutate.bind(this) },
                                "Mutate"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "input-field col s4" },
                            "C"
                        )
                    )
                )
            );
        }
    }]);
    return Component;
})(React.Component);

module.exports = Component;

},{"../actions/networkActions":2,"../rneat.js":6,"../stores/networkStore":7,"./genome.jsx":3}],6:[function(require,module,exports){
"use strict";

var Organism = function Organism() {
    babelHelpers.classCallCheck(this, Organism);
    this.species = [];
};

var Species = function Species() {
    babelHelpers.classCallCheck(this, Species);
    this.genomes = [];
};

var Genome = (function () {
    function Genome(inputs, outputs) {
        var _this = this;

        babelHelpers.classCallCheck(this, Genome);
        this.nodeCount = 0;
        this.fitness = 0;
        this.nodes = [];
        this.connections = [];

        inputs.forEach(function (n) {
            var node = new NodeGene(n);
            node.type = "input";
            _this.nodes.push(node);
        });
        outputs.forEach(function (n) {
            var node = new NodeGene(n);
            node.type = "output";
            _this.nodes.push(node);
        });
    }

    babelHelpers.createClass(Genome, [{
        key: "addNewNode",
        value: function addNewNode() {
            var node = new NodeGene("Node_" + this.nodeCount);
            this.nodeCount++;
            this.nodes.push(node);
            return node;
        }
    }, {
        key: "mutate",
        value: function mutate() {
            var source = this.getRandomNode();
            var target = this.getRandomNode(source);
            var connection = this.getConnectionBetween(source, target);
            var s = Math.random();
            if (s < .5) {
                this.mutateConnectionBetweenNodes(source, target, connection);
            } else {
                this.mutateNodeBetweenNodes(source, target, connection);
            }
        }
    }, {
        key: "mutateNodeBetweenNodes",
        value: function mutateNodeBetweenNodes(source, target, connection) {
            if (connection) {
                this.removeConnectionBetween(connection);
            }
            var newNode = this.addNewNode();
            this.createConnectionBetween(source, newNode);
            this.createConnectionBetween(newNode, target);
        }
    }, {
        key: "mutateConnectionBetweenNodes",
        value: function mutateConnectionBetweenNodes(source, target, connection) {
            if (connection) {
                connection.disabled = true;
            } else {
                this.createConnectionBetween(source, target);
            }
        }
    }, {
        key: "getConnectionBetween",
        value: function getConnectionBetween(source, target) {
            this.connections.filter(function (l) {
                return l.source == source && l.target == target || l.source == target && l.target == source;
            })[0];
        }
    }, {
        key: "createConnectionBetween",
        value: function createConnectionBetween(source, target) {
            this.connections.push(new ConnectGene(source, target));
        }
    }, {
        key: "removeConnectionBetween",
        value: function removeConnectionBetween(connection) {
            this.connections.splice(this.connections.indexOf(connection), 1);
        }
    }, {
        key: "getRandomNode",
        value: function getRandomNode(excludeNode) {
            var n = this.nodes[Math.floor(Math.random() * this.nodes.length)];
            while (n == excludeNode) {
                n = this.nodes[Math.floor(Math.random() * this.nodes.length)];
            }
            return n;
        }
    }, {
        key: "toD3",
        value: function toD3() {
            var _this2 = this;

            var result = {
                nodes: [],
                links: []
            };

            this.nodes.forEach(function (n) {
                result.nodes.push({ name: n.name, group: 1, type: n.type });
            });

            this.connections.forEach(function (c) {
                result.links.push({ source: _this2.nodes.indexOf(c.source), target: _this2.nodes.indexOf(c.target), value: 1 });
            });

            return result;
        }
    }]);
    return Genome;
})();

var NodeGene = function NodeGene(name) {
    babelHelpers.classCallCheck(this, NodeGene);
    this.name = "";

    this.name = name;
};

var ConnectGene = function ConnectGene(source, target) {
    babelHelpers.classCallCheck(this, ConnectGene);
    this.innovationStages = [];
    this.disabled = false;
    this.weight = 0;

    this.source = source;
    this.target = target;
};

exports.Genome = Genome;

},{}],7:[function(require,module,exports){
"use strict";

var CalculateActions = require('../actions/networkActions');

var DataStore = (function (_Store) {
    babelHelpers.inherits(DataStore, _Store);

    function DataStore() {
        babelHelpers.classCallCheck(this, _DataStore);

        babelHelpers.get(Object.getPrototypeOf(_DataStore.prototype), "constructor", this).call(this, Immutable.fromJS({
            method: "w2",
            w2Annual: 50000,
            w2Hourly: 0,
            benefits: 0,
            contractAnnual: 0,
            contractHourly: 0,
            takehomeAnnually: 0,
            takehomeMonthly: 0,
            percentWorkableYear: 100,
            workableDays: 365,
            hoursPerDay: 8,
            tax: 25,
            selfEmploymentTax: 7.65,
            vacationDays: 30
        }));
        this.updaters = {
            "contractannual": this.updateContractAnnualSalary.bind(this),
            "contracthourly": this.updateContractHourlySalary.bind(this),
            "takehomeannually": this.updateTakeHomeAnnualSalary.bind(this),
            "takehomemonthly": this.updateTakeHomeMonthlySalary.bind(this),
            "w2annually": this.updateW2AnnualSalary.bind(this),
            "w2hourly": this.updateW2HourlySalary.bind(this)
        };
        CalculateActions.updateContractAnnualSalary.subscribe(this.updateContractAnnualSalary.bind(this));
        CalculateActions.updateContractHourlySalary.subscribe(this.updateContractHourlySalary.bind(this));
        CalculateActions.updateParameters.subscribe(this.updateParameters.bind(this));
        CalculateActions.updateTakeHomeAnnualSalary.subscribe(this.updateTakeHomeAnnualSalary.bind(this));
        CalculateActions.updateTakeHomeMonthlySalary.subscribe(this.updateTakeHomeMonthlySalary.bind(this));
        CalculateActions.updateW2HourlySalary.subscribe(this.updateW2HourlySalary.bind(this));
        CalculateActions.updateW2AnnualSalary.subscribe(this.updateW2AnnualSalary.bind(this));
        this.updateW2AnnualSalary(50000);
    }

    babelHelpers.createClass(DataStore, [{
        key: "updateParameters",
        value: function updateParameters(state) {
            this.setState(state);
            this.updaters[this.state.get("method")]();
        }
    }, {
        key: "updateContractAnnualSalary",
        value: function updateContractAnnualSalary(value) {
            var _this = this;

            this.updateCalcs("contractannual", function (wDays, hrPerDay, tax, selfEmploymentTax, benefits) {
                var contractAnnual = value !== undefined ? value : _this.state.get("contractAnnual");
                var contractHourly = value / wDays / hrPerDay;
                var takehomeAnnually = contractAnnual * (1 - tax / 100 - selfEmploymentTax / 100);
                var takehomeMonthly = takehomeAnnually / 12;
                var w2Annual = takehomeAnnually / (1 - tax / 100);
                var w2Hourly = w2Annual / (365 * 5 / 7) / hrPerDay;
                return {
                    w2Hourly: w2Hourly,
                    w2Annual: w2Annual,
                    takehomeAnnually: takehomeAnnually,
                    takehomeMonthly: takehomeMonthly,
                    contractAnnual: contractAnnual,
                    contractHourly: contractHourly
                };
            });
        }
    }, {
        key: "updateContractHourlySalary",
        value: function updateContractHourlySalary(value) {
            var _this2 = this;

            this.updateCalcs("contracthourly", function (wDays, hrPerDay, tax, selfEmploymentTax, benefits) {
                var contractHourly = value !== undefined ? value : _this2.state.get("contractHourly");
                var contractAnnual = value * wDays * hrPerDay;
                var takehomeAnnually = contractAnnual * (1 - tax / 100 - selfEmploymentTax / 100);
                var takehomeMonthly = takehomeAnnually / 12;
                var w2Annual = takehomeAnnually / (1 - tax / 100);
                var w2Hourly = w2Annual / (365 * 5 / 7) / hrPerDay;
                return {
                    w2Hourly: w2Hourly,
                    w2Annual: w2Annual,
                    takehomeAnnually: takehomeAnnually,
                    takehomeMonthly: takehomeMonthly,
                    contractAnnual: contractAnnual,
                    contractHourly: contractHourly
                };
            });
        }
    }, {
        key: "updateTakeHomeAnnualSalary",
        value: function updateTakeHomeAnnualSalary(value) {
            var _this3 = this;

            this.updateCalcs("takehomeannually", function (wDays, hrPerDay, tax, selfEmploymentTax, benefits) {
                var takehomeAnnually = value !== undefined ? value : _this3.state.get("takehomeAnnually");
                var takehomeMonthly = takehomeAnnually / 12;
                var w2Annual = takehomeAnnually / (1 - tax / 100);
                var w2Hourly = w2Annual / (365 * 5 / 7) / hrPerDay;
                var contractAnnual = (takehomeAnnually + benefits) / (1 - tax / 100 - selfEmploymentTax / 100);
                var contractHourly = contractAnnual / wDays / hrPerDay;
                return {
                    w2Hourly: w2Hourly,
                    w2Annual: w2Annual,
                    takehomeAnnually: takehomeAnnually,
                    takehomeMonthly: takehomeMonthly,
                    contractAnnual: contractAnnual,
                    contractHourly: contractHourly
                };
            });
        }
    }, {
        key: "updateTakeHomeMonthlySalary",
        value: function updateTakeHomeMonthlySalary(value) {
            var _this4 = this;

            this.updateCalcs("takehomemonthly", function (wDays, hrPerDay, tax, selfEmploymentTax, benefits) {
                var takehomeMonthly = value !== undefined ? value : _this4.state.get("takehomeMonthly");
                var takehomeAnnually = takehomeMonthly * 12;
                var w2Annual = takehomeAnnually / (1 - tax / 100);
                var w2Hourly = w2Annual / (365 * 5 / 7) / hrPerDay;
                var contractAnnual = (takehomeAnnually + benefits) / (1 - tax / 100 - selfEmploymentTax / 100);
                var contractHourly = contractAnnual / wDays / hrPerDay;
                return {
                    w2Hourly: w2Hourly,
                    w2Annual: w2Annual,
                    takehomeAnnually: takehomeAnnually,
                    takehomeMonthly: takehomeMonthly,
                    contractAnnual: contractAnnual,
                    contractHourly: contractHourly
                };
            });
        }
    }, {
        key: "updateW2AnnualSalary",
        value: function updateW2AnnualSalary(value) {
            var _this5 = this;

            this.updateCalcs("w2annually", function (wDays, hrPerDay, tax, selfEmploymentTax, benefits) {
                var w2Annual = value !== undefined ? value : _this5.state.get("w2Annual");
                var w2Hourly = w2Annual / (365 * 5 / 7) / hrPerDay;
                var takehomeAnnually = w2Annual * (1 - tax / 100);
                var takehomeMonthly = takehomeAnnually / 12;
                var contractAnnual = (takehomeAnnually + benefits) / (1 - tax / 100 - selfEmploymentTax / 100);
                var contractHourly = contractAnnual / wDays / hrPerDay;
                return {
                    w2Hourly: w2Hourly,
                    w2Annual: w2Annual,
                    takehomeAnnually: takehomeAnnually,
                    takehomeMonthly: takehomeMonthly,
                    contractAnnual: contractAnnual,
                    contractHourly: contractHourly
                };
            });
        }
    }, {
        key: "updateW2HourlySalary",
        value: function updateW2HourlySalary(value) {
            var _this6 = this;

            this.updateCalcs("w2hourly", function (wDays, hrPerDay, tax, selfEmploymentTax, benefits) {
                var w2Hourly = value !== undefined ? value : _this6.state.get("w2Hourly");
                var w2Annual = w2Hourly * (365 * 5 / 7) * hrPerDay;
                var takehomeAnnually = Math.ceil(w2Annual * (1 - tax / 100));
                var takehomeMonthly = Math.ceiltakehomeAnnually / 12;
                var contractAnnual = (takehomeAnnually + benefits) / (1 - tax / 100 - selfEmploymentTax / 100);
                var contractHourly = Math.ceil(contractAnnual / wDays / hrPerDay);
                return {
                    w2Hourly: w2Hourly,
                    w2Annual: w2Annual,
                    takehomeAnnually: takehomeAnnually,
                    takehomeMonthly: takehomeMonthly,
                    contractAnnual: contractAnnual,
                    contractHourly: contractHourly
                };
            });
        }
    }, {
        key: "updateCalcs",
        value: function updateCalcs(method, calc) {
            var wDays = 365;
            wDays *= 5 / 7;
            wDays -= this.state.get("vacationDays");
            wDays = Math.ceil(wDays * this.state.get("percentWorkableYear") / 100);

            var hrPerDay = this.state.get("hoursPerDay");
            var tax = this.state.get("tax");
            var selfEmploymentTax = this.state.get("selfEmploymentTax");

            var __ret = calc(wDays, hrPerDay, tax, selfEmploymentTax, this.state.get("benefits"));

            this.setState(this.state.withMutations(function (newState) {
                newState.set("method", method);
                newState.set("workableDays", wDays);
                newState.set("w2Annual", Math.ceil(__ret.w2Annual));
                newState.set("w2Hourly", Math.ceil(__ret.w2Hourly));
                newState.set("contractAnnual", Math.ceil(__ret.contractAnnual));
                newState.set("contractHourly", Math.ceil(__ret.contractHourly));
                newState.set("takehomeAnnually", Math.ceil(__ret.takehomeAnnually));
                newState.set("takehomeMonthly", Math.ceil(__ret.takehomeMonthly));
            }));
        }
    }]);
    var _DataStore = DataStore;
    DataStore = Singleton(DataStore) || DataStore;
    return DataStore;
})(Store);

module.exports = DataStore;

},{"../actions/networkActions":2}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiYzovVXNlcnMvUmljaGFyZC9zb3VyY2UvUk5FQVQuanMvc3JjL2FwcC9hcHAuanN4IiwiYzovVXNlcnMvUmljaGFyZC9zb3VyY2UvUk5FQVQuanMvc3JjL2FwcC9hY3Rpb25zL25ldHdvcmtBY3Rpb25zLmpzIiwiYzovVXNlcnMvUmljaGFyZC9zb3VyY2UvUk5FQVQuanMvc3JjL2FwcC9jb21wb25lbnRzL2dlbm9tZS5qc3giLCJjOi9Vc2Vycy9SaWNoYXJkL3NvdXJjZS9STkVBVC5qcy9zcmMvYXBwL2NvbXBvbmVudHMvbWFpbi5qc3giLCJjOi9Vc2Vycy9SaWNoYXJkL3NvdXJjZS9STkVBVC5qcy9zcmMvYXBwL2NvbXBvbmVudHMvbmV0d29yay5qc3giLCJjOi9Vc2Vycy9SaWNoYXJkL3NvdXJjZS9STkVBVC5qcy9zcmMvYXBwL3JuZWF0LmpzIiwiYzovVXNlcnMvUmljaGFyZC9zb3VyY2UvUk5FQVQuanMvc3JjL2FwcC9zdG9yZXMvbmV0d29ya1N0b3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxDQUFDLFlBQVk7QUFDWCxNQUFJLElBQUksR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUM1QyxNQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQzs7QUFFbEQsTUFBSSxNQUFNLEdBQ1I7QUFBQyxlQUFXLENBQUMsS0FBSztNQUFDLE9BQU8sRUFBRSxJQUFJLEFBQUM7SUFDL0Isb0JBQUMsV0FBVyxDQUFDLEtBQUssSUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBRSxPQUFPLEFBQUMsR0FBRTtHQUM3QixDQUFBOztBQUV0QixhQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsWUFBWSxFQUFFLFVBQUMsSUFBSSxFQUFLO0FBQzFELFNB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dGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uICgpIHtcclxuICBsZXQgTWFpbiA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9tYWluLmpzeCcpO1xyXG4gIGxldCBOZXR3b3JrID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL25ldHdvcmsuanN4Jyk7XHJcblxyXG4gIHZhciByb3V0ZXMgPVxyXG4gICAgPFJlYWN0Um91dGVyLlJvdXRlIGhhbmRsZXI9e01haW59PlxyXG4gICAgICA8UmVhY3RSb3V0ZXIuUm91dGUgcGF0aD1cIi9cIiBoYW5kbGVyPXtOZXR3b3JrfS8+XHJcbiAgICA8L1JlYWN0Um91dGVyLlJvdXRlPlxyXG5cclxuICBSZWFjdFJvdXRlci5ydW4ocm91dGVzLCBSZWFjdFJvdXRlci5IYXNoTG9jYXRpb24sIChSb290KSA9PiB7XHJcbiAgICBSZWFjdC5yZW5kZXIoPFJvb3QgLz4sIGRvY3VtZW50LmJvZHkpO1xyXG4gIH0pO1xyXG59KSgpO1xyXG4iLCJleHBvcnRzLm11dGF0ZSA9IEFjdGlvbi5jcmVhdGUoKTtcclxuIiwiY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgICAgICBzdXBlcihwcm9wcylcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB2YXIgZWwgPSB0aGlzLnJlZnMuaG9sZGVyLmdldERPTU5vZGUoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZShlbCwge1xyXG4gICAgICAgICAgICB3aWR0aDogJzIwMHB4JyxcclxuICAgICAgICAgICAgaGVpZ2h0OiAnMzAwcHgnXHJcbiAgICAgICAgfSwgdGhpcy5nZXRDaGFydFN0YXRlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcclxuICAgICAgICB2YXIgZWwgPSBSZWFjdC5maW5kRE9NTm9kZSh0aGlzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZShlbCwgdGhpcy5nZXRDaGFydFN0YXRlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENoYXJ0U3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGF0YTogdGhpcy5wcm9wcy5kYXRhLnRvRDMoKVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgdmFyIGVsID0gUmVhY3QuZmluZERPTU5vZGUodGhpcyk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KGVsKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGUoZWwsIHByb3BzLCBzdGF0ZSl7XHJcbiAgICAgICAgdmFyIHdpZHRoID0gMzAwLFxyXG4gICAgICAgICAgICBoZWlnaHQgPSAzMDA7XHJcblxyXG4gICAgICAgIHRoaXMuZm9yY2UgPSBkMy5sYXlvdXQuZm9yY2UoKVxyXG4gICAgICAgICAgICAuZ3Jhdml0eSgxKVxyXG4gICAgICAgICAgICAuY2hhcmdlKC0yMDApXHJcbiAgICAgICAgICAgIC5saW5rRGlzdGFuY2UoNTApXHJcbiAgICAgICAgICAgIC5zaXplKFt3aWR0aCwgaGVpZ2h0XSk7XHJcblxyXG4gICAgICAgIHRoaXMuc3ZnID0gZDMuc2VsZWN0KGVsKS5hcHBlbmQoXCJzdmdcIilcclxuICAgICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcclxuICAgICAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGUoZWwsIHN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZWwsc3RhdGUpe1xyXG4gICAgICAgIHRoaXMuc3ZnLnNlbGVjdEFsbChcIi5saW5rXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgIHRoaXMuc3ZnLnNlbGVjdEFsbChcIi5ub2RlXCIpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmZvcmNlXHJcbiAgICAgICAgICAgIC5ub2RlcyhzdGF0ZS5kYXRhLm5vZGVzKVxyXG4gICAgICAgICAgICAubGlua3Moc3RhdGUuZGF0YS5saW5rcylcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcblxyXG4gICAgICAgIHZhciBsaW5rID0gIHRoaXMuc3ZnLnNlbGVjdEFsbChcIi5saW5rXCIpXHJcbiAgICAgICAgICAgIC5kYXRhKHN0YXRlLmRhdGEubGlua3MpXHJcbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZChcImxpbmVcIilcclxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImxpbmtcIilcclxuICAgICAgICAgICAgLnN0eWxlKFwic3Ryb2tlXCIsIFwiYmxhY2tcIilcclxuICAgICAgICAgICAgLnN0eWxlKFwic3Ryb2tlLXdpZHRoXCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIE1hdGguc3FydChkLnZhbHVlKTsgfSk7XHJcblxyXG4gICAgICAgIHZhciBub2RlID0gdGhpcy5zdmcuc2VsZWN0QWxsKFwiLm5vZGVcIilcclxuICAgICAgICAgICAgLmRhdGEoc3RhdGUuZGF0YS5ub2RlcylcclxuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKFwiY2lyY2xlXCIpXHJcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJub2RlXCIpXHJcbiAgICAgICAgICAgIC5hdHRyKFwiclwiLCA2KVxyXG4gICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihkLnR5cGUgPT0gXCJpbnB1dFwiKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJyZWRcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihkLnR5cGUgPT0gXCJvdXRwdXRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiYmx1ZVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJncmVlblwiXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYWxsKHRoaXMuZm9yY2UuZHJhZyk7XHJcblxyXG4gICAgICAgIG5vZGUuYXBwZW5kKFwidGl0MDIubGVcIilcclxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5uYW1lOyB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5mb3JjZS5vbihcInRpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxpbmsuYXR0cihcIngxXCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIE1hdGguZmxvb3IoZC5zb3VyY2UueCk7IH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cihcInkxXCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIE1hdGguZmxvb3IoZC5zb3VyY2UueSk7IH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cihcIngyXCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIE1hdGguZmxvb3IoZC50YXJnZXQueCk7IH0pXHJcbiAgICAgICAgICAgICAgICAuYXR0cihcInkyXCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIE1hdGguZmxvb3IoZC50YXJnZXQueSk7IH0pO1xyXG5cclxuICAgICAgICAgICAgbm9kZS5hdHRyKFwiY3hcIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4gTWF0aC5mbG9vcihkLngpOyB9KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJjeVwiLCBmdW5jdGlvbihkKSB7IHJldHVybiBNYXRoLmZsb29yKGQueSk7IH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZm9yY2Uuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95KGVsKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHZhciBub2RlRGl2cyA9IHRoaXMucHJvcHMuZGF0YS5ub2Rlcy5tYXAoZnVuY3Rpb24obil7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17bi5uYW1lfT57bi5uYW1lfTwvZGl2PlxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPVwiaG9sZGVyXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7bm9kZURpdnN9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQ7IiwiY2xhc3MgTWFpbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzID0ge1xyXG4gICAgcm91dGVyOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY29udGV4dFR5cGVzID0ge1xyXG4gICAgcm91dGVyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8UmVhY3RSb3V0ZXIuUm91dGVIYW5kbGVyLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNYWluO1xyXG4iLCJpbXBvcnQgTmV0d29ya1N0b3JlIGZyb20gXCIuLi9zdG9yZXMvbmV0d29ya1N0b3JlXCI7XHJcbmltcG9ydCBOZXR3b3JrQWN0aW9ucyBmcm9tIFwiLi4vYWN0aW9ucy9uZXR3b3JrQWN0aW9uc1wiO1xyXG5pbXBvcnQgR2Vub21lQ29tcG9uZW50IGZyb20gXCIuL2dlbm9tZS5qc3hcIjtcclxuaW1wb3J0IHtHZW5vbWV9IGZyb20gXCIuLi9ybmVhdC5qc1wiXHJcblxyXG5jbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGUgPSB7XHJcbiAgICAgICAgZ2Vub21lOiBuZXcgR2Vub21lKFtcIkJ1dHRvbiBBXCIsXCJCdXR0b24gQlwiXSxbXCJHb1wiXSlcclxuICAgIH1cclxuXHJcbiAgICBkb011dGF0ZSgpe1xyXG4gICAgICAgIHRoaXMuc3RhdGUuZ2Vub21lLm11dGF0ZSgpXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh0aGlzLnN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWdlXCI+XHJcbiAgICAgICAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJjb2wgczEyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0Pk5ldXJhbCBOZXR3b3JrIEV4cGVyaW1lbnQ8L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBMZXQncyBtYWtlIHNvbWUgb3JnYW5pc20hXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dC1maWVsZCBjb2wgczRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxHZW5vbWVDb21wb25lbnQgZGF0YT17dGhpcy5zdGF0ZS5nZW5vbWV9PjwvR2Vub21lQ29tcG9uZW50PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dC1maWVsZCBjb2wgczRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5kb011dGF0ZS5iaW5kKHRoaXMpfT5NdXRhdGU8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZmllbGQgY29sIHM0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50OyIsImNsYXNzIE9yZ2FuaXNtIHtcclxuICAgIHNwZWNpZXMgPSBbXVxyXG59XHJcblxyXG5jbGFzcyBTcGVjaWVzIHtcclxuICAgIGdlbm9tZXMgPSBbXVxyXG59XHJcblxyXG5jbGFzcyBHZW5vbWUge1xyXG4gICAgbm9kZUNvdW50ID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dHMsb3V0cHV0cyl7XHJcbiAgICAgICAgaW5wdXRzLmZvckVhY2goKG4pPT57XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gbmV3IE5vZGVHZW5lKG4pO1xyXG4gICAgICAgICAgICBub2RlLnR5cGUgPSBcImlucHV0XCI7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZXMucHVzaChub2RlKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG91dHB1dHMuZm9yRWFjaCgobik9PntcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBuZXcgTm9kZUdlbmUobik7XHJcbiAgICAgICAgICAgIG5vZGUudHlwZSA9IFwib3V0cHV0XCI7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZXMucHVzaChub2RlKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZE5ld05vZGUoKXtcclxuICAgICAgICB2YXIgbm9kZSA9IG5ldyBOb2RlR2VuZShcIk5vZGVfXCIrdGhpcy5ub2RlQ291bnQpO1xyXG4gICAgICAgIHRoaXMubm9kZUNvdW50Kys7XHJcbiAgICAgICAgdGhpcy5ub2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIG11dGF0ZSgpe1xyXG4gICAgICAgIHZhciBzb3VyY2UgPSB0aGlzLmdldFJhbmRvbU5vZGUoKTtcclxuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy5nZXRSYW5kb21Ob2RlKHNvdXJjZSlcclxuICAgICAgICB2YXIgY29ubmVjdGlvbiA9IHRoaXMuZ2V0Q29ubmVjdGlvbkJldHdlZW4oc291cmNlLHRhcmdldCk7XHJcbiAgICAgICAgdmFyIHMgPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgIGlmKHM8LjUpe1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0ZUNvbm5lY3Rpb25CZXR3ZWVuTm9kZXMoc291cmNlLHRhcmdldCxjb25uZWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubXV0YXRlTm9kZUJldHdlZW5Ob2Rlcyhzb3VyY2UsdGFyZ2V0LGNvbm5lY3Rpb24pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG11dGF0ZU5vZGVCZXR3ZWVuTm9kZXMoc291cmNlLHRhcmdldCxjb25uZWN0aW9uKXtcclxuICAgICAgICBpZihjb25uZWN0aW9uKXtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVDb25uZWN0aW9uQmV0d2Vlbihjb25uZWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5ld05vZGUgPSB0aGlzLmFkZE5ld05vZGUoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUNvbm5lY3Rpb25CZXR3ZWVuKHNvdXJjZSxuZXdOb2RlKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUNvbm5lY3Rpb25CZXR3ZWVuKG5ld05vZGUsdGFyZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBtdXRhdGVDb25uZWN0aW9uQmV0d2Vlbk5vZGVzKHNvdXJjZSx0YXJnZXQsY29ubmVjdGlvbil7XHJcbiAgICAgICAgaWYoY29ubmVjdGlvbil7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb25uZWN0aW9uQmV0d2Vlbihzb3VyY2UsdGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29ubmVjdGlvbkJldHdlZW4oc291cmNlLHRhcmdldCl7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9ucy5maWx0ZXIoKGwpPT4obC5zb3VyY2UgPT0gc291cmNlICYmIGwudGFyZ2V0ID09IHRhcmdldCkgfHwgKGwuc291cmNlID09IHRhcmdldCAmJiBsLnRhcmdldCA9PSBzb3VyY2UpKVswXTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY3JlYXRlQ29ubmVjdGlvbkJldHdlZW4oc291cmNlLHRhcmdldCl7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9ucy5wdXNoKG5ldyBDb25uZWN0R2VuZShzb3VyY2UsdGFyZ2V0KSlcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVDb25uZWN0aW9uQmV0d2Vlbihjb25uZWN0aW9uKXtcclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb25zLnNwbGljZSh0aGlzLmNvbm5lY3Rpb25zLmluZGV4T2YoY29ubmVjdGlvbiksMSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmFuZG9tTm9kZShleGNsdWRlTm9kZSl7XHJcbiAgICAgICAgdmFyIG4gPSB0aGlzLm5vZGVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0aGlzLm5vZGVzLmxlbmd0aCldO1xyXG4gICAgICAgIHdoaWxlKG4gPT0gZXhjbHVkZU5vZGUpe1xyXG4gICAgICAgICAgICBuID0gdGhpcy5ub2Rlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqdGhpcy5ub2Rlcy5sZW5ndGgpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG47XHJcbiAgICB9XHJcblxyXG4gICAgZml0bmVzcyA9IDBcclxuICAgIG5vZGVzID0gW11cclxuICAgIGNvbm5lY3Rpb25zID0gW11cclxuXHJcbiAgICB0b0QzKCl7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHtcclxuICAgICAgICAgICAgbm9kZXMgOiBbXSxcclxuICAgICAgICAgICAgbGlua3MgOiBbXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ub2Rlcy5mb3JFYWNoKChuKT0+e1xyXG4gICAgICAgICAgICByZXN1bHQubm9kZXMucHVzaCh7bmFtZTpuLm5hbWUsZ3JvdXA6MSx0eXBlOm4udHlwZX0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9ucy5mb3JFYWNoKChjKT0+e1xyXG4gICAgICAgICAgICByZXN1bHQubGlua3MucHVzaCh7c291cmNlOnRoaXMubm9kZXMuaW5kZXhPZihjLnNvdXJjZSksdGFyZ2V0OnRoaXMubm9kZXMuaW5kZXhPZihjLnRhcmdldCksdmFsdWU6MX0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTm9kZUdlbmUge1xyXG4gICAgbmFtZSA9IFwiXCJcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lKXtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDb25uZWN0R2VuZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2UsdGFyZ2V0KXtcclxuICAgICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIH1cclxuXHJcbiAgICBpbm5vdmF0aW9uU3RhZ2VzID0gW11cclxuICAgIGRpc2FibGVkID0gZmFsc2VcclxuICAgIHdlaWdodCA9IDBcclxufVxyXG5cclxuZXhwb3J0cy5HZW5vbWUgPSBHZW5vbWU7XHJcbiIsImxldCBDYWxjdWxhdGVBY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9uZXR3b3JrQWN0aW9ucycpO1xyXG5cclxuQFNpbmdsZXRvblxyXG5jbGFzcyBEYXRhU3RvcmUgZXh0ZW5kcyBTdG9yZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihJbW11dGFibGUuZnJvbUpTKFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwidzJcIixcclxuICAgICAgICAgICAgICAgIHcyQW5udWFsOiA1MDAwMCxcclxuICAgICAgICAgICAgICAgIHcySG91cmx5OiAwLFxyXG4gICAgICAgICAgICAgICAgYmVuZWZpdHM6IDAsXHJcbiAgICAgICAgICAgICAgICBjb250cmFjdEFubnVhbDogMCxcclxuICAgICAgICAgICAgICAgIGNvbnRyYWN0SG91cmx5OiAwLFxyXG4gICAgICAgICAgICAgICAgdGFrZWhvbWVBbm51YWxseTogMCxcclxuICAgICAgICAgICAgICAgIHRha2Vob21lTW9udGhseTogMCxcclxuICAgICAgICAgICAgICAgIHBlcmNlbnRXb3JrYWJsZVllYXI6IDEwMCxcclxuICAgICAgICAgICAgICAgIHdvcmthYmxlRGF5czogMzY1LFxyXG4gICAgICAgICAgICAgICAgaG91cnNQZXJEYXk6IDgsXHJcbiAgICAgICAgICAgICAgICB0YXg6IDI1LFxyXG4gICAgICAgICAgICAgICAgc2VsZkVtcGxveW1lbnRUYXg6IDcuNjUsXHJcbiAgICAgICAgICAgICAgICB2YWNhdGlvbkRheXM6IDMwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApKTtcclxuICAgICAgICBDYWxjdWxhdGVBY3Rpb25zLnVwZGF0ZUNvbnRyYWN0QW5udWFsU2FsYXJ5LnN1YnNjcmliZSh0aGlzLnVwZGF0ZUNvbnRyYWN0QW5udWFsU2FsYXJ5LmJpbmQodGhpcykpO1xyXG4gICAgICAgIENhbGN1bGF0ZUFjdGlvbnMudXBkYXRlQ29udHJhY3RIb3VybHlTYWxhcnkuc3Vic2NyaWJlKHRoaXMudXBkYXRlQ29udHJhY3RIb3VybHlTYWxhcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgQ2FsY3VsYXRlQWN0aW9ucy51cGRhdGVQYXJhbWV0ZXJzLnN1YnNjcmliZSh0aGlzLnVwZGF0ZVBhcmFtZXRlcnMuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgQ2FsY3VsYXRlQWN0aW9ucy51cGRhdGVUYWtlSG9tZUFubnVhbFNhbGFyeS5zdWJzY3JpYmUodGhpcy51cGRhdGVUYWtlSG9tZUFubnVhbFNhbGFyeS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBDYWxjdWxhdGVBY3Rpb25zLnVwZGF0ZVRha2VIb21lTW9udGhseVNhbGFyeS5zdWJzY3JpYmUodGhpcy51cGRhdGVUYWtlSG9tZU1vbnRobHlTYWxhcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgQ2FsY3VsYXRlQWN0aW9ucy51cGRhdGVXMkhvdXJseVNhbGFyeS5zdWJzY3JpYmUodGhpcy51cGRhdGVXMkhvdXJseVNhbGFyeS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBDYWxjdWxhdGVBY3Rpb25zLnVwZGF0ZVcyQW5udWFsU2FsYXJ5LnN1YnNjcmliZSh0aGlzLnVwZGF0ZVcyQW5udWFsU2FsYXJ5LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVzJBbm51YWxTYWxhcnkoNTAwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZXJzID0ge1xyXG4gICAgICAgIFwiY29udHJhY3Rhbm51YWxcIjp0aGlzLnVwZGF0ZUNvbnRyYWN0QW5udWFsU2FsYXJ5LmJpbmQodGhpcyksXHJcbiAgICAgICAgXCJjb250cmFjdGhvdXJseVwiOnRoaXMudXBkYXRlQ29udHJhY3RIb3VybHlTYWxhcnkuYmluZCh0aGlzKSxcclxuICAgICAgICBcInRha2Vob21lYW5udWFsbHlcIjp0aGlzLnVwZGF0ZVRha2VIb21lQW5udWFsU2FsYXJ5LmJpbmQodGhpcyksXHJcbiAgICAgICAgXCJ0YWtlaG9tZW1vbnRobHlcIjp0aGlzLnVwZGF0ZVRha2VIb21lTW9udGhseVNhbGFyeS5iaW5kKHRoaXMpLFxyXG4gICAgICAgIFwidzJhbm51YWxseVwiOnRoaXMudXBkYXRlVzJBbm51YWxTYWxhcnkuYmluZCh0aGlzKSxcclxuICAgICAgICBcIncyaG91cmx5XCI6dGhpcy51cGRhdGVXMkhvdXJseVNhbGFyeS5iaW5kKHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUGFyYW1ldGVycyhzdGF0ZSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlcnNbdGhpcy5zdGF0ZS5nZXQoXCJtZXRob2RcIildKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQ29udHJhY3RBbm51YWxTYWxhcnkodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNhbGNzKFwiY29udHJhY3Rhbm51YWxcIiwod0RheXMsIGhyUGVyRGF5LCB0YXgsIHNlbGZFbXBsb3ltZW50VGF4LCBiZW5lZml0cykgPT4ge1xyXG4gICAgICAgICAgICB2YXIgY29udHJhY3RBbm51YWwgPSB2YWx1ZSE9PXVuZGVmaW5lZD92YWx1ZTp0aGlzLnN0YXRlLmdldChcImNvbnRyYWN0QW5udWFsXCIpO1xyXG4gICAgICAgICAgICB2YXIgY29udHJhY3RIb3VybHkgPSB2YWx1ZS93RGF5cy9oclBlckRheVxyXG4gICAgICAgICAgICB2YXIgdGFrZWhvbWVBbm51YWxseSA9IGNvbnRyYWN0QW5udWFsKigxLXRheC8xMDAtc2VsZkVtcGxveW1lbnRUYXgvMTAwKVxyXG4gICAgICAgICAgICB2YXIgdGFrZWhvbWVNb250aGx5ID0gdGFrZWhvbWVBbm51YWxseS8xMjtcclxuICAgICAgICAgICAgdmFyIHcyQW5udWFsID0gdGFrZWhvbWVBbm51YWxseS8oMS10YXgvMTAwKTtcclxuICAgICAgICAgICAgdmFyIHcySG91cmx5ID0gdzJBbm51YWwvKDM2NSo1LzcpL2hyUGVyRGF5O1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdzJIb3VybHk6IHcySG91cmx5LFxyXG4gICAgICAgICAgICAgICAgdzJBbm51YWw6IHcyQW5udWFsLFxyXG4gICAgICAgICAgICAgICAgdGFrZWhvbWVBbm51YWxseTogdGFrZWhvbWVBbm51YWxseSxcclxuICAgICAgICAgICAgICAgIHRha2Vob21lTW9udGhseTogdGFrZWhvbWVNb250aGx5LFxyXG4gICAgICAgICAgICAgICAgY29udHJhY3RBbm51YWw6IGNvbnRyYWN0QW5udWFsLFxyXG4gICAgICAgICAgICAgICAgY29udHJhY3RIb3VybHk6IGNvbnRyYWN0SG91cmx5XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDb250cmFjdEhvdXJseVNhbGFyeSh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ2FsY3MoXCJjb250cmFjdGhvdXJseVwiLCh3RGF5cywgaHJQZXJEYXksIHRheCwgc2VsZkVtcGxveW1lbnRUYXgsIGJlbmVmaXRzKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBjb250cmFjdEhvdXJseSA9IHZhbHVlIT09dW5kZWZpbmVkP3ZhbHVlOnRoaXMuc3RhdGUuZ2V0KFwiY29udHJhY3RIb3VybHlcIik7XHJcbiAgICAgICAgICAgIHZhciBjb250cmFjdEFubnVhbCA9IHZhbHVlKndEYXlzKmhyUGVyRGF5XHJcbiAgICAgICAgICAgIHZhciB0YWtlaG9tZUFubnVhbGx5ID0gY29udHJhY3RBbm51YWwqKDEtdGF4LzEwMC1zZWxmRW1wbG95bWVudFRheC8xMDApXHJcbiAgICAgICAgICAgIHZhciB0YWtlaG9tZU1vbnRobHkgPSB0YWtlaG9tZUFubnVhbGx5LzEyO1xyXG4gICAgICAgICAgICB2YXIgdzJBbm51YWwgPSB0YWtlaG9tZUFubnVhbGx5LygxLXRheC8xMDApO1xyXG4gICAgICAgICAgICB2YXIgdzJIb3VybHkgPSB3MkFubnVhbC8oMzY1KjUvNykvaHJQZXJEYXk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB3MkhvdXJseTogdzJIb3VybHksXHJcbiAgICAgICAgICAgICAgICB3MkFubnVhbDogdzJBbm51YWwsXHJcbiAgICAgICAgICAgICAgICB0YWtlaG9tZUFubnVhbGx5OiB0YWtlaG9tZUFubnVhbGx5LFxyXG4gICAgICAgICAgICAgICAgdGFrZWhvbWVNb250aGx5OiB0YWtlaG9tZU1vbnRobHksXHJcbiAgICAgICAgICAgICAgICBjb250cmFjdEFubnVhbDogY29udHJhY3RBbm51YWwsXHJcbiAgICAgICAgICAgICAgICBjb250cmFjdEhvdXJseTogY29udHJhY3RIb3VybHlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVRha2VIb21lQW5udWFsU2FsYXJ5KHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDYWxjcyhcInRha2Vob21lYW5udWFsbHlcIiwod0RheXMsIGhyUGVyRGF5LCB0YXgsIHNlbGZFbXBsb3ltZW50VGF4LCBiZW5lZml0cykgPT4ge1xyXG4gICAgICAgICAgICB2YXIgdGFrZWhvbWVBbm51YWxseSA9IHZhbHVlIT09dW5kZWZpbmVkP3ZhbHVlOnRoaXMuc3RhdGUuZ2V0KFwidGFrZWhvbWVBbm51YWxseVwiKTtcclxuICAgICAgICAgICAgdmFyIHRha2Vob21lTW9udGhseSA9IHRha2Vob21lQW5udWFsbHkvMTI7XHJcbiAgICAgICAgICAgIHZhciB3MkFubnVhbCA9IHRha2Vob21lQW5udWFsbHkvKDEtdGF4LzEwMCk7XHJcbiAgICAgICAgICAgIHZhciB3MkhvdXJseSA9IHcyQW5udWFsLygzNjUqNS83KS9oclBlckRheTtcclxuICAgICAgICAgICAgdmFyIGNvbnRyYWN0QW5udWFsID0gKHRha2Vob21lQW5udWFsbHkrYmVuZWZpdHMpIC8gKDEgLSB0YXggLyAxMDAgLSBzZWxmRW1wbG95bWVudFRheCAvIDEwMClcclxuICAgICAgICAgICAgdmFyIGNvbnRyYWN0SG91cmx5ID0gY29udHJhY3RBbm51YWwgLyB3RGF5cyAvIGhyUGVyRGF5O1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdzJIb3VybHk6IHcySG91cmx5LFxyXG4gICAgICAgICAgICAgICAgdzJBbm51YWw6IHcyQW5udWFsLFxyXG4gICAgICAgICAgICAgICAgdGFrZWhvbWVBbm51YWxseTogdGFrZWhvbWVBbm51YWxseSxcclxuICAgICAgICAgICAgICAgIHRha2Vob21lTW9udGhseTogdGFrZWhvbWVNb250aGx5LFxyXG4gICAgICAgICAgICAgICAgY29udHJhY3RBbm51YWw6IGNvbnRyYWN0QW5udWFsLFxyXG4gICAgICAgICAgICAgICAgY29udHJhY3RIb3VybHk6IGNvbnRyYWN0SG91cmx5XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVUYWtlSG9tZU1vbnRobHlTYWxhcnkodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNhbGNzKFwidGFrZWhvbWVtb250aGx5XCIsKHdEYXlzLCBoclBlckRheSwgdGF4LCBzZWxmRW1wbG95bWVudFRheCwgYmVuZWZpdHMpID0+IHtcclxuICAgICAgICAgICAgdmFyIHRha2Vob21lTW9udGhseSA9IHZhbHVlIT09dW5kZWZpbmVkP3ZhbHVlOnRoaXMuc3RhdGUuZ2V0KFwidGFrZWhvbWVNb250aGx5XCIpO1xyXG4gICAgICAgICAgICB2YXIgdGFrZWhvbWVBbm51YWxseSA9IHRha2Vob21lTW9udGhseSoxMjtcclxuICAgICAgICAgICAgdmFyIHcyQW5udWFsID0gdGFrZWhvbWVBbm51YWxseS8oMS10YXgvMTAwKTtcclxuICAgICAgICAgICAgdmFyIHcySG91cmx5ID0gdzJBbm51YWwvKDM2NSo1LzcpL2hyUGVyRGF5O1xyXG4gICAgICAgICAgICB2YXIgY29udHJhY3RBbm51YWwgPSAodGFrZWhvbWVBbm51YWxseStiZW5lZml0cykgLyAoMSAtIHRheCAvIDEwMCAtIHNlbGZFbXBsb3ltZW50VGF4IC8gMTAwKVxyXG4gICAgICAgICAgICB2YXIgY29udHJhY3RIb3VybHkgPSBjb250cmFjdEFubnVhbCAvIHdEYXlzIC8gaHJQZXJEYXk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB3MkhvdXJseTogdzJIb3VybHksXHJcbiAgICAgICAgICAgICAgICB3MkFubnVhbDogdzJBbm51YWwsXHJcbiAgICAgICAgICAgICAgICB0YWtlaG9tZUFubnVhbGx5OiB0YWtlaG9tZUFubnVhbGx5LFxyXG4gICAgICAgICAgICAgICAgdGFrZWhvbWVNb250aGx5OiB0YWtlaG9tZU1vbnRobHksXHJcbiAgICAgICAgICAgICAgICBjb250cmFjdEFubnVhbDogY29udHJhY3RBbm51YWwsXHJcbiAgICAgICAgICAgICAgICBjb250cmFjdEhvdXJseTogY29udHJhY3RIb3VybHlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVcyQW5udWFsU2FsYXJ5KHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDYWxjcyhcIncyYW5udWFsbHlcIiwod0RheXMsIGhyUGVyRGF5LCB0YXgsIHNlbGZFbXBsb3ltZW50VGF4LCBiZW5lZml0cykgPT4ge1xyXG4gICAgICAgICAgICB2YXIgdzJBbm51YWwgPSB2YWx1ZSE9PXVuZGVmaW5lZD92YWx1ZTp0aGlzLnN0YXRlLmdldChcIncyQW5udWFsXCIpO1xyXG4gICAgICAgICAgICB2YXIgdzJIb3VybHkgPSB3MkFubnVhbC8oMzY1KjUvNykvaHJQZXJEYXk7XHJcbiAgICAgICAgICAgIHZhciB0YWtlaG9tZUFubnVhbGx5ID0gdzJBbm51YWwgKiAoMSAtIHRheCAvIDEwMCk7XHJcbiAgICAgICAgICAgIHZhciB0YWtlaG9tZU1vbnRobHkgPSB0YWtlaG9tZUFubnVhbGx5IC8gMTI7XHJcbiAgICAgICAgICAgIHZhciBjb250cmFjdEFubnVhbCA9ICh0YWtlaG9tZUFubnVhbGx5K2JlbmVmaXRzKSAvICgxIC0gdGF4IC8gMTAwIC0gc2VsZkVtcGxveW1lbnRUYXggLyAxMDApXHJcbiAgICAgICAgICAgIHZhciBjb250cmFjdEhvdXJseSA9IGNvbnRyYWN0QW5udWFsIC8gd0RheXMgLyBoclBlckRheTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHcySG91cmx5OiB3MkhvdXJseSxcclxuICAgICAgICAgICAgICAgIHcyQW5udWFsOiB3MkFubnVhbCxcclxuICAgICAgICAgICAgICAgIHRha2Vob21lQW5udWFsbHk6IHRha2Vob21lQW5udWFsbHksXHJcbiAgICAgICAgICAgICAgICB0YWtlaG9tZU1vbnRobHk6IHRha2Vob21lTW9udGhseSxcclxuICAgICAgICAgICAgICAgIGNvbnRyYWN0QW5udWFsOiBjb250cmFjdEFubnVhbCxcclxuICAgICAgICAgICAgICAgIGNvbnRyYWN0SG91cmx5OiBjb250cmFjdEhvdXJseVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVzJIb3VybHlTYWxhcnkodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNhbGNzKFwidzJob3VybHlcIiwod0RheXMsIGhyUGVyRGF5LCB0YXgsIHNlbGZFbXBsb3ltZW50VGF4LCBiZW5lZml0cykgPT4ge1xyXG4gICAgICAgICAgICB2YXIgdzJIb3VybHkgPSB2YWx1ZSE9PXVuZGVmaW5lZD92YWx1ZTp0aGlzLnN0YXRlLmdldChcIncySG91cmx5XCIpO1xyXG4gICAgICAgICAgICB2YXIgdzJBbm51YWwgPSB3MkhvdXJseSAqICgzNjUqNS83KSAqIGhyUGVyRGF5O1xyXG4gICAgICAgICAgICB2YXIgdGFrZWhvbWVBbm51YWxseSA9IE1hdGguY2VpbCh3MkFubnVhbCAqICgxIC0gdGF4IC8gMTAwKSk7XHJcbiAgICAgICAgICAgIHZhciB0YWtlaG9tZU1vbnRobHkgPSBNYXRoLmNlaWx0YWtlaG9tZUFubnVhbGx5IC8gMTI7XHJcbiAgICAgICAgICAgIHZhciBjb250cmFjdEFubnVhbCA9ICh0YWtlaG9tZUFubnVhbGx5K2JlbmVmaXRzKSAvICgxIC0gdGF4IC8gMTAwIC0gc2VsZkVtcGxveW1lbnRUYXggLyAxMDApXHJcbiAgICAgICAgICAgIHZhciBjb250cmFjdEhvdXJseSA9IE1hdGguY2VpbChjb250cmFjdEFubnVhbCAvIHdEYXlzIC8gaHJQZXJEYXkpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdzJIb3VybHk6IHcySG91cmx5LFxyXG4gICAgICAgICAgICAgICAgdzJBbm51YWw6IHcyQW5udWFsLFxyXG4gICAgICAgICAgICAgICAgdGFrZWhvbWVBbm51YWxseTogdGFrZWhvbWVBbm51YWxseSxcclxuICAgICAgICAgICAgICAgIHRha2Vob21lTW9udGhseTogdGFrZWhvbWVNb250aGx5LFxyXG4gICAgICAgICAgICAgICAgY29udHJhY3RBbm51YWw6IGNvbnRyYWN0QW5udWFsLFxyXG4gICAgICAgICAgICAgICAgY29udHJhY3RIb3VybHk6IGNvbnRyYWN0SG91cmx5XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDYWxjcyhtZXRob2QsY2FsYyl7XHJcbiAgICAgICAgdmFyIHdEYXlzID0gMzY1O1xyXG4gICAgICAgIHdEYXlzICo9IDUgLyA3O1xyXG4gICAgICAgIHdEYXlzIC09IHRoaXMuc3RhdGUuZ2V0KFwidmFjYXRpb25EYXlzXCIpXHJcbiAgICAgICAgd0RheXMgPSBNYXRoLmNlaWwod0RheXMqdGhpcy5zdGF0ZS5nZXQoXCJwZXJjZW50V29ya2FibGVZZWFyXCIpLzEwMCk7XHJcblxyXG4gICAgICAgIHZhciBoclBlckRheSA9IHRoaXMuc3RhdGUuZ2V0KFwiaG91cnNQZXJEYXlcIik7XHJcbiAgICAgICAgdmFyIHRheCA9IHRoaXMuc3RhdGUuZ2V0KFwidGF4XCIpO1xyXG4gICAgICAgIHZhciBzZWxmRW1wbG95bWVudFRheCA9IHRoaXMuc3RhdGUuZ2V0KFwic2VsZkVtcGxveW1lbnRUYXhcIik7XHJcblxyXG4gICAgICAgIHZhciBfX3JldCA9IGNhbGMod0RheXMsIGhyUGVyRGF5LCB0YXgsIHNlbGZFbXBsb3ltZW50VGF4LCB0aGlzLnN0YXRlLmdldChcImJlbmVmaXRzXCIpKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZS53aXRoTXV0YXRpb25zKChuZXdTdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmV3U3RhdGUuc2V0KFwibWV0aG9kXCIsIG1ldGhvZClcclxuICAgICAgICAgICAgICAgIG5ld1N0YXRlLnNldChcIndvcmthYmxlRGF5c1wiLCB3RGF5cylcclxuICAgICAgICAgICAgICAgIG5ld1N0YXRlLnNldChcIncyQW5udWFsXCIsIE1hdGguY2VpbChfX3JldC53MkFubnVhbCkpXHJcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZS5zZXQoXCJ3MkhvdXJseVwiLCBNYXRoLmNlaWwoX19yZXQudzJIb3VybHkpKVxyXG4gICAgICAgICAgICAgICAgbmV3U3RhdGUuc2V0KFwiY29udHJhY3RBbm51YWxcIiwgTWF0aC5jZWlsKF9fcmV0LmNvbnRyYWN0QW5udWFsKSlcclxuICAgICAgICAgICAgICAgIG5ld1N0YXRlLnNldChcImNvbnRyYWN0SG91cmx5XCIsIE1hdGguY2VpbChfX3JldC5jb250cmFjdEhvdXJseSkpXHJcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZS5zZXQoXCJ0YWtlaG9tZUFubnVhbGx5XCIsIE1hdGguY2VpbChfX3JldC50YWtlaG9tZUFubnVhbGx5KSlcclxuICAgICAgICAgICAgICAgIG5ld1N0YXRlLnNldChcInRha2Vob21lTW9udGhseVwiLCBNYXRoLmNlaWwoX19yZXQudGFrZWhvbWVNb250aGx5KSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFTdG9yZTsiXX0=
