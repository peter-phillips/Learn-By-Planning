/* eslint-disable import/no-named-as-default */
import React from 'react';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';
import Login from './Login';
import CreateNew from './CreateNew';

function StartUp() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/CreateNew">
            <CreateNew />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default StartUp;
