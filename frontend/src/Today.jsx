import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import styles from './Today.module.css';
import useDidMountEffect from './useDidMountEffect';
import Notification from './Notification'

function Today() {
  const [open, setOpen] = useState(false);
  const [notiftimer, settimer] = useState(false);
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  const [dueDate, setDueDate] = useState(null);
  const [targetDate, setTargetDate] = useState(null);
  const [remindDate, setRemindDate] = useState(null);
  const handleDueDateChange = (date) => { setDueDate(date); };
  const handleTargetDateChange = (date) => { setTargetDate(date); };
  const handleRemindDateChange = (date) => { setRemindDate(date); };

  const useStyles = makeStyles({
    root: {
      '& .MuiPaper-root': {
        backgroundColor: '#FBF8EC',
        borderRadius: 10,
        borderColor: '#BD8B13',
      },
    },
    otherButtons: {
      color: '#154734',
      fontSize: 15,
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      color: 'white',
      fontSize: 60,
    },
    adda: {
      color: '#BD8B13',
    },
    task: {
      color: '#154734',
    },
    dates: {
      display: 'flex',
      flexDirection: 'column',
    },
    button: {
      fontSize: 60,
      color: 'white',
      backgroundColor: '#BD8B13',
      height: 70,
      width: 70,
      borderRadius: '50%',
      opacity: 0.6,
      '&:hover': {
        backgroundColor: '#BD8B13',
        opacity: 1,
      },
    },
  });

  async function makePostCall(task) {
    try {
      const response = await axios.post('http://localhost:5000/Today', task);
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
    makePostCall(task).then((result) => {
      if (result) {
        // Update page with new task
      }
    });
  }
  useDidMountEffect(() => {
    // Updates group data every 10 minutes
    const timer = setTimeout(() => {
      const response = await axios.get('http://localhost:5000/Notification');
      if (response.status === 200){
        response.data.notification.map(() =>)
      }
      settimer(!notiftimer);
    }, 60000);
    return () => {
      clearTimeout(timer);
    };
  }, [notiftimer]);

  useEffect(() => {
    settimer(!notiftimer);
  }, []);

  const classes = useStyles();
  return (
    <body className={styles.todayBody}>
      <div>
        <Button className={classes.button} onClick={handleClickOpen}>
          +
        </Button>
        <Dialog className={classes.root} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle className={classes.title} id="form-dialog-title">
            <text className={classes.adda}>ADD A</text>
            <text className={classes.task}> TASK</text>
          </DialogTitle>
          <DialogContent>
            <form className={classes.dates} id="task-form" action="http://localhost:5000/Today" method="POST">
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
                  autoOK
                  name="dueDate"
                  label="Choose Due Date"
                  format="MM-dd-yyyy hh:mm aa"
                  value={dueDate}
                  onChange={handleDueDateChange}
                />
                <DateTimePicker
                  autoOK
                  name="targetDate"
                  label="Choose Target Date"
                  format="MM-dd-yyyy hh:mm aa"
                  value={targetDate}
                  onChange={handleTargetDateChange}
                />
                <DateTimePicker
                  autoOK
                  name="remindDate"
                  label="Choose Remind Date"
                  format="MM-dd-yyyy hh:mm aa"
                  value={remindDate}
                  onChange={handleRemindDateChange}
                />
              </MuiPickersUtilsProvider>
              <TextField
                autoFocus
                margin="dense"
                id="desc"
                name="desc"
                label="Enter Task Description"
                type="text"
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className={classes.otherButtons}>
              Cancel
            </Button>
            <Button onClick={createTask} className={classes.otherButtons} form="task-form" type="submit">
              Create New Task
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </body>
  );
}

export default Today;
