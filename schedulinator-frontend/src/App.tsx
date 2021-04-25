import React from 'react';
import{ BrowserRouter, Router, Switch, Route, Link} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>

      <Switch>
        <Route exact path="/">

        </Route>
        <Route path="/settings">
          
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
