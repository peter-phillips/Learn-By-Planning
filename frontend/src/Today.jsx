import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Taskform from './TaskForm';
import ClassForm from './ClassForm';
// import TaskHolder from './TaskHolder';
import TaskTable from './TaskTable';
import styles from './Today.module.css';

function Today() {
  const [taskOpen, settaskOpen] = useState(false);
  const handleTaskOpen = () => { settaskOpen(!taskOpen); };

  const [classOpen, setclassOpen] = useState(false);
  const handleClassOpen = () => { setclassOpen(!classOpen); };

  const [userClasses, setClasses] = useState([]);

  const [tasks, setTasks] = useState([]);

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

  const classes = useStyles();
  return (
    <body className={styles.todayBody}>
      <div>
        <h1 className={styles.title}>{todayDate}</h1>
        <TaskTable tasks={tasks} />
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
