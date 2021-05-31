import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Taskform from './TaskForm';
import ClassForm from './ClassForm';
import TaskHolder from './TaskHolder';
import styles from './Today.module.css';

function Today() {
  const [taskOpen, settaskOpen] = useState(false);
  const handleTaskOpen = () => { settaskOpen(!taskOpen); };

  const [classOpen, setclassOpen] = useState(false);
  const handleClassOpen = () => { setclassOpen(!classOpen); };

  const [userClasses, setClasses] = useState([]);

  const [tasks, setTasks] = useState([]);

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

  function renderTaskHolders() {
    const comps = [];
    // eslint-disable-next-line no-unused-vars
    tasks.forEach((value, key) => comps.push(<TaskHolder Key={key} tasks={value} />));
    return comps;
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
        <Grid container classes={{ container: classes.container }}>
          {renderTaskHolders()}
        </Grid>
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
