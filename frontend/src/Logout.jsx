import React, { useContext } from 'react';
import authContext from './authContext';
import styles from './Login.module.css';

function Logout() {
  const { setAuth } = useContext(authContext);
  function reLogin() {
    setAuth(0);
  }
  return (
    <div className={styles.overlay}>
      <h1>You have been logged out</h1>
      <button type="button" onClick={reLogin}>Logout</button>
    </div>
  );
}

export default Logout;
