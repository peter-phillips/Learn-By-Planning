import { createContext } from 'react';

const authContext = createContext({
  authenticated: false,
  setAuth: () => {},
});

export default authContext;
