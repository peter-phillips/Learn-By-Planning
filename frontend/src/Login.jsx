/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { Link, Switch } from 'react-router-dom';
import axios from 'axios';
import Form from './Form';
import authContext from './authContext';
import styles from './Login.module.css';

function Login() {
  const [user, setUser] = useState([]);
  const { setAuth } = useContext(authContext);

  async function checkLogin() {
    try {
      const response = await axios.get('http://localhost:5000/login');
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makePostCall(user) {
    try {
      const response = await axios.post('http://localhost:5000/login', user);
      if (response.status === 202) {
        return true;
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
          <Form handleSubmit={authenticateUser} />
          <Switch>
            <Link to="/CreateNew"> Create New Account</Link>
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
