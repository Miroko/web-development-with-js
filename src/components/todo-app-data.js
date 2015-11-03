
export default {
  boards: null,

  //RESET
  reset: function(){
    this.boards = new Map();
  },
  //ADD
  addBoard: function(boardId, title, taskLists){
    const parsedTaskLists = new Map();
    taskLists.forEach((list, index, array)=>{
      //parse task lists
      const parsedTasks = new Map();
      list.tasks.forEach((task, index, array)=>{
        //parse tasks to lists
        parsedTasks.set(task.id, { id: task.id, text: task.text, isDone: task.isDone });
      });
      parsedTaskLists.set(list.id, { id: list.id, title: list.title, tasks: parsedTasks });
    });
    //add parsed board
    this.boards.set(boardId, { id: boardId, title: title, taskLists: parsedTaskLists });
  },
  addTaskList: function(boardId, listId, title, tasks){
    const parsedTasks = new Map();
    tasks.forEach((task, index, array)=>{
      //parse tasks to lists
      parsedTasks.set(task.id, { id: task.id, text: task.text, isDone: task.isDone });
    });
    this.getBoard(boardId).taskLists.set(listId, { id: listId, title: title, tasks: parsedTasks });
  },
  addTask: function(boardId, listId, taskId, text, isDone){
    this.getTaskList(boardId, listId).tasks.set(taskId, { id: taskId, text: text, isDone: isDone });
  },
  //GET
  getBoard: function(boardId){
    return this.boards.get(boardId);
  },
  getTaskList: function(boardId, listId){
    return this.getBoard(boardId).taskLists.get(listId);
  },
  getTask: function(boardId, listId, taskId){
    return this.getTaskList(boardId, listId).tasks.get(taskId);
  }
}
