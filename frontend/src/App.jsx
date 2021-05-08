import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Today from './Today';
import List from './List';
import Calendar from './Calendar';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
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
    </div>
  );
}

export default App;
