import './App.css';
import Header from './Header.js';
import Today from './Today.js';
import List from './List.js';
import Calendar from './Calendar.js';
import {BrowserRouter, Route , Switch} from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <main>
          <Switch>
            <Route path='/Calendar'>
              <Calendar />
            </Route>
            <Route path='/List'>
              <List />
            </Route>
            <Route path='/'>
              <Today />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;