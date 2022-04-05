import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import GamePage from './pages/GamePage';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />

      <Route path="/gamepage" component={ GamePage } />

    </Switch>
  );
}
