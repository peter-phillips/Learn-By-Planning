/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Header from './Header';
import List from './List';
import Calendar from './Calendar';
import StartUp from './StartUp';
import Today from './Today';
import authContext from './authContext';

function App() {
  const [auth, setAuth] = useState(false);
  if (!auth) {
    return (
      <authContext.Provider value={{ auth, setAuth }}>
        <StartUp />
      </authContext.Provider>
    );
  }
  return (
    <div>
      <authContext.Provider value={{ auth, setAuth }}>
        <BrowserRouter>
          <Header />
          <Redirect to="Today" />
          <main>
            <Switch>
              <Route path="/Calendar">
                <Calendar />
              </Route>
              <Route path="/List">
                <List />
              </Route>
              <Route path="/Today">
                <Today />
              </Route>
            </Switch>
          </main>
        </BrowserRouter>
      </authContext.Provider>
    </div>
  );
}

export default App;
