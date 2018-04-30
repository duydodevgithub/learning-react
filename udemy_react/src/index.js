import React from "react";
import ReactDOM from "react-dom";


class Counter extends React.Component {
    state = {
        count: 1
    }

    // why does addOne does not work?
    
    addOne() {
        console.log(this.state.count);
    }

    // minusOne works
    minusOne = () => {
        console.log(this.state.count);
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
  