import React from 'react';
import { Link } from 'react-router'

import Board from './board/board'

import { Panel, Button } from 'react-bootstrap';

const TodoApp = React.createClass({
  render: function() {
      return (
        <Board
        id={0}
        />
      );
  }
})

export default TodoApp;
