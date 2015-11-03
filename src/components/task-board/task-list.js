import React from 'react';
import { Panel, Input, Button } from 'react-bootstrap';

import Task from './task';

const List = React.createClass({
  titleChanged: function(){
    const newTitle = this.refs.title.refs.input.value;
    this.props.updateTaskListTitle(
      this.props.boardId,
      this.props.listId,
      newTitle);
  },
  removeList: function(){
    this.props.deleteTaskList(
      this.props.boardId,
      this.props.listId);
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    if(this.props.updateData.listEditedId === null) return true;
    else if(this.props.updateData.listEditedId === this.props.listId) return true;
    return true;
  },
  render: function(){
    return(
      <Panel
      className="task-list"
      header=
        {
          <span className="input-group">
            <Input
            ref="title"
            type="text"
            placeholder="Add title..."
            value={this.props.title}
            onChange={this.titleChanged}/>
            <span className="input-group-btn">
              <Button onClick={this.removeList}>Remove</Button>
            </span>
          </span>
        }>
        {
         this.props.tasks.map((task, index) =>
         <Task
         key={task.id}
         boardId={this.props.boardId}
         listId={this.props.listId}
         taskId={task.id}
         text={task.text}
         isDone={task.isDone}
         placeholder="Add new task..."

         //render
         updateData={this.props.updateData}

         //task functions
         createTask={this.props.createTask}
         updateTaskText={this.props.updateTaskText}
         updateTaskIsDone={this.props.updateTaskIsDone}
         deleteTask={this.props.deleteTask}
         />)
        }
      </Panel>
    )
  }
})

export default List;
