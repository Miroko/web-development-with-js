var port = 8888;

var path = require('path');
var url = require('url');
var express = require('express');
var bodyParser = require('body-parser')
var webpack = require('webpack');
var config = require('../webpack.config.dev');

var app = express();
var compiler = webpack(config);

app.use(bodyParser.json());
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

var currentTaskId = 062623;
var curretTaskListId = 0;
var curretBoardId = 0;
function generateTaskId(){
  currentTaskId = currentTaskId + 1;
  return currentTaskId;
};
function generateTaskList(){
  curretTaskListId = curretTaskListId + 1;
  return curretTaskListId;
};
function generateBoardId(){
  curretBoardId = curretBoardId + 1;
  return curretBoardId;
};

const taskMap = new Map();
taskMap.set(0, { taskText: "test0", isDone: true });
taskMap.set(1, { taskText: "", isDone: false });
taskMap.set(2, { taskText: "test2", isDone: false });
taskMap.set(3, { taskText: "test3", isDone: false });
taskMap.set(4, { taskText: "", isDone: false });
taskMap.set(5, { taskText: "", isDone: false });

const taskListMap = new Map();
taskListMap.set(0, { title: "Title0", taskIds: new Set([0, 1]) })
taskListMap.set(1, { title: "Title1", taskIds: new Set([2, 3, 4]) })
taskListMap.set(2, { title: "Title2", taskIds: new Set([5]) })

const boardMap = new Map();
boardMap.set(0, { title: "Board0", taskListIds: new Set([0, 1, 2]) } );

app.put('/api/:taskListId/:taskId/text', function (req, res) {
  const task = taskMap.get(Number(req.params.taskId));
  task.taskText = req.body.taskText;
  res.sendStatus(200);
});
app.put('/api/task/:id/isDone', function (req, res) {
  const task = taskMap.get(Number(req.params.id));
  task.isDone = req.body.isDone;
  res.sendStatus(200);
});
app.put('/api/:taskListId/task', function (req, res) {
  const taskId = generateTaskId();
  taskMap.set(taskId, { taskText: req.body.taskText, isDone: req.body.isDone });
  const taskList = taskListMap.get(Number(req.params.taskListId));
  taskList.taskIds.add(Number(taskId));
  res.sendStatus(200);
});
app.put('/api/:taskListId/:taskId/delete', function (req, res) {
  taskMap.delete(req.params.taskId);
  const taskList = taskListMap.get(Number(req.params.taskListId));
  taskList.taskIds.delete(Number(req.params.taskId));
  res.sendStatus(200);
});

app.get('/api/task/:id', function (req, res, next) {
  const task = taskMap.get(Number(req.params.id));
  if(task === undefined) res.sendStatus(500);
  else res.send(task);
});
app.get('/api/taskList/:id', function (req, res, next) {
  const taskList = taskListMap.get(Number(req.params.id));
  if(taskList === undefined){
    res.sendStatus(500);
  }
  else{
    res.status(200);
    res.send({title: taskList.title, taskIds: Array.from(taskList.taskIds)});
  }
});
app.get('/api/board/:id', function (req, res, next) {
  const board = boardMap.get(Number(req.params.id));
  if(board === undefined){
    res.sendStatus(500);
  }
  else{
    res.status(200);
    res.send({title: board.title, taskListIds: Array.from(board.taskListIds)});
  }
});

app.listen(port, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:' + port);
});
