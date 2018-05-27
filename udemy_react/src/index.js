import React from "react";
import ReactDOM from "react-dom";
import Addalert from "./component";


class Counter extends React.Component {
    state = {
        count: 1
    }

    // why does "this" in addOne does not work?
    addOne = () => {
        console.log(this);
        this.setState((prev) => ({count: prev.count + 1}) )
    }

    // minusOne works
    minusOne = () => {
        this.setState((prev) => ({count: prev.count -1}))
    }

    reset = () => {
        this.setState({count: 0})
    }
   
    render() {
        return(
            <div>
                <h1>Counter: {this.state.count}</h1>
                <button onClick={this.addOne}>+1</button>
                <button onClick={this.minusOne}>-1</button>
                <button onClick={this.reset}>Reset</button>
            </div>
        )
    }
}
  
  ReactDOM.render(<Counter />, document.getElementById('root'));
  