import React from 'react';

import Api from '../../api';
import { Input } from 'react-bootstrap';

const Task = React.createClass({
  getInitialState: function() {
      return {
          taskText: "", //change to this.refs.taskText.refs.input.value;
          isDone: false
      };
  },
  onChangeTaskText: function(){
    //delete task if text empty
    const newText = this.refs.taskText.refs.input.value;
    if(newText === ""){
      Api.deleteTask(this.props.listId, this.props.id).then(response =>{
        this.props.updateListTasks();
      });
      return; //deleted -> return
    }
    //add new task
    const taskTextOldValue = this.state.taskText;
    if(taskTextOldValue === ""){
      Api.createNewTask(this.props.listId, "", false).then(response =>{
        this.props.updateListTasks();
      });
    }

    this.setState({ taskText: this.refs.taskText.refs.input.value });
    Api.updateTaskText(this.props.listId, this.props.id, newText).catch(response =>{
      this.setState({ taskText: taskTextOldValue });
    });
  },
  onChangeIsDoneCheckbox: function(){
    const isDoneOldValue = this.state.isDone;
    this.setState({ isDone: this.refs.isDoneCheckBox.checked });
    Api.updateTaskIsDone(this.props.id, this.refs.isDoneCheckBox.checked).catch(response =>{
      this.setState({ isDone: isDoneOldValue });
    });
  },

  render: function(){
    const innerCheckbox = this.state.isDone ?
      <input
      ref="isDoneCheckBox"
      type="checkbox"
      aria-label="..."
      checked
      onChange={this.onChangeIsDoneCheckbox}/>
      :
      <input
      ref="isDoneCheckBox"
      type="checkbox"
      aria-label="..."
      onChange={this.onChangeIsDoneCheckbox}/>;

    return(
       <Input
       ref="taskText"
       type="textarea"
       placeholder={this.props.placeholder}
       value={this.state.taskText}
       addonAfter={innerCheckbox}
       onChange={this.onChangeTaskText}/>
    )
  },
  componentDidMount: function(){
      Api.getTask(this.props.id).then(data => {
        this.setState({
            taskText: data.taskText,
            isDone: data.isDone
        })
      });
  }
})

export default Task;
