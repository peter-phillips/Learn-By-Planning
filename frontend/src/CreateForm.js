import React, { useState } from 'react';
import styles from './CreateForm.module.css';

function CreateFrom(props) {
  const [user, setUser] = useState(
    {
      name: '',
      email: '',
      password: '',
    },
  );

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === 'password') setUser({ name: user.name, email: user.email, password: value });
    else if (name === 'name') setUser({ name: value, email: user.email, passowrd: user.password });
    else setUser({ name: user.name, email: value, password: user.password });
  }

  function submitForm() {
    props.handleSubmit(user);
    setUser({ name: '', email: '', password: '' });
  }

  return (
    <form>
      <div>
        <input
          className={styles.userInput}
          type="text"
          name="name"
          id="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Enter Name"
        />
      </div>
      <div>
        <input
          className={styles.userInput}
          type="text"
          name="email"
          id="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Enter E-Mail"
        />
      </div>
      <div>
        <input
          className={styles.userInput}
          type="text"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Enter Password"
        />
      </div>
      <div className={styles.button}>
        <input
          className={styles.submitNew}
          type="button"
          value="Create Account"
          onClick={submitForm}
        />
      </div>
    </form>
  );
}
export default CreateFrom;