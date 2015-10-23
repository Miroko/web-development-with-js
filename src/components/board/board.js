import React from 'react';
import { Navbar, Grid, Row, Col } from 'react-bootstrap';

import Api from '../../api'
import TaskList from './task-list';

const Board = React.createClass({
  getInitialState: function() {
      return {
          title: "",
          taskListIds: []
      };
  },
  render: function(){
    return(
      <form>
      <Navbar>{this.state.title}</Navbar>
      <Grid>
        <Row>
          {
            this.state.taskListIds.map((id, key) =>
            <Col
            xs={0}
            sm={6}
            md={6}
            key={key}
            >
            <TaskList
            id={id}
            /></Col>)
          }
        </Row>
      </Grid>
      </form>
    )
  },
  componentDidMount: function(){
      Api.getBoard(this.props.id).then(data => {
        this.setState({
            title: data.title,
            taskListIds: data.taskListIds
        })
      })
  }
})

export default Board;
