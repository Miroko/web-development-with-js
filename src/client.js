import './client.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'

import Main from './components/main'
import DataDisplay from './components/dataDisplay'
import NamesDisplay from './components/namesDisplay'
import Counter from './components/counter'
import Greeter from './components/greeter'

import { createHistory } from 'history';
let history = createHistory();

const routes = (
  <Router history={history}>
    <Route path="/" component={Main}>
      <Route path="/greeter/:name" component={Greeter} />
      <Route path="/counter" component={Counter} />
      <Route path="/data" component={DataDisplay} />
      <Route path="/names" component={NamesDisplay} />
    </Route>
  </Router>
);

ReactDOM.render(
  routes,
  document.getElementById('app')
);
