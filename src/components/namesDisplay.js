import React from 'react';
import { Link } from 'react-router'

const NamesDisplay = React.createClass({
      render: function() {
          const namesFromServer = this.props.namesFromServer;

          return (
              <div>
                  {namesFromServer.map((name, key) =>
                  <li key={key}>
                    <Link to={`/greeter/${name}`}>{name}</Link>
                  </li>)}
              </div>
          );
      }
})

export default NamesDisplay;
