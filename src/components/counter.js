import React from 'react';

const CounterApp = React.createClass({
    getInitialState: function() {
        return {
            count: 0
        };
    },
    incrementCounter: function () {
        this.setState({
            count: this.state.count + 1
        });
    },
    decrementCounter: function () {
        this.setState({
            count: this.state.count - 1
        });
    },

    render: function() {
        return (
            <div>
                <h1>Counter1
                <Counterizer
                    count={this.state.count}
                    onIncrementCounter={this.incrementCounter}
                    onDecrementcounter={this.decrementCounter}/>
                </h1>
                <h1>Counter2
                <Counterizer
                    count={this.state.count}
                    onIncrementCounter={this.incrementCounter}
                    onDecrementcounter={this.decrementCounter}/>
                </h1>
            </div>
        );
    }
});

const Counterizer = React.createClass({
    render: function() {
        return (
            <div className="counterButton">
                {this.props.count}
                <button onClick={this.props.onIncrementCounter}>Increment</button>
                <button onClick={this.props.onDecrementcounter}>Decrement</button>
            </div>
        );
    }
});

export default CounterApp;
