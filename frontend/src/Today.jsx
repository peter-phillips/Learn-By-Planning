import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Taskform from './TaskForm';
import ClassForm from './ClassForm';
import TaskHolder from './TaskHolder';
import TaskTable from './TaskTable';
import styles from './Today.module.css';
import useDidMountEffect from './useDidMountEffect';
import Notification from './Notification';

function Today() {
  const [notiftimer, settimer] = useState(false);
  const [taskOpen, settaskOpen] = useState(false);
  const handleTaskOpen = () => { settaskOpen(!taskOpen); };

  const [classOpen, setclassOpen] = useState(false);
  const handleClassOpen = () => { setclassOpen(!classOpen); };

  const [userClasses, setClasses] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notification, setNotification] = useState([]);

  const [tasks, setTasks] = useState(new Map());

  const newdate = new Date();
  const todayDate = newdate.toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  async function fetchAll() {
    try {
      const response = await axios.get('http://localhost:5000/Today');
      return response.data;
    } catch (error) {
      // We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  function cleanList(objects) {
    const cleanObjects = new Map();
    // eslint-disable-next-line no-restricted-syntax
    for (const task of objects) {
      const stringDate = JSON.stringify(task.dueDate);
      const tempDay = stringDate.split(' ');
      const date = tempDay[1] + tempDay[2] + tempDay[3];
      if (cleanObjects.has(date)) {
        cleanObjects.get(date).push(task);
      } else {
        cleanObjects.set(date, [task]);
      }
    }
    return cleanObjects;
  }

  function getTodayKey() {
    const day = new Date();
    const dayString = day.toDateString().split(' ');
    const todayKey = dayString[2] + dayString[1] + dayString[3];
    return todayKey;
  }

  const useStyles = makeStyles({
    task: {
      fontSize: 60,
      color: 'white',
      backgroundColor: '#ffbb17',
      height: 70,
      width: 70,
      borderRadius: '50%',
      '&:hover': {
        backgroundColor: '#BD8B13',
      },
    },
    class: {
      fontSize: 12,
      color: 'white',
      backgroundColor: '#ffbb17',
      height: 70,
      width: 100,
      '&:hover': {
        backgroundColor: '#BD8B13',
      },
      root: {
        display: 'flex',
        marginTop: 10,
        marginBottom: 5,
        width: '99%',
        height: 40,
        backgroundColor: 'grey',
        justifyContent: 'center',
      },
      item: {
        display: 'flex',
        marginTop: 0,
        marginBottom: 5,
        width: '99%',
        height: 40,
        backgroundColor: 'grey',
        justifyContent: 'center',
      },
      container: {
        margin: 0,
        padding: 12,
      },
    },
  });

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) {
        setTasks(cleanList(result.tasks));
        setClasses(result.classes);
      }
    });
  }, []);

  async function fetchNotifs() {
    try {
      console.log('fetch');
      const response = await axios.get('http://localhost:5000/Notification');
      console.log(response.data.notification);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  useDidMountEffect(() => {
    console.log('mount called');
    // Updates group data every 10 minutes
    const timer = setTimeout(() => {
      console.log('timer');
      fetchNotifs().then((result) => {
        if (result.status === 200) {
          console.log('200-recieved');
          setNotification(result.data.notification);
          setNotifOpen(true);
        } else if (result.status === 204) {
          console.log('204-recieved');
          setNotification([]);
        }
      });
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
        <Notification
          notifMessages={notification}
          notifSetOpen={setNotifOpen}
          notifOpen={notifOpen}
        />

        <h1 className={styles.title}>{todayDate}</h1>
        <div className={styles.mainScreen}>
          <TaskTable tasks={tasks} />
          <TaskHolder isItToday tasks={tasks.get(getTodayKey(todayDate))} />
        </div>
        <div className={styles.buttons}>
          <Button className={classes.task} onClick={handleTaskOpen}>
            +
          </Button>
          <Button className={classes.class} onClick={handleClassOpen}>
            Add A Class
          </Button>
        </div>
        <Taskform
          userClasses={userClasses}
          open={taskOpen}
          handleClickOpen={handleTaskOpen}
          tasks={tasks}
          setTasks={setTasks}
        />
        <ClassForm open={classOpen} handleClickOpen={handleClassOpen} />
      </div>
    </body>
  );
}

export default Today;
