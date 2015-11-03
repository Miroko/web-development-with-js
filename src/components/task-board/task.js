import React from 'react';
import { Input, Button } from 'react-bootstrap';

const Task = React.createClass({
  componentDidMount(){
    this.expandTextAreaToText();
  },
  expandTextAreaToText: function(){
    const element = this.refs.taskText.refs.input;
    const style = window.getComputedStyle(element);
    if(element.scrollHeight > parseInt(style.height)){
      element.style.height = String(element.scrollHeight) + "px";
    }
  },
  textChanged: function(){
    const newText = this.refs.taskText.refs.input.value;
    //delete task if text empty
    if(newText === ""){
      this.props.deleteTask(
        this.props.boardId,
        this.props.listId,
        this.props.taskId);
      return; //deleted -> return
    }
    //create new task if text added to empty
    if(this.props.text === ""){
      this.props.createTask(
        this.props.boardId,
        this.props.listId,
        "",
        false);
    }
    this.props.updateTaskText(
      this.props.boardId,
      this.props.listId,
      this.props.taskId,
      newText);

    this.expandTextAreaToText();
  },
  isDoneChanged: function(){
    this.props.updateTaskIsDone(
      this.props.boardId,
      this.props.listId,
      this.props.taskId,
      !this.props.isDone);
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    if(this.props.updateData.taskEditedId === null) return true;
    else if(this.props.updateData.taskEditedId === this.props.taskId) return true;
    return false;
  },
  render: function(){
    const textAreaWithButton =
    <span className="task">
      <Input
      className="task-text"
      ref="taskText"
      type="textarea"
      placeholder={this.props.placeholder}
      value={this.props.text}
      onChange={this.textChanged}
      bsStyle={(()=>{
          if(this.props.text === "") return null;
          else if(this.props.isDone) return "success";
          else                       return "error";
      })()}
      addonAfter={
        <Button
        className="task-button"
        onClick={this.isDoneChanged}
        disabled={this.props.text === "" ? true : false}
        bsStyle={(()=>{
            if(this.props.text === "") return null;
            else if(this.props.isDone) return "success";
            else                       return "danger";
        })()}
        >
        {(()=>{
          if(this.props.text === "") return "Todo";
          else if(this.props.isDone) return "Undo";
          else                       return "Done";
          }
        )()}
        </Button>}
      />
    </span>
    return(textAreaWithButton);
  }
})

export default Task;
