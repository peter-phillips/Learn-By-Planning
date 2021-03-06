/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Link, Switch } from 'react-router-dom';
import axios from 'axios';
import Form from './Form';
import authContext from './authContext';
import Alerts from './Alerts';
import styles from './Login.module.css';

function Login() {
  const { setAuth } = useContext(authContext);
  const [open, setOpen] = useState(false);

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: 20,
  };

  async function checkLogin() {
    try {
      const response = await axios.post('http://localhost:5000/logout');
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makePostCall(user) {
    try {
      const response = await axios.post('http://localhost:5000/login', user);
      if (response.status === 202 || response.status === 304) {
        return true;
      }
      if (response.status === 403) {
        return false;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function authenticateUser(user) {
    makePostCall(user).then((result) => {
      if (result) {
        setAuth(true);
      } else {
        setOpen(true);
      }
    });
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <body className={styles.loginBody}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.name}>Login</h1>
          <Alerts open={open} setOpen={setOpen} message="Invalid username or passowrd" />
          <Form handleSubmit={authenticateUser} />
          <Switch>
            <Link to="/CreateNew" style={linkStyle}> Create New Account</Link>
          </Switch>
        </div>
        <div className={styles.title}>
          <text className={styles.lb}>LEARN BY</text>
          <text className={styles.plan}> PLANNING</text>
        </div>
      </div>
    </body>
  );
}

export default Login;
