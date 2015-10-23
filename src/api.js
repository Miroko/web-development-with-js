import axios from 'axios';

export default {
  updateTaskText: function(listId, taskId, taskText){
    return axios.put('/api/'+listId+'/'+taskId+'/text' , { taskText: taskText });
  },
  updateTaskIsDone: function(id, isDone){
    return axios.put('/api/task/'+id+'/isDone', { isDone: isDone });
  },

  getBoard: function(id){
    return axios.get('/api/board/'+id).then(response => {
      return response.data;
    });
  },
  getTaskList: function(id){
    return axios.get('/api/taskList/'+id).then(response => {
      return response.data;
    });
  },
  getTask: function(id){
    return axios.get('/api/task/'+id).then(response => {
      return response.data;
    });
  },

  createNewTask: function(listId, taskText, isDone){
    return axios.put('/api/'+listId+'/task', { taskText: taskText, isDone: isDone });
  },
  deleteTask: function(listId, taskId){
    return axios.put('/api/'+listId+'/'+taskId+'/delete');
  }
}
