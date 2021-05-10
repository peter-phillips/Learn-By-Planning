import React, { useState } from 'react';
import styles from './Form.module.css';

function Form(props) {
  const [user, setUser] = useState(
    {
      email: '',
      password: '',
    },
  );

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === 'password') setUser({ email: user.email, password: value });
    else setUser({ email: value, password: user.password });
  }

  function submitForm() {
    props.handleSubmit(user);
    setUser({ email: '', password: '' });
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      submitForm();
    }
  }

  return (
    <form>
      <div>
        <input
          className={styles.userInput}
          type="text"
          name="email"
          id="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Enter E-Mail"
          onKeyDown={handleKeyDown}
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
          onKeyDown={handleKeyDown}
        />
      </div>
    </form>
  );
}
export default Form;