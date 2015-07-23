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
            var el = React.findDOMNode(this);
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

            this.force = d3.layout.force().gravity(1).charge(-120).linkDistance(10).size([width, height]);

            this.svg = d3.select(el).append("svg").attr("width", width).attr("height", height);

            this.update(el, state);
        }
    }, {
        key: 'update',
        value: function update(el, state) {
            this.svg.selectAll(".link").remove();
            this.svg.selectAll(".node").remove();

            this.force.nodes(state.data.nodes).links(state.data.links).start();

            var link = this.svg.selectAll(".link").data(state.data.links).enter().append("line").attr("class", "link").style("stroke", "red").style("stroke-width", function (d) {
                return Math.sqrt(d.value);
            });

            var node = this.svg.selectAll(".node").data(state.data.nodes).enter().append("circle").attr("class", "node").attr("r", 2).style("fill", "green").call(this.force.drag);

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
            return React.createElement('div', null);
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
                            "RNEAT.js"
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
            return _this.nodes.push(new NodeGene(n));
        });
        outputs.forEach(function (n) {
            return _this.nodes.push(new NodeGene(n));
        });
    }

    babelHelpers.createClass(Genome, [{
        key: "addNewNode",
        value: function addNewNode() {
            var node = new NodeGene("Node_" + this.nodeCount);
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
                result.nodes.push({ name: n.name, group: 1 });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiYzovVXNlcnMvUmljaGFyZC9zb3VyY2UvUk5FQVQuanMvc3JjL2FwcC9hcHAuanN4IiwiYzovVXNlcnMvUmljaGFyZC9zb3VyY2UvUk5FQVQuanMvc3JjL2FwcC9hY3Rpb25zL25ldHdvcmtBY3Rpb25zLmpzIiwiYzovVXNlcnMvUmljaGFyZC9zb3VyY2UvUk5FQVQuanMvc3JjL2FwcC9jb21wb25lbnRzL2dlbm9tZS5qc3giLCJjOi9Vc2Vycy9SaWNoYXJkL3NvdXJjZS9STkVBVC5qcy9zcmMvYXBwL2NvbXBvbmVudHMvbWFpbi5qc3giLCJjOi9Vc2Vycy9SaWNoYXJkL3NvdXJjZS9STkVBVC5qcy9zcmMvYXBwL2NvbXBvbmVudHMvbmV0d29yay5qc3giLCJjOi9Vc2Vycy9SaWNoYXJkL3NvdXJjZS9STkVBVC5qcy9zcmMvYXBwL3JuZWF0LmpzIiwiYzovVXNlcnMvUmljaGFyZC9zb3VyY2UvUk5FQVQuanMvc3JjL2FwcC9zdG9yZXMvbmV0d29ya1N0b3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxDQUFDLFlBQVk7QUFDWCxNQUFJLElBQUksR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUM1QyxNQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQzs7QUFFbEQsTUFBSSxNQUFNLEdBQ1I7QUFBQyxlQUFXLENBQUMsS0FBSztNQUFDLE9BQU8sRUFBRSxJQUFJLEFBQUM7SUFDL0Isb0JBQUMsV0FBVyxDQUFDLEtBQUssSUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBRSxPQUFPLEFBQUMsR0FBRTtHQUM3QixDQUFBOztBQUV0QixhQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsWUFBWSxFQUFFLFVBQUMsSUFBSSxFQUFLO0FBQzFELFNB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QkFBZ0IsQ0FBQyxDQUFDLENBQUE7QUFDbkUsd0JBQVEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQTthQUNwRSxDQUFDLENBQ0wsQ0FBQztTQUNMOztxQkF0TEMsU0FBUztBQUFULGFBQVMsR0FEZCxTQUFTLENBQ0osU0FBUyxLQUFULFNBQVM7V0FBVCxTQUFTO0dBQVMsS0FBSzs7QUF5TDdCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IE1haW4gPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvbWFpbi5qc3gnKTtcclxuICBsZXQgTmV0d29yayA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9uZXR3b3JrLmpzeCcpO1xyXG5cclxuICB2YXIgcm91dGVzID1cclxuICAgIDxSZWFjdFJvdXRlci5Sb3V0ZSBoYW5kbGVyPXtNYWlufT5cclxuICAgICAgPFJlYWN0Um91dGVyLlJvdXRlIHBhdGg9XCIvXCIgaGFuZGxlcj17TmV0d29ya30vPlxyXG4gICAgPC9SZWFjdFJvdXRlci5Sb3V0ZT5cclxuXHJcbiAgUmVhY3RSb3V0ZXIucnVuKHJvdXRlcywgUmVhY3RSb3V0ZXIuSGFzaExvY2F0aW9uLCAoUm9vdCkgPT4ge1xyXG4gICAgUmVhY3QucmVuZGVyKDxSb290IC8+LCBkb2N1bWVudC5ib2R5KTtcclxuICB9KTtcclxufSkoKTtcclxuIiwiZXhwb3J0cy5tdXRhdGUgPSBBY3Rpb24uY3JlYXRlKCk7XHJcbiIsImNsYXNzIENvbXBvbmVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgdmFyIGVsID0gUmVhY3QuZmluZERPTU5vZGUodGhpcyk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGUoZWwsIHtcclxuICAgICAgICAgICAgd2lkdGg6ICcyMDBweCcsXHJcbiAgICAgICAgICAgIGhlaWdodDogJzMwMHB4J1xyXG4gICAgICAgIH0sIHRoaXMuZ2V0Q2hhcnRTdGF0ZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XHJcbiAgICAgICAgdmFyIGVsID0gUmVhY3QuZmluZERPTU5vZGUodGhpcyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoZWwsIHRoaXMuZ2V0Q2hhcnRTdGF0ZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDaGFydFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRhdGE6IHRoaXMucHJvcHMuZGF0YS50b0QzKClcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIHZhciBlbCA9IFJlYWN0LmZpbmRET01Ob2RlKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveShlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlKGVsLCBwcm9wcywgc3RhdGUpe1xyXG4gICAgICAgIHZhciB3aWR0aCA9IDMwMCxcclxuICAgICAgICAgICAgaGVpZ2h0ID0gMzAwO1xyXG5cclxuICAgICAgICB0aGlzLmZvcmNlID0gZDMubGF5b3V0LmZvcmNlKClcclxuICAgICAgICAgICAgLmdyYXZpdHkoMSlcclxuICAgICAgICAgICAgLmNoYXJnZSgtMTIwKVxyXG4gICAgICAgICAgICAubGlua0Rpc3RhbmNlKDEwKVxyXG4gICAgICAgICAgICAuc2l6ZShbd2lkdGgsIGhlaWdodF0pO1xyXG5cclxuICAgICAgICB0aGlzLnN2ZyA9IGQzLnNlbGVjdChlbCkuYXBwZW5kKFwic3ZnXCIpXHJcbiAgICAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXHJcbiAgICAgICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlKGVsLCBzdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGVsLHN0YXRlKXtcclxuICAgICAgICB0aGlzLnN2Zy5zZWxlY3RBbGwoXCIubGlua1wiKS5yZW1vdmUoKTtcclxuICAgICAgICB0aGlzLnN2Zy5zZWxlY3RBbGwoXCIubm9kZVwiKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5mb3JjZVxyXG4gICAgICAgICAgICAubm9kZXMoc3RhdGUuZGF0YS5ub2RlcylcclxuICAgICAgICAgICAgLmxpbmtzKHN0YXRlLmRhdGEubGlua3MpXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG5cclxuICAgICAgICB2YXIgbGluayA9ICB0aGlzLnN2Zy5zZWxlY3RBbGwoXCIubGlua1wiKVxyXG4gICAgICAgICAgICAuZGF0YShzdGF0ZS5kYXRhLmxpbmtzKVxyXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJsaW5lXCIpXHJcbiAgICAgICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJsaW5rXCIpXHJcbiAgICAgICAgICAgIC5zdHlsZShcInN0cm9rZVwiLCBcInJlZFwiKVxyXG4gICAgICAgICAgICAuc3R5bGUoXCJzdHJva2Utd2lkdGhcIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4gTWF0aC5zcXJ0KGQudmFsdWUpOyB9KTtcclxuXHJcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLnN2Zy5zZWxlY3RBbGwoXCIubm9kZVwiKVxyXG4gICAgICAgICAgICAuZGF0YShzdGF0ZS5kYXRhLm5vZGVzKVxyXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoXCJjaXJjbGVcIilcclxuICAgICAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcIm5vZGVcIilcclxuICAgICAgICAgICAgLmF0dHIoXCJyXCIsIDIpXHJcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgXCJncmVlblwiKVxyXG4gICAgICAgICAgICAuY2FsbCh0aGlzLmZvcmNlLmRyYWcpO1xyXG5cclxuICAgICAgICBub2RlLmFwcGVuZChcInRpdDAyLmxlXCIpXHJcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQubmFtZTsgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZm9yY2Uub24oXCJ0aWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsaW5rLmF0dHIoXCJ4MVwiLCBmdW5jdGlvbihkKSB7IHJldHVybiBNYXRoLmZsb29yKGQuc291cmNlLngpOyB9KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJ5MVwiLCBmdW5jdGlvbihkKSB7IHJldHVybiBNYXRoLmZsb29yKGQuc291cmNlLnkpOyB9KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJ4MlwiLCBmdW5jdGlvbihkKSB7IHJldHVybiBNYXRoLmZsb29yKGQudGFyZ2V0LngpOyB9KVxyXG4gICAgICAgICAgICAgICAgLmF0dHIoXCJ5MlwiLCBmdW5jdGlvbihkKSB7IHJldHVybiBNYXRoLmZsb29yKGQudGFyZ2V0LnkpOyB9KTtcclxuXHJcbiAgICAgICAgICAgIG5vZGUuYXR0cihcImN4XCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIE1hdGguZmxvb3IoZC54KTsgfSlcclxuICAgICAgICAgICAgICAgIC5hdHRyKFwiY3lcIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4gTWF0aC5mbG9vcihkLnkpOyB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmZvcmNlLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveShlbCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50OyIsImNsYXNzIE1haW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcyA9IHtcclxuICAgIHJvdXRlcjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcclxuICAgIHJvdXRlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmNcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPFJlYWN0Um91dGVyLlJvdXRlSGFuZGxlci8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTWFpbjtcclxuIiwiaW1wb3J0IE5ldHdvcmtTdG9yZSBmcm9tIFwiLi4vc3RvcmVzL25ldHdvcmtTdG9yZVwiO1xyXG5pbXBvcnQgTmV0d29ya0FjdGlvbnMgZnJvbSBcIi4uL2FjdGlvbnMvbmV0d29ya0FjdGlvbnNcIjtcclxuaW1wb3J0IEdlbm9tZUNvbXBvbmVudCBmcm9tIFwiLi9nZW5vbWUuanN4XCI7XHJcbmltcG9ydCB7R2Vub21lfSBmcm9tIFwiLi4vcm5lYXQuanNcIlxyXG5cclxuY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRlID0ge1xyXG4gICAgICAgIGdlbm9tZTogbmV3IEdlbm9tZShbXCJCdXR0b24gQVwiLFwiQnV0dG9uIEJcIl0sW1wiR29cIl0pXHJcbiAgICB9XHJcblxyXG4gICAgZG9NdXRhdGUoKXtcclxuICAgICAgICB0aGlzLnN0YXRlLmdlbm9tZS5tdXRhdGUoKVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUodGhpcy5zdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFnZVwiPlxyXG4gICAgICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwiY29sIHMxMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND5STkVBVC5qczwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExldCdzIG1ha2Ugc29tZSBvcmdhbmlzbSFcclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWZpZWxkIGNvbCBzNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEdlbm9tZUNvbXBvbmVudCBkYXRhPXt0aGlzLnN0YXRlLmdlbm9tZX0+PC9HZW5vbWVDb21wb25lbnQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWZpZWxkIGNvbCBzNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmRvTXV0YXRlLmJpbmQodGhpcyl9Pk11dGF0ZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dC1maWVsZCBjb2wgczRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQ7IiwiY2xhc3MgT3JnYW5pc20ge1xyXG4gICAgc3BlY2llcyA9IFtdXHJcbn1cclxuXHJcbmNsYXNzIFNwZWNpZXMge1xyXG4gICAgZ2Vub21lcyA9IFtdXHJcbn1cclxuXHJcbmNsYXNzIEdlbm9tZSB7XHJcbiAgICBub2RlQ291bnQgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlucHV0cyxvdXRwdXRzKXtcclxuICAgICAgICBpbnB1dHMuZm9yRWFjaCgobik9PnRoaXMubm9kZXMucHVzaChuZXcgTm9kZUdlbmUobikpKTtcclxuICAgICAgICBvdXRwdXRzLmZvckVhY2goKG4pPT50aGlzLm5vZGVzLnB1c2gobmV3IE5vZGVHZW5lKG4pKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkTmV3Tm9kZSgpe1xyXG4gICAgICAgIHZhciBub2RlID0gbmV3IE5vZGVHZW5lKFwiTm9kZV9cIit0aGlzLm5vZGVDb3VudCk7XHJcbiAgICAgICAgdGhpcy5ub2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIG11dGF0ZSgpe1xyXG4gICAgICAgIHZhciBzb3VyY2UgPSB0aGlzLmdldFJhbmRvbU5vZGUoKTtcclxuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy5nZXRSYW5kb21Ob2RlKHNvdXJjZSlcclxuICAgICAgICB2YXIgY29ubmVjdGlvbiA9IHRoaXMuZ2V0Q29ubmVjdGlvbkJldHdlZW4oc291cmNlLHRhcmdldCk7XHJcbiAgICAgICAgdmFyIHMgPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgIGlmKHM8LjUpe1xyXG4gICAgICAgICAgICB0aGlzLm11dGF0ZUNvbm5lY3Rpb25CZXR3ZWVuTm9kZXMoc291cmNlLHRhcmdldCxjb25uZWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubXV0YXRlTm9kZUJldHdlZW5Ob2Rlcyhzb3VyY2UsdGFyZ2V0LGNvbm5lY3Rpb24pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG11dGF0ZU5vZGVCZXR3ZWVuTm9kZXMoc291cmNlLHRhcmdldCxjb25uZWN0aW9uKXtcclxuICAgICAgICBpZihjb25uZWN0aW9uKXtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVDb25uZWN0aW9uQmV0d2Vlbihjb25uZWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5ld05vZGUgPSB0aGlzLmFkZE5ld05vZGUoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUNvbm5lY3Rpb25CZXR3ZWVuKHNvdXJjZSxuZXdOb2RlKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUNvbm5lY3Rpb25CZXR3ZWVuKG5ld05vZGUsdGFyZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBtdXRhdGVDb25uZWN0aW9uQmV0d2Vlbk5vZGVzKHNvdXJjZSx0YXJnZXQsY29ubmVjdGlvbil7XHJcbiAgICAgICAgaWYoY29ubmVjdGlvbil7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVDb25uZWN0aW9uQmV0d2Vlbihzb3VyY2UsdGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29ubmVjdGlvbkJldHdlZW4oc291cmNlLHRhcmdldCl7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9ucy5maWx0ZXIoKGwpPT4obC5zb3VyY2UgPT0gc291cmNlICYmIGwudGFyZ2V0ID09IHRhcmdldCkgfHwgKGwuc291cmNlID09IHRhcmdldCAmJiBsLnRhcmdldCA9PSBzb3VyY2UpKVswXTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY3JlYXRlQ29ubmVjdGlvbkJldHdlZW4oc291cmNlLHRhcmdldCl7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9ucy5wdXNoKG5ldyBDb25uZWN0R2VuZShzb3VyY2UsdGFyZ2V0KSlcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVDb25uZWN0aW9uQmV0d2Vlbihjb25uZWN0aW9uKXtcclxuICAgICAgICB0aGlzLmNvbm5lY3Rpb25zLnNwbGljZSh0aGlzLmNvbm5lY3Rpb25zLmluZGV4T2YoY29ubmVjdGlvbiksMSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmFuZG9tTm9kZShleGNsdWRlTm9kZSl7XHJcbiAgICAgICAgdmFyIG4gPSB0aGlzLm5vZGVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0aGlzLm5vZGVzLmxlbmd0aCldO1xyXG4gICAgICAgIHdoaWxlKG4gPT0gZXhjbHVkZU5vZGUpe1xyXG4gICAgICAgICAgICBuID0gdGhpcy5ub2Rlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqdGhpcy5ub2Rlcy5sZW5ndGgpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG47XHJcbiAgICB9XHJcblxyXG4gICAgZml0bmVzcyA9IDBcclxuICAgIG5vZGVzID0gW11cclxuICAgIGNvbm5lY3Rpb25zID0gW11cclxuXHJcbiAgICB0b0QzKCl7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHtcclxuICAgICAgICAgICAgbm9kZXMgOiBbXSxcclxuICAgICAgICAgICAgbGlua3MgOiBbXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ub2Rlcy5mb3JFYWNoKChuKT0+e1xyXG4gICAgICAgICAgICByZXN1bHQubm9kZXMucHVzaCh7bmFtZTpuLm5hbWUsZ3JvdXA6MX0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9ucy5mb3JFYWNoKChjKT0+e1xyXG4gICAgICAgICAgICByZXN1bHQubGlua3MucHVzaCh7c291cmNlOnRoaXMubm9kZXMuaW5kZXhPZihjLnNvdXJjZSksdGFyZ2V0OnRoaXMubm9kZXMuaW5kZXhPZihjLnRhcmdldCksdmFsdWU6MX0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTm9kZUdlbmUge1xyXG4gICAgbmFtZSA9IFwiXCJcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lKXtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDb25uZWN0R2VuZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2UsdGFyZ2V0KXtcclxuICAgICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIH1cclxuXHJcbiAgICBpbm5vdmF0aW9uU3RhZ2VzID0gW11cclxuICAgIGRpc2FibGVkID0gZmFsc2VcclxuICAgIHdlaWdodCA9IDBcclxufVxyXG5cclxuZXhwb3J0cy5HZW5vbWUgPSBHZW5vbWU7XHJcbiIsImxldCBDYWxjdWxhdGVBY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9uZXR3b3JrQWN0aW9ucycpO1xyXG5cclxuQFNpbmdsZXRvblxyXG5jbGFzcyBEYXRhU3RvcmUgZXh0ZW5kcyBTdG9yZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihJbW11dGFibGUuZnJvbUpTKFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwidzJcIixcclxuICAgICAgICAgICAgICAgIHcyQW5udWFsOiA1MDAwMCxcclxuICAgICAgICAgICAgICAgIHcySG91cmx5OiAwLFxyXG4gICAgICAgICAgICAgICAgYmVuZWZpdHM6IDAsXHJcbiAgICAgICAgICAgICAgICBjb250cmFjdEFubnVhbDogMCxcclxuICAgICAgICAgICAgICAgIGNvbnRyYWN0SG91cmx5OiAwLFxyXG4gICAgICAgICAgICAgICAgdGFrZWhvbWVBbm51YWxseTogMCxcclxuICAgICAgICAgICAgICAgIHRha2Vob21lTW9udGhseTogMCxcclxuICAgICAgICAgICAgICAgIHBlcmNlbnRXb3JrYWJsZVllYXI6IDEwMCxcclxuICAgICAgICAgICAgICAgIHdvcmthYmxlRGF5czogMzY1LFxyXG4gICAgICAgICAgICAgICAgaG91cnNQZXJEYXk6IDgsXHJcbiAgICAgICAgICAgICAgICB0YXg6IDI1LFxyXG4gICAgICAgICAgICAgICAgc2VsZkVtcGxveW1lbnRUYXg6IDcuNjUsXHJcbiAgICAgICAgICAgICAgICB2YWNhdGlvbkRheXM6IDMwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApKTtcclxuICAgICAgICBDYWxjdWxhdGVBY3Rpb25zLnVwZGF0ZUNvbnRyYWN0QW5udWFsU2FsYXJ5LnN1YnNjcmliZSh0aGlzLnVwZGF0ZUNvbnRyYWN0QW5udWFsU2FsYXJ5LmJpbmQodGhpcykpO1xyXG4gICAgICAgIENhbGN1bGF0ZUFjdGlvbnMudXBkYXRlQ29udHJhY3RIb3VybHlTYWxhcnkuc3Vic2NyaWJlKHRoaXMudXBkYXRlQ29udHJhY3RIb3VybHlTYWxhcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgQ2FsY3VsYXRlQWN0aW9ucy51cGRhdGVQYXJhbWV0ZXJzLnN1YnNjcmliZSh0aGlzLnVwZGF0ZVBhcmFtZXRlcnMuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgQ2FsY3VsYXRlQWN0aW9ucy51cGRhdGVUYWtlSG9tZUFubnVhbFNhbGFyeS5zdWJzY3JpYmUodGhpcy51cGRhdGVUYWtlSG9tZUFubnVhbFNhbGFyeS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBDYWxjdWxhdGVBY3Rpb25zLnVwZGF0ZVRha2VIb21lTW9udGhseVNhbGFyeS5zdWJzY3JpYmUodGhpcy51cGRhdGVUYWtlSG9tZU1vbnRobHlTYWxhcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgQ2FsY3VsYXRlQWN0aW9ucy51cGRhdGVXMkhvdXJseVNhbGFyeS5zdWJzY3JpYmUodGhpcy51cGRhdGVXMkhvdXJseVNhbGFyeS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBDYWxjdWxhdGVBY3Rpb25zLnVwZGF0ZVcyQW5udWFsU2FsYXJ5LnN1YnNjcmliZSh0aGlzLnVwZGF0ZVcyQW5udWFsU2FsYXJ5LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVzJBbm51YWxTYWxhcnkoNTAwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZXJzID0ge1xyXG4gICAgICAgIFwiY29udHJhY3Rhbm51YWxcIjp0aGlzLnVwZGF0ZUNvbnRyYWN0QW5udWFsU2FsYXJ5LmJpbmQodGhpcyksXHJcbiAgICAgICAgXCJjb250cmFjdGhvdXJseVwiOnRoaXMudXBkYXRlQ29udHJhY3RIb3VybHlTYWxhcnkuYmluZCh0aGlzKSxcclxuICAgICAgICBcInRha2Vob21lYW5udWFsbHlcIjp0aGlzLnVwZGF0ZVRha2VIb21lQW5udWFsU2FsYXJ5LmJpbmQodGhpcyksXHJcbiAgICAgICAgXCJ0YWtlaG9tZW1vbnRobHlcIjp0aGlzLnVwZGF0ZVRha2VIb21lTW9udGhseVNhbGFyeS5iaW5kKHRoaXMpLFxyXG4gICAgICAgIFwidzJhbm51YWxseVwiOnRoaXMudXBkYXRlVzJBbm51YWxTYWxhcnkuYmluZCh0aGlzKSxcclxuICAgICAgICBcIncyaG91cmx5XCI6dGhpcy51cGRhdGVXMkhvdXJseVNhbGFyeS5iaW5kKHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUGFyYW1ldGVycyhzdGF0ZSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlcnNbdGhpcy5zdGF0ZS5nZXQoXCJtZXRob2RcIildKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQ29udHJhY3RBbm51YWxTYWxhcnkodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNhbGNzKFwiY29udHJhY3Rhbm51YWxcIiwod0RheXMsIGhyUGVyRGF5LCB0YXgsIHNlbGZFbXBsb3ltZW50VGF4LCBiZW5lZml0cykgPT4ge1xyXG4gICAgICAgICAgICB2YXIgY29udHJhY3RBbm51YWwgPSB2YWx1ZSE9PXVuZGVmaW5lZD92YWx1ZTp0aGlzLnN0YXRlLmdldChcImNvbnRyYWN0QW5udWFsXCIpO1xyXG4gICAgICAgICAgICB2YXIgY29udHJhY3RIb3VybHkgPSB2YWx1ZS93RGF5cy9oclBlckRheVxyXG4gICAgICAgICAgICB2YXIgdGFrZWhvbWVBbm51YWxseSA9IGNvbnRyYWN0QW5udWFsKigxLXRheC8xMDAtc2VsZkVtcGxveW1lbnRUYXgvMTAwKVxyXG4gICAgICAgICAgICB2YXIgdGFrZWhvbWVNb250aGx5ID0gdGFrZWhvbWVBbm51YWxseS8xMjtcclxuICAgICAgICAgICAgdmFyIHcyQW5udWFsID0gdGFrZWhvbWVBbm51YWxseS8oMS10YXgvMTAwKTtcclxuICAgICAgICAgICAgdmFyIHcySG91cmx5ID0gdzJBbm51YWwvKDM2NSo1LzcpL2hyUGVyRGF5O1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdzJIb3VybHk6IHcySG91cmx5LFxyXG4gICAgICAgICAgICAgICAgdzJBbm51YWw6IHcyQW5udWFsLFxyXG4gICAgICAgICAgICAgICAgdGFrZWhvbWVBbm51YWxseTogdGFrZWhvbWVBbm51YWxseSxcclxuICAgICAgICAgICAgICAgIHRha2Vob21lTW9udGhseTogdGFrZWhvbWVNb250aGx5LFxyXG4gICAgICAgICAgICAgICAgY29udHJhY3RBbm51YWw6IGNvbnRyYWN0QW5udWFsLFxyXG4gICAgICAgICAgICAgICAgY29udHJhY3RIb3VybHk6IGNvbnRyYWN0SG91cmx5XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDb250cmFjdEhvdXJseVNhbGFyeSh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ2FsY3MoXCJjb250cmFjdGhvdXJseVwiLCh3RGF5cywgaHJQZXJEYXksIHRheCwgc2VsZkVtcGxveW1lbnRUYXgsIGJlbmVmaXRzKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBjb250cmFjdEhvdXJseSA9IHZhbHVlIT09dW5kZWZpbmVkP3ZhbHVlOnRoaXMuc3RhdGUuZ2V0KFwiY29udHJhY3RIb3VybHlcIik7XHJcbiAgICAgICAgICAgIHZhciBjb250cmFjdEFubnVhbCA9IHZhbHVlKndEYXlzKmhyUGVyRGF5XHJcbiAgICAgICAgICAgIHZhciB0YWtlaG9tZUFubnVhbGx5ID0gY29udHJhY3RBbm51YWwqKDEtdGF4LzEwMC1zZWxmRW1wbG95bWVudFRheC8xMDApXHJcbiAgICAgICAgICAgIHZhciB0YWtlaG9tZU1vbnRobHkgPSB0YWtlaG9tZUFubnVhbGx5LzEyO1xyXG4gICAgICAgICAgICB2YXIgdzJBbm51YWwgPSB0YWtlaG9tZUFubnVhbGx5LygxLXRheC8xMDApO1xyXG4gICAgICAgICAgICB2YXIgdzJIb3VybHkgPSB3MkFubnVhbC8oMzY1KjUvNykvaHJQZXJEYXk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB3MkhvdXJseTogdzJIb3VybHksXHJcbiAgICAgICAgICAgICAgICB3MkFubnVhbDogdzJBbm51YWwsXHJcbiAgICAgICAgICAgICAgICB0YWtlaG9tZUFubnVhbGx5OiB0YWtlaG9tZUFubnVhbGx5LFxyXG4gICAgICAgICAgICAgICAgdGFrZWhvbWVNb250aGx5OiB0YWtlaG9tZU1vbnRobHksXHJcbiAgICAgICAgICAgICAgICBjb250cmFjdEFubnVhbDogY29udHJhY3RBbm51YWwsXHJcbiAgICAgICAgICAgICAgICBjb250cmFjdEhvdXJseTogY29udHJhY3RIb3VybHlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVRha2VIb21lQW5udWFsU2FsYXJ5KHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDYWxjcyhcInRha2Vob21lYW5udWFsbHlcIiwod0RheXMsIGhyUGVyRGF5LCB0YXgsIHNlbGZFbXBsb3ltZW50VGF4LCBiZW5lZml0cykgPT4ge1xyXG4gICAgICAgICAgICB2YXIgdGFrZWhvbWVBbm51YWxseSA9IHZhbHVlIT09dW5kZWZpbmVkP3ZhbHVlOnRoaXMuc3RhdGUuZ2V0KFwidGFrZWhvbWVBbm51YWxseVwiKTtcclxuICAgICAgICAgICAgdmFyIHRha2Vob21lTW9udGhseSA9IHRha2Vob21lQW5udWFsbHkvMTI7XHJcbiAgICAgICAgICAgIHZhciB3MkFubnVhbCA9IHRha2Vob21lQW5udWFsbHkvKDEtdGF4LzEwMCk7XHJcbiAgICAgICAgICAgIHZhciB3MkhvdXJseSA9IHcyQW5udWFsLygzNjUqNS83KS9oclBlckRheTtcclxuICAgICAgICAgICAgdmFyIGNvbnRyYWN0QW5udWFsID0gKHRha2Vob21lQW5udWFsbHkrYmVuZWZpdHMpIC8gKDEgLSB0YXggLyAxMDAgLSBzZWxmRW1wbG95bWVudFRheCAvIDEwMClcclxuICAgICAgICAgICAgdmFyIGNvbnRyYWN0SG91cmx5ID0gY29udHJhY3RBbm51YWwgLyB3RGF5cyAvIGhyUGVyRGF5O1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdzJIb3VybHk6IHcySG91cmx5LFxyXG4gICAgICAgICAgICAgICAgdzJBbm51YWw6IHcyQW5udWFsLFxyXG4gICAgICAgICAgICAgICAgdGFrZWhvbWVBbm51YWxseTogdGFrZWhvbWVBbm51YWxseSxcclxuICAgICAgICAgICAgICAgIHRha2Vob21lTW9udGhseTogdGFrZWhvbWVNb250aGx5LFxyXG4gICAgICAgICAgICAgICAgY29udHJhY3RBbm51YWw6IGNvbnRyYWN0QW5udWFsLFxyXG4gICAgICAgICAgICAgICAgY29udHJhY3RIb3VybHk6IGNvbnRyYWN0SG91cmx5XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVUYWtlSG9tZU1vbnRobHlTYWxhcnkodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNhbGNzKFwidGFrZWhvbWVtb250aGx5XCIsKHdEYXlzLCBoclBlckRheSwgdGF4LCBzZWxmRW1wbG95bWVudFRheCwgYmVuZWZpdHMpID0+IHtcclxuICAgICAgICAgICAgdmFyIHRha2Vob21lTW9udGhseSA9IHZhbHVlIT09dW5kZWZpbmVkP3ZhbHVlOnRoaXMuc3RhdGUuZ2V0KFwidGFrZWhvbWVNb250aGx5XCIpO1xyXG4gICAgICAgICAgICB2YXIgdGFrZWhvbWVBbm51YWxseSA9IHRha2Vob21lTW9udGhseSoxMjtcclxuICAgICAgICAgICAgdmFyIHcyQW5udWFsID0gdGFrZWhvbWVBbm51YWxseS8oMS10YXgvMTAwKTtcclxuICAgICAgICAgICAgdmFyIHcySG91cmx5ID0gdzJBbm51YWwvKDM2NSo1LzcpL2hyUGVyRGF5O1xyXG4gICAgICAgICAgICB2YXIgY29udHJhY3RBbm51YWwgPSAodGFrZWhvbWVBbm51YWxseStiZW5lZml0cykgLyAoMSAtIHRheCAvIDEwMCAtIHNlbGZFbXBsb3ltZW50VGF4IC8gMTAwKVxyXG4gICAgICAgICAgICB2YXIgY29udHJhY3RIb3VybHkgPSBjb250cmFjdEFubnVhbCAvIHdEYXlzIC8gaHJQZXJEYXk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB3MkhvdXJseTogdzJIb3VybHksXHJcbiAgICAgICAgICAgICAgICB3MkFubnVhbDogdzJBbm51YWwsXHJcbiAgICAgICAgICAgICAgICB0YWtlaG9tZUFubnVhbGx5OiB0YWtlaG9tZUFubnVhbGx5LFxyXG4gICAgICAgICAgICAgICAgdGFrZWhvbWVNb250aGx5OiB0YWtlaG9tZU1vbnRobHksXHJcbiAgICAgICAgICAgICAgICBjb250cmFjdEFubnVhbDogY29udHJhY3RBbm51YWwsXHJcbiAgICAgICAgICAgICAgICBjb250cmFjdEhvdXJseTogY29udHJhY3RIb3VybHlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVcyQW5udWFsU2FsYXJ5KHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDYWxjcyhcIncyYW5udWFsbHlcIiwod0RheXMsIGhyUGVyRGF5LCB0YXgsIHNlbGZFbXBsb3ltZW50VGF4LCBiZW5lZml0cykgPT4ge1xyXG4gICAgICAgICAgICB2YXIgdzJBbm51YWwgPSB2YWx1ZSE9PXVuZGVmaW5lZD92YWx1ZTp0aGlzLnN0YXRlLmdldChcIncyQW5udWFsXCIpO1xyXG4gICAgICAgICAgICB2YXIgdzJIb3VybHkgPSB3MkFubnVhbC8oMzY1KjUvNykvaHJQZXJEYXk7XHJcbiAgICAgICAgICAgIHZhciB0YWtlaG9tZUFubnVhbGx5ID0gdzJBbm51YWwgKiAoMSAtIHRheCAvIDEwMCk7XHJcbiAgICAgICAgICAgIHZhciB0YWtlaG9tZU1vbnRobHkgPSB0YWtlaG9tZUFubnVhbGx5IC8gMTI7XHJcbiAgICAgICAgICAgIHZhciBjb250cmFjdEFubnVhbCA9ICh0YWtlaG9tZUFubnVhbGx5K2JlbmVmaXRzKSAvICgxIC0gdGF4IC8gMTAwIC0gc2VsZkVtcGxveW1lbnRUYXggLyAxMDApXHJcbiAgICAgICAgICAgIHZhciBjb250cmFjdEhvdXJseSA9IGNvbnRyYWN0QW5udWFsIC8gd0RheXMgLyBoclBlckRheTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHcySG91cmx5OiB3MkhvdXJseSxcclxuICAgICAgICAgICAgICAgIHcyQW5udWFsOiB3MkFubnVhbCxcclxuICAgICAgICAgICAgICAgIHRha2Vob21lQW5udWFsbHk6IHRha2Vob21lQW5udWFsbHksXHJcbiAgICAgICAgICAgICAgICB0YWtlaG9tZU1vbnRobHk6IHRha2Vob21lTW9udGhseSxcclxuICAgICAgICAgICAgICAgIGNvbnRyYWN0QW5udWFsOiBjb250cmFjdEFubnVhbCxcclxuICAgICAgICAgICAgICAgIGNvbnRyYWN0SG91cmx5OiBjb250cmFjdEhvdXJseVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVzJIb3VybHlTYWxhcnkodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNhbGNzKFwidzJob3VybHlcIiwod0RheXMsIGhyUGVyRGF5LCB0YXgsIHNlbGZFbXBsb3ltZW50VGF4LCBiZW5lZml0cykgPT4ge1xyXG4gICAgICAgICAgICB2YXIgdzJIb3VybHkgPSB2YWx1ZSE9PXVuZGVmaW5lZD92YWx1ZTp0aGlzLnN0YXRlLmdldChcIncySG91cmx5XCIpO1xyXG4gICAgICAgICAgICB2YXIgdzJBbm51YWwgPSB3MkhvdXJseSAqICgzNjUqNS83KSAqIGhyUGVyRGF5O1xyXG4gICAgICAgICAgICB2YXIgdGFrZWhvbWVBbm51YWxseSA9IE1hdGguY2VpbCh3MkFubnVhbCAqICgxIC0gdGF4IC8gMTAwKSk7XHJcbiAgICAgICAgICAgIHZhciB0YWtlaG9tZU1vbnRobHkgPSBNYXRoLmNlaWx0YWtlaG9tZUFubnVhbGx5IC8gMTI7XHJcbiAgICAgICAgICAgIHZhciBjb250cmFjdEFubnVhbCA9ICh0YWtlaG9tZUFubnVhbGx5K2JlbmVmaXRzKSAvICgxIC0gdGF4IC8gMTAwIC0gc2VsZkVtcGxveW1lbnRUYXggLyAxMDApXHJcbiAgICAgICAgICAgIHZhciBjb250cmFjdEhvdXJseSA9IE1hdGguY2VpbChjb250cmFjdEFubnVhbCAvIHdEYXlzIC8gaHJQZXJEYXkpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdzJIb3VybHk6IHcySG91cmx5LFxyXG4gICAgICAgICAgICAgICAgdzJBbm51YWw6IHcyQW5udWFsLFxyXG4gICAgICAgICAgICAgICAgdGFrZWhvbWVBbm51YWxseTogdGFrZWhvbWVBbm51YWxseSxcclxuICAgICAgICAgICAgICAgIHRha2Vob21lTW9udGhseTogdGFrZWhvbWVNb250aGx5LFxyXG4gICAgICAgICAgICAgICAgY29udHJhY3RBbm51YWw6IGNvbnRyYWN0QW5udWFsLFxyXG4gICAgICAgICAgICAgICAgY29udHJhY3RIb3VybHk6IGNvbnRyYWN0SG91cmx5XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDYWxjcyhtZXRob2QsY2FsYyl7XHJcbiAgICAgICAgdmFyIHdEYXlzID0gMzY1O1xyXG4gICAgICAgIHdEYXlzICo9IDUgLyA3O1xyXG4gICAgICAgIHdEYXlzIC09IHRoaXMuc3RhdGUuZ2V0KFwidmFjYXRpb25EYXlzXCIpXHJcbiAgICAgICAgd0RheXMgPSBNYXRoLmNlaWwod0RheXMqdGhpcy5zdGF0ZS5nZXQoXCJwZXJjZW50V29ya2FibGVZZWFyXCIpLzEwMCk7XHJcblxyXG4gICAgICAgIHZhciBoclBlckRheSA9IHRoaXMuc3RhdGUuZ2V0KFwiaG91cnNQZXJEYXlcIik7XHJcbiAgICAgICAgdmFyIHRheCA9IHRoaXMuc3RhdGUuZ2V0KFwidGF4XCIpO1xyXG4gICAgICAgIHZhciBzZWxmRW1wbG95bWVudFRheCA9IHRoaXMuc3RhdGUuZ2V0KFwic2VsZkVtcGxveW1lbnRUYXhcIik7XHJcblxyXG4gICAgICAgIHZhciBfX3JldCA9IGNhbGMod0RheXMsIGhyUGVyRGF5LCB0YXgsIHNlbGZFbXBsb3ltZW50VGF4LCB0aGlzLnN0YXRlLmdldChcImJlbmVmaXRzXCIpKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZS53aXRoTXV0YXRpb25zKChuZXdTdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmV3U3RhdGUuc2V0KFwibWV0aG9kXCIsIG1ldGhvZClcclxuICAgICAgICAgICAgICAgIG5ld1N0YXRlLnNldChcIndvcmthYmxlRGF5c1wiLCB3RGF5cylcclxuICAgICAgICAgICAgICAgIG5ld1N0YXRlLnNldChcIncyQW5udWFsXCIsIE1hdGguY2VpbChfX3JldC53MkFubnVhbCkpXHJcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZS5zZXQoXCJ3MkhvdXJseVwiLCBNYXRoLmNlaWwoX19yZXQudzJIb3VybHkpKVxyXG4gICAgICAgICAgICAgICAgbmV3U3RhdGUuc2V0KFwiY29udHJhY3RBbm51YWxcIiwgTWF0aC5jZWlsKF9fcmV0LmNvbnRyYWN0QW5udWFsKSlcclxuICAgICAgICAgICAgICAgIG5ld1N0YXRlLnNldChcImNvbnRyYWN0SG91cmx5XCIsIE1hdGguY2VpbChfX3JldC5jb250cmFjdEhvdXJseSkpXHJcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZS5zZXQoXCJ0YWtlaG9tZUFubnVhbGx5XCIsIE1hdGguY2VpbChfX3JldC50YWtlaG9tZUFubnVhbGx5KSlcclxuICAgICAgICAgICAgICAgIG5ld1N0YXRlLnNldChcInRha2Vob21lTW9udGhseVwiLCBNYXRoLmNlaWwoX19yZXQudGFrZWhvbWVNb250aGx5KSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFTdG9yZTsiXX0=
