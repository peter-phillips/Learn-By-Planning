import React, { useState } from 'react';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import styles from './CreateForm.module.css';

function TaskForm(props) {
  const [dueDate, changeDue] = useState(new Date());
  // const [targetDate, changeTarget] = newState(new Date());
  // const [remindDate, changeRemind] = newState(new Date());
  const [task, setTask] = useState(
    {
      name: '',
      desc: '',
      class: '',
      dueDate: Date(),
      targetDate: Date(),
      remind: false,
      remindDate: Date(),
    },
  );

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === 'name') setTask({ name: value });
    else if (name === 'desc') setTask({ desc: value });
    else if (name === 'class') setTask({ class: value });
  }

  function submitForm() {
    props.handleSubmit(task);
    setTask({
      name: '',
      desc: '',
      class: '',
      dueDate: Date(),
      targetDate: Date(),
      remind: false,
      remindDate: Date(),
    });
  }

  return (
    <form>
      <div>
        <input
          className={styles.userInput}
          type="text"
          name="name"
          id="name"
          value={task.name}
          onChange={handleChange}
          placeholder="Enter task name"
        />
      </div>
      <div>
        <input
          className={styles.userInput}
          type="text"
          name="desc"
          id="password"
          value={task.desc}
          onChange={handleChange}
          placeholder="Enter task description"
        />
      </div>
      <div>
        <input
          className={styles.userInput}
          type="text"
          name="class"
          id="class"
          value={task.class}
          onChange={handleChange}
          placeholder="Enter Class (Department-Number)"
        />
      </div>
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            value={dueDate}
            onChange={changeDue}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div className={styles.button}>
        <input
          className={styles.submitNew}
          type="button"
          value="Create Task"
          onClick={submitForm}
        />
      </div>
    </form>
  );
}
export default TaskForm;
