/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import CreateForm from './CreateForm';
import styles from './Login.module.css';

function CreateNew() {
  const [user, setUser] = useState([]);
  const history = useHistory();

  // eslint-disable-next-line no-shadow
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

  // eslint-disable-next-line no-shadow
  function createUser(user) {
    makePostCall(user).then((result) => {
      if (result) {
        history.push('/');
      }
    });
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <h1 className={styles.name}>New Account</h1>
        <CreateForm handleSubmit={createUser} />
      </div>
      <div className={styles.title}>
        <text className={styles.lb}>LEARN BY</text>
        <text className={styles.plan}> PLANNING</text>
      </div>
    </div>

  );
}

export default CreateNew;
