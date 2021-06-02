/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { useState } from 'react';
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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import enLocale from 'date-fns/locale/en-US';

function TaskForm(props) {
  const {
    open, handleClickOpen, userClasses, tasks, setTasks,
  } = props;
  const [task, setTask] = useState({
    name: '',
    desc: '',
    class: 'Choose Class',
    dueDate: null,
    targetDate: null,
    remindDate: null,
  });
  const [dueDate, setDueDate] = useState(null);
  const [targetDate, setTargetDate] = useState(null);
  const [remindDate, setRemindDate] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  function handleChange(event) {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  }

  const handleDueDateChange = (date) => {
    setDueDate(date);
    setTask({ ...task, dueDate: date });
  };

  const handleTargetDateChange = (date) => {
    setTargetDate(date); setTask({ ...task, targetDate: date });
  };

  const handleRemindDateChange = (date) => {
    setRemindDate(date); setTask({ ...task, remindDate: date });
  };

  function resetDates() {
    setTargetDate(null);
    setDueDate(null);
    setRemindDate(null);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuClick = (event, value) => {
    setTask({ ...task, class: value });
    handleClose();
  };

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

  async function makePostCall(newtask) {
    try {
      const response = await axios.post('http://localhost:5000/Today', newtask);
      if (response.status === 201) {
        return response.data.task;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function addTaskList(newTask) {
    const updatedTaskList = new Map();
    tasks.forEach((value, date) => {
      for (const atask of value) {
        if (updatedTaskList.has(date)) {
          updatedTaskList.get(date).push(atask);
        } else {
          updatedTaskList.set(date, [atask]);
        }
      }
    });
    const stringDate = JSON.stringify(newTask.dueDate);
    const tempDay = stringDate.split(' ');
    const date = tempDay[1] + tempDay[2] + tempDay[3];
    if (updatedTaskList.has(date)) {
      updatedTaskList.get(date).push(newTask);
    } else {
      updatedTaskList.set(date, [newTask]);
    }
    setTasks(updatedTaskList);
  }

  function createTask() {
    makePostCall(task).then((result) => {
      if (result) {
        setTask({
          name: '',
          desc: '',
          class: 'Choose Class',
          dueDate: null,
          targetDate: null,
          remindDate: null,
        });
        resetDates();
        addTaskList(result);
        handleClickOpen();
      }
    });
  }

  const classes = useStyles();
  return (
    <div>
      <Dialog className={classes.root} open={open} onClose={handleClickOpen} aria-labelledby="form-dialog-title">
        <DialogTitle className={classes.title} id="form-dialog-title">
          <text className={classes.adda}>ADD A</text>
          <text className={classes.task}> TASK</text>
        </DialogTitle>
        <DialogContent>
          <div className={classes.dates}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Enter Task Title"
              type="text"
              onChange={handleChange}
              fullWidth
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
              <DateTimePicker
                name="dueDate"
                label="Choose Due Date"
                format="MM-dd-yyyy hh:mm aa"
                value={dueDate}
                onChange={handleDueDateChange}
              />
              <DateTimePicker
                name="targetDate"
                label="Choose Target Date"
                format="MM-dd-yyyy hh:mm aa"
                value={targetDate}
                onChange={handleTargetDateChange}
              />
              <DateTimePicker
                name="remindDate"
                label="Choose Remind Date"
                format="MM-dd-yyyy hh:mm aa"
                value={remindDate}
                onChange={handleRemindDateChange}
              />
            </MuiPickersUtilsProvider>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              {task.class}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {userClasses.map((value, index) => (
                <MenuItem
                  key={index}
                  name="class"
                  value={task.class}
                  onClick={(event) => handleMenuClick(event, value.className)}
                >
                  {value.className}
                </MenuItem>
              ))}
            </Menu>
            <TextField
              autoFocus
              margin="dense"
              id="desc"
              name="desc"
              label="Enter Task Description"
              type="text"
              fullWidth
              onChange={handleChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickOpen} className={classes.otherButtons}>
            Cancel
          </Button>
          <Button className={classes.otherButtons} onClick={createTask} type="button">
            Create New Task
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TaskForm;
