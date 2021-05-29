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

function TaskForm(props) {
  const { open, handleClickOpen } = props;
  const [task, setTask] = useState({
    name: '',
    desc: '',
    dueDate: null,
    targetDate: null,
    remindDate: null,
  });
  const [dueDate, setDueDate] = useState(null);
  const [targetDate, setTargetDate] = useState(null);
  const [remindDate, setRemindDate] = useState(null);
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
  // const handleNameChange = (newname) => { setTask({ name: newname.target.value }); };
  //  const handleDescChange = (newdesc) => { setTask({ desc: newdesc.target.value }); };

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
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function createTask() {
    console.log(task);
    makePostCall(task).then((result) => {
      if (result) {
        // something later
      }
    });
  }
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <div>
      <Dialog className={classes.root} open={open} onClose={handleClickOpen} aria-labelledby="form-dialog-title">
        <DialogTitle className={classes.title} id="form-dialog-title">
          <text className={classes.adda}>ADD A</text>
          <text className={classes.task}> TASK</text>
        </DialogTitle>
        <DialogContent>
          <form className={classes.dates} id="task-form" onSubmit={createTask}>
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
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              Choose Classs
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>CPE-316</MenuItem>
              <MenuItem onClick={handleClose}>STAT-350</MenuItem>
              <MenuItem onClick={handleClose}>CPE-307</MenuItem>
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
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickOpen} className={classes.otherButtons}>
            Cancel
          </Button>
          <Button className={classes.otherButtons} form="task-form" type="submit">
            Create New Task
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TaskForm;
