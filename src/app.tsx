import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Analysis from './routes/analysis';
import Currencies from './routes/currencies';
import Header from './components/layout/header';
import './styles/app.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <div className="page-container">
          <Switch>
            <Route path="/analysis">
              <Analysis />
            </Route>
            <Route path="/currencies">
              <Currencies />
            </Route>
            <Route path="/">
              <Redirect to="/analysis" />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default hot(module)(App);
