import React from 'react';
import { Link } from 'react-router'

import Api from '../api'

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
          Api.getServerNames().then(data => {
            this.setState({
                namesFromServer: data
            })
          }),
          Api.getServerData().then(data => {
            this.setState({
                dataFromServer: data
            })
          })
      }
})

export default MainApp;
