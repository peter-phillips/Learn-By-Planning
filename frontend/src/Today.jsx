/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import styles from './Today.module.css';

function Today() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  async function makePostCall(task) {
    try {
      const response = await axios.post('http://localhost:5000/Today', task);
      console.log('posting -------');
      if (response.status === 201) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function createTask(task) {
    console.log('kjhdglsafjkol;gsafd');
    makePostCall(task).then((result) => {
      if (result) {
        // Update page with new task
      }
    });
  }
  return (
    <body className={styles.todayBody}>
      <div>
        <Button onClick={handleClickOpen}>
          +
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Task</DialogTitle>
          <DialogContent>
            <form id="task-form" action="http://localhost:5000/Today" method="POST">
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label="Enter Task Title"
                type="text"
                fullWidth
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  name="dueDate"
                  label="Choose Due Date"
                  format="MM-dd-yyyy hh:mm aa"
                />
                <DateTimePicker
                  name="targetDate"
                  label="Choose Target Date"
                  format="MM-dd-yyyy hh:mm aa"
                />
                <DateTimePicker
                  name="remindDate"
                  label="Choose Remind Date"
                  format="MM-dd-yyyy hh:mm aa"
                />
              </MuiPickersUtilsProvider>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={createTask} color="primary" form="task-form" type="submit">
              Create New Task
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </body>
  );
}

export default Today;
