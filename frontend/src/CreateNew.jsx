import React, { useState, useAlert } from 'react';
import axios from 'axios';
import CreateForm from './CreateForm';
import styles from './Login.module.css';

function CreateNew() {
  const alert = useAlert();
  const [user, setUser] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  async function makePostCall(user) {
    try {
      const response = await axios.post('http://localhost:5000/signup', user);
      if (response.status === 201) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function createUser(user) {
    makePostCall(user).then((result) => {
      if (result) {
        alert.show('Account Creation Successful');
        return true; // Reroute to Login
      }
      setErrorMessage('E-mail is already taken.');
    });
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <h1 className={styles.name}>New Account</h1>
        <CreateForm handleSubmit={createUser} />
        {errorMessage && <div className={styles.error}> {errorMessage} </div>}
      </div>
      <div className={styles.title}>
        <text className={styles.lb}>LEARN BY</text>
        <text className={styles.plan}> PLANNING</text>
      </div>
    </div>

  );
}

export default CreateNew;
