import React from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';

import Api from '../api'
import Board from './task-board/board'
import TodoAppData from './todo-app-data'

const UpdateData = {
  //null = all
  //id = element with that id
  //-1 = none
  //null, null -> render all lists and tasks
  //list, null -> render single list without tasks
  //list, task -> render single task
  listEditedId: null,
  taskEditedId: null
};

const TodoApp = React.createClass({
  getInitialState: function(){
    return({
      index: 0,
      direction: null,
      TodoAppData,
      sortedTaskListIds: [],
      UpdateData });
  },
  getSortedIds: function(taskLists){
    const sortedIds = [];
    taskLists = Array.from(taskLists.values()).sort(function(listA, listB){ return listB.tasks.size - listA.tasks.size; });
    taskLists.forEach((list, index, array)=>{
      sortedIds.push(list.id);
    });
    return sortedIds;
  },
  handleSelect(selectedIndex, selectedDirection) {
    if(selectedDirection !== "next" && selectedDirection !== "prev") return;
    this.setState({
      index: selectedIndex,
      direction: selectedDirection
    });
  },
  render: function() {
    if(this.state.TodoAppData.boards === null) return null;

    const board = this.state.TodoAppData.getBoard(Number(this.props.params.boardId));

    //get task lists in sorted order
    const taskLists = [];
    this.state.sortedTaskListIds.forEach((sortedId, index, array)=>{
      taskLists.push(board.taskLists.get(sortedId));
    });

    return (
      <Carousel className="board-carousel" activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
        <CarouselItem index={0}>
          <Board
          boardId={board.id}
          title={board.title}
          taskLists={taskLists}

          //render
          updateData={this.state.UpdateData}

          //board functions
          updateBoardTitle={this.updateBoardTitle}

          //list functions
          createTaskList={this.createTaskList}
          updateTaskListTitle={this.updateTaskListTitle}
          deleteTaskList={this.deleteTaskList}

          //task functions
          createTask={this.createTask}
          updateTaskText={this.updateTaskText}
          updateTaskIsDone={this.updateTaskIsDone}
          deleteTask={this.deleteTask}
          />
        </CarouselItem>
        <CarouselItem index={1}>
          <Board
          boardId={board.id}
          title={board.title}
          taskLists={taskLists}

          //render
          updateData={this.state.UpdateData}

          //board functions
          updateBoardTitle={this.updateBoardTitle}

          //list functions
          createTaskList={this.createTaskList}
          updateTaskListTitle={this.updateTaskListTitle}
          deleteTaskList={this.deleteTaskList}

          //task functions
          createTask={this.createTask}
          updateTaskText={this.updateTaskText}
          updateTaskIsDone={this.updateTaskIsDone}
          deleteTask={this.deleteTask}
          />
        </CarouselItem>
      </Carousel>
    );
  },
  componentDidMount: function(){
    Api.getBoard(this.props.params.boardId)
    .then(data => {
      this.state.TodoAppData.reset();

      TodoAppData.addBoard(data.id, data.title, data.taskLists);
      this.setState({ TodoAppData });

      UpdateData.listEditedId = null;
      UpdateData.taskEditedId = null;
      this.setState({ UpdateData })

      this.setState({ sortedTaskListIds: this.getSortedIds(TodoAppData.getBoard(Number(this.props.params.boardId)).taskLists) });
    });
  },
  //Board functions
  updateBoardTitle: function(boardId, newTitle){
    const board = TodoAppData.getBoard(boardId);
    const oldTitle = board.title;
    board.title = newTitle;
    this.setState({
      TodoAppData });
    Api.updateBoardTitle(boardId, newTitle)
    .catch(data =>{
      board.title = oldTitle;
      this.setState({
        TodoAppData });
    });
  },

  //List functions
  createTaskList: function(boardId){
    Api.createTaskList(boardId, "")
    .then(data =>{
      TodoAppData.addTaskList(boardId, data.id, data.title, data.tasks);
      UpdateData.listEditedId = null;
      UpdateData.taskEditedId = null;
      this.setState({
        TodoAppData,
        UpdateData,
        sortedTaskListIds: this.getSortedIds(TodoAppData.getBoard(Number(this.props.params.boardId)).taskLists) });
    });
  },
  updateTaskListTitle: function(boardId, listId, newTitle){
    const list = TodoAppData.getBoard(boardId).taskLists.get(listId);
    const oldTitle = list.title;
    list.title = newTitle;
    UpdateData.listEditedId = listId;
    UpdateData.taskEditedId = -1;
    this.setState({
      TodoAppData,
      UpdateData });
    Api.updateTaskListTitle(boardId, listId, newTitle)
    .catch(data =>{
      list.title = oldTitle;
      this.setState({
        TodoAppData });
    });
  },
  deleteTaskList: function(boardId, listId){
    TodoAppData.getBoard(boardId).taskLists.delete(listId);
    UpdateData.listEditedId = null;
    UpdateData.taskEditedId = null;
    this.setState({
      TodoAppData,
      UpdateData,
      sortedTaskListIds: this.getSortedIds(TodoAppData.getBoard(Number(this.props.params.boardId)).taskLists) });
    Api.deleteTaskList(boardId, listId)
    .catch(response =>{ });
  },

  //Task functions
  createTask: function(boardId, listId){
    Api.createTask(boardId, listId, "", false)
    .then(data =>{
      TodoAppData.addTask(boardId, listId, data.id, data.text, data.isDone);
      UpdateData.listEditedId = null;
      UpdateData.taskEditedId = null;
      this.setState({
        TodoAppData,
        UpdateData });
    });
  },
  updateTaskText: function(boardId, listId, taskId, newText){
    const task = TodoAppData.getTask(boardId, listId, taskId);
    const oldText = task.text;
    task.text = newText;
    UpdateData.listEditedId = listId;
    UpdateData.taskEditedId = taskId;
    this.setState({
      TodoAppData,
      UpdateData });
    Api.updateTaskText(boardId, listId, taskId, newText)
    .catch(response =>{
      task.text = oldText;
      this.setState({
        TodoAppData });
    });
  },
  updateTaskIsDone: function(boardId, listId, taskId, newIsDone){
    const task = TodoAppData.getTask(boardId, listId, taskId);
    const oldIsDone = task.isDone;
    task.isDone = newIsDone;
    UpdateData.listEditedId = listId;
    UpdateData.taskEditedId = taskId;
    this.setState({
      TodoAppData,
      UpdateData
     });
    Api.updateTaskIsDone(boardId, listId, taskId, newIsDone)
    .catch(response =>{
      task.isDone = oldIsDone;
      this.setState({
        TodoAppData });
    });
  },
  deleteTask: function(boardId, listId, taskId){
    TodoAppData.getTaskList(boardId, listId).tasks.delete(taskId);
    UpdateData.listEditedId = listId;
    UpdateData.taskEditedId = -1;
    this.setState({
      TodoAppData,
      UpdateData,
      sortedTaskListIds: this.getSortedIds(TodoAppData.getBoard(Number(this.props.params.boardId)).taskLists) });
    Api.deleteTask(boardId, listId, taskId)
    .catch(response =>{ });
  }
});

export default TodoApp;
