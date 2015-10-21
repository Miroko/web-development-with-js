import React from 'react';

const DataDisplay = React.createClass({
      getInitialState: function() {
          return {
              dataFromServer: []
          };
      },
      render: function() {
          const dataFromServer = this.props.dataFromServer;

          return (
              <div>
                <h1>
                {dataFromServer.map((data, key) =>
                  <ServerData key={key} data={data}/>)}
                </h1>
              </div>
          );
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

export default DataDisplay;
