import React, {useContext} from 'react';
import authContext from './authContext';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './Login';
import CreateNew from './CreateNew';
import View from './View';

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = cb => {};

  const signout = cb => {};

  return {
    user,
    signin,
    signout,
  };
}

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function App() {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/">
              <Login />
            </Route>
            <Route path="/CreateNew">
              <CreateNew />
            </Route>
            <PrivateRoute path="/View">
              <View />
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </div>
    </authContext.Provider>
  );
}

export default App;
