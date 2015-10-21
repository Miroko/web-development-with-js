import React from 'react';
import axios from 'axios';
import { Link } from 'react-router'

function getServerNames(){
  return axios.get('/api/names')
  .then((response) => {
    return response.data;
  });
}

function getServerData(){
  return axios.get('/api/data')
  .then((response) => {
    return response.data;
  });
}

const MainApp = React.createClass({
      getInitialState: function() {
          return {
              namesFromServer: [],
              dataFromServer: []
          };
      },
      render: function() {
          const namesFromServer = this.state.namesFromServer;
          const dataFromServer = this.state.dataFromServer;

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
                {this.props.children && React.cloneElement(this.props.children, {
                    dataFromServer: dataFromServer
                })}
              </div>
          );
      },

      componentDidMount: function(){
          getServerNames().then(data => {
            this.setState({
                namesFromServer: data
            })
          }),
          getServerData().then(data => {
            this.setState({
                dataFromServer: data
            })
          })
      }
})

export default MainApp;
