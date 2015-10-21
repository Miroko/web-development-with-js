import './client.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'

import Main from './components/main'
import DataDisplay from './components/dataDisplay'
import Counter from './components/counter'
import Greeter from './components/greeter'

const routes = (
  <Router>
    <Route path="/" component={Main}>
      <Route path="/hello/:name" component={Greeter} />
      <Route path="/counter" component={Counter} />
      <Route path="/data" component={DataDisplay} />
    </Route>
  </Router>
);

ReactDOM.render(
  routes,
  document.getElementById('app')
);
