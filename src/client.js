import 'bootstrap/dist/css/bootstrap.css'
import './client.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'

import TodoApp from './components/todoApp'

import { createHistory } from 'history';
let history = createHistory();

const routes = (
  <Router history={history}>
    <Route path="/" component={TodoApp}/>
  </Router>
);

ReactDOM.render(
  routes,
  document.getElementById('app')
);
