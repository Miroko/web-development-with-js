import React from 'react';

import Api from '../../api';
import Task from './task';
import { Panel, Input } from 'react-bootstrap';

const List = React.createClass({
  getInitialState: function() {
      return {
          title: "",
          taskIds: []
      };
  },
  render: function(){
    return(
      <Panel header={this.state.title} bsStyle="primary">
        {
           this.state.taskIds.map(id =>
           <Task
           key={id}
           id={id}
           listId={this.props.id}
           placeholder={"Add new task..."}
           updateListTasks={this.updateTasks}
           />)
        }
      </Panel>
    )
  },
  componentDidMount: function(){
      this.updateTasks();
  },
  updateTasks: function(){
    return Api.getTaskList(this.props.id).then(data => {
      this.setState({
          title: data.title,
          taskIds: data.taskIds
      })
    });
  }
})

export default List;
