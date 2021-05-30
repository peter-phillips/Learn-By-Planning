import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Taskform from './TaskForm';
import ClassForm from './ClassForm';
import styles from './Today.module.css';
import useDidMountEffect from './useDidMountEffect';
import Notification from './Notification'

function Today() {
  const [open, setOpen] = useState(false);
  const [notiftimer, settimer] = useState(false);
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };
  const [taskOpen, settaskOpen] = useState(false);
  const handleTaskOpen = () => { settaskOpen(!taskOpen); };

  const [classOpen, setclassOpen] = useState(false);
  const handleClassOpen = () => { setclassOpen(!classOpen); };

  const [userClasses, setClasses] = useState([]);

  async function fetchAllClasses() {
    try {
      const response = await axios.get('http://localhost:5000/Class');
      console.log(response.data.classes);
      return response.data.classes;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const useStyles = makeStyles({
    task: {
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
    class: {
      fontSize: 12,
      color: 'white',
      backgroundColor: '#BD8B13',
      height: 70,
      width: 100,
      opacity: 0.6,
      '&:hover': {
        backgroundColor: '#BD8B13',
        opacity: 1,
      },
    },
  });

  useEffect(() => {
    fetchAllClasses().then((result) => {
      if (result) {
        setClasses(result);
        console.log(userClasses);
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
        <Button className={classes.task} onClick={handleTaskOpen}>
          +
        </Button>
        <Taskform userClasses={userClasses} open={taskOpen} handleClickOpen={handleTaskOpen} />
        <Button className={classes.class} onClick={handleClassOpen}>
          Add A Class
        </Button>
        <ClassForm open={classOpen} handleClickOpen={handleClassOpen} />
      </div>
    </body>
  );
}

export default Today;
