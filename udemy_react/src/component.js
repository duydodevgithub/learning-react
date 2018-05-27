import React from "react";

class Addalert extends React.Component {
    state = {
        name : ""
    }

    handleChange = (e) => {
        this.setState({name: e.target.value})
    }
    render() {
        return(
            <div>
                <form>
                    <input type="text" value={this.state.name} onChange={this.handleChange}/>
                </form>
                <button onClick={() => {this.props.addalert(this.state.name)}}>Click me to test</button>
            </div>
        )
    }
}

export default Addalert;