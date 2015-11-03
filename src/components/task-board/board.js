import React from 'react';
import { Panel, Grid, Row, Col, Button, PageHeader, Input } from 'react-bootstrap';

import TaskList from './task-list';

const Board = React.createClass({
  titleChanged: function(){
    const newTitle = this.refs.title.refs.input.value;
    this.props.updateBoardTitle(
      this.props.boardId,
      newTitle);
  },
  addNewList: function(){
    this.props.createTaskList(
      this.props.boardId);
  },
  render: function(){
    return(
      <span className="board">
        <Input
        ref="title"
        className="text-center"
        type="text"
        bsSize="large"
        value={this.props.title}
        placeholder="Add title..."
        onChange={this.titleChanged}/>
        <Grid className="board-grid">
          {
            this.props.taskLists.map((taskList, index) =>
            <Col className="board-grid-cell" key={taskList.id} xs={6} sm={6} md={4} lg={3} >
              <TaskList
              key={taskList.id}
              boardId={this.props.boardId}
              listId={taskList.id}
              title={taskList.title}
              tasks={Array.from(taskList.tasks.values())}

              //render
              updateData={this.props.updateData}

              //list functions
              updateTaskListTitle={this.props.updateTaskListTitle}
              deleteTaskList={this.props.deleteTaskList}

              //task functions
              createTask={this.props.createTask}
              updateTaskText={this.props.updateTaskText}
              updateTaskIsDone={this.props.updateTaskIsDone}
              deleteTask={this.props.deleteTask}
              />
            </Col>)
          }
          <Col className="board-grid-cell" xs={12}>
            <Button bsSize="large" onClick={this.addNewList}>Add new list</Button>
          </Col>
        </Grid>
      </span>
    )
  }
})

export default Board;
