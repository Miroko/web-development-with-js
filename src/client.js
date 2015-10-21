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

function getServerNames(){
  return axios.get('/api/names')
  .then((response) => {
    return response.data;
  });
}

const MainApp = React.createClass({
      getInitialState: function() {
          return {
              namesFromServer: []
          };
      },
      render: function() {
          const namesFromServer = this.state.namesFromServer;

          return (
              <div>
                <h1>
                  <Link to="/counter">Counter</Link>
                </h1>
                <h1>
                  <Link to="/data">Data</Link>
                </h1>
                {namesFromServer.map((name, key) =>
                  <li>
                    <Link key={key} to={`/hello/${name}`}>{name}</Link>
                  </li>)}
                {this.props.children}
              </div>
          );
      },

      componentDidMount: function(){
          getServerNames().then(data => {
            this.setState({
                namesFromServer: data
            })
          })
      }
})

const Greeter = React.createClass({
    render: function(){
      const { name } = this.props.params;
      return (
        <h1>
          Hello {name}
        </h1>
      )
    }
});

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
    <Route path="/" component={MainApp}>
      <Route path="/hello/:name" component={Greeter} />
      <Route path="/counter" component={CounterApp} />
      <Route path="/data" component={DataFromServerApp} />
    </Route>
  </Router>
);

ReactDOM.render(
  routes,
  document.getElementById('app')
);
