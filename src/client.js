import './client.css';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Router, Route, Link } from 'react-router'
import { createHistory } from 'history'

let history = createHistory()

function getServerData(){
  return axios.get('/api/data')
  .then((response) => {
    return response.data;
  });
}

const DataFromServerApp = React.createClass({
      getInitialState: function() {
          return {
              dataFromServer: []
          };
      },
      render: function() {
          const dataFromServer = this.state.dataFromServer;

          return (
              <div>
                <li><Link to="/">Main</Link></li>
                <h1>
                {dataFromServer.map((data, key) =>
                  <ServerData key={key} data={data}/>)}
                </h1>
              </div>
          );
      },

      componentDidMount: function(){
          getServerData().then(data => {
            this.setState({
                dataFromServer: data
            })
          })
      }
})

const ServerData = React.createClass({
    render: function() {
        return (
            <div>
                {this.props.data}
            </div>
        );
    }
});

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
                <li><Link to="/data">Data</Link></li>
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

const routes = (
  <Router>
    <Route path="/" component={CounterApp}/>
    <Route path="data" component={DataFromServerApp} />
  </Router>
);

ReactDOM.render(
  routes,
  document.getElementById('app')
);
