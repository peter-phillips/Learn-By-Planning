import React, { useState, useAlert } from 'react';
import axios from 'axios';
import Form from './Form';
import styles from './Login.module.css';

function Login() {
  const alert = useAlert();
  const [user, setUser] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

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
        alert.show('Logged In');
        return true; // Reroute user to today view
      }
      setErrorMessage('E-mail and password combination is invalid.');
    });
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <h1 className={styles.name}>Login</h1>
        <Form handleSubmit={authenticateUser} />
        {errorMessage && <div className={styles.error}> {errorMessage} </div>}
      </div>
      <div className={styles.title}>
        <text className={styles.lb}>LEARN BY</text>
        <text className={styles.plan}> PLANNING</text>
      </div>
    </div>

  );
}

export default Login;