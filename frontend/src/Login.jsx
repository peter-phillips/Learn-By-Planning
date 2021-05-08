import React, { useState } from 'react';
import axios from 'axios';
import Form from './Form';
import styles from './Login.module.css';

function Login() {
  const [user, setUser] = useState([]);

  async function makePostCall(user) {
    try {
      const response = await axios.post('http://localhost:5000/login', user);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function authenticateUser(user) {
    makePostCall(user).then((result) => {
      if (result) // Reroute to page here
      { return result; }
    });
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <h1 className={styles.name}>Login</h1>
        <Form handleSubmit={authenticateUser} />
      </div>
      <div className={styles.title}>
        <text className={styles.lb}>LEARN BY</text>
        <text className={styles.plan}> PLANNING</text>
      </div>
    </div>

  );
}

export default Login;
