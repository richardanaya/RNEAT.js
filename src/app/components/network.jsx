import NetworkStore from "../stores/networkStore";
import NetworkActions from "../actions/networkActions";
import GenomeComponent from "./genome.jsx";
import {Genome} from "../rneat.js"

class Component extends React.Component {
    state = {
        genome: new Genome(["Button A","Button B"],["Go"])
    }

    doMutate(){
        this.state.genome.mutate()
        this.setState(this.state);
    }

    render() {
        return (
            <div className="page">
                <form className="col s12">
                    <div className="row">
                        <h4>Neural Network Experiment</h4>
                        Let's make some organism!
                    </div>
                    <div className="row">
                        <div className="input-field col s4">
                            <GenomeComponent data={this.state.genome}></GenomeComponent>
                        </div>
                        <div className="input-field col s4">
                            <button onClick={this.doMutate.bind(this)}>Mutate</button>
                        </div>
                        <div className="input-field col s4">
                            C
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

module.exports = Component;