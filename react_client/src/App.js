import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Register'
import withAuth from './withAuth'
import Home from './Home'

function App() {
  return (
    <div>
        <Switch>
          <Route path="/" exact component={withAuth(Home)}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
        </Switch>
      </div>
  );
}

export default App;
