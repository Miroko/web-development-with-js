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
          return (
              <div>
                <h1>
                  <Link to="/counter">Counter</Link>
                </h1>
                <h1>
                  <Link to="/data">Data</Link>
                </h1>
                <h1>
                  <Link to="/names">Names</Link>
                </h1>
                {this.props.children && React.cloneElement(this.props.children, {
                    namesFromServer:  this.state.namesFromServer,
                    dataFromServer: this.state.dataFromServer
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
