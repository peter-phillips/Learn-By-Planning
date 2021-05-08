import React, { useState } from 'react';
import styles from './Form.module.css';

function Form(props) {
  const [user, setUser] = useState(
    {
      name: '',
      pass: '',
    },
  );

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === 'pass') setUser({ name: user.name, pass: value });
    else setUser({ name: value, pass: user.pass });
  }

  function submitForm() {
    props.handleSubmit(user);
    setUser({ name: '', pass: '' });
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
          name="name"
          id="name"
          value={user.name}
          onChange={handleChange}
          placeholder="E-Mail"
          onKeyDown={handleKeyDown}
        />
      </div>
      <div>
        <input
          className={styles.userInput}
          type="text"
          name="pass"
          id="pass"
          value={user.pass}
          onChange={handleChange}
          placeholder="Password"
          onKeyDown={handleKeyDown}
        />
      </div>
    </form>
  );
}
export default Form;
