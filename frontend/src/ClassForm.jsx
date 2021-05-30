import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { CirclePicker } from 'react-color';

function ClassForm(props) {
  const { open, handleClickOpen } = props;
  const [cc, updatecc] = useState(null);
  const [newClass, setnewClass] = useState({
    className: '',
    classColor: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setnewClass({ ...newClass, [name]: value });
  }
  const handleColorChange = (color) => {
    updatecc(color); setnewClass({ ...newClass, classColor: color });
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

  async function makePostCall(theclass) {
    try {
      const response = await axios.post('http://localhost:5000/Class', theclass);
      if (response.status === 201) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function createClass() {
    makePostCall(newClass).then((result) => {
      if (result) {
        // Update page with new task
      }
    });
  }

  const classes = useStyles();
  return (
    <div>
      <Dialog className={classes.root} open={open} onClose={handleClickOpen} aria-labelledby="form-dialog-title">
        <DialogTitle className={classes.title} id="form-dialog-title">
          <text className={classes.adda}>ADD A</text>
          <text className={classes.task}> CLASS</text>
        </DialogTitle>
        <DialogContent>
          <form className={classes.dates} id="task-form" onSubmit={createClass}>
            <TextField
              autoFocus
              margin="dense"
              id="className"
              name="className"
              label="Enter Class Name"
              type="text"
              onChange={handleChange}
              fullWidth
            />
            <CirclePicker
              name="classColor"
              type="color"
              id="classColor"
              value={cc}
              label="Enter Class Color"
              onChange={handleColorChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickOpen} className={classes.otherButtons}>
            Cancel
          </Button>
          <Button onClick={createClass} className={classes.otherButtons} form="task-form" type="submit">
            Create New Class
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ClassForm;
