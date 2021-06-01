/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import TaskHolder from './TaskHolder';
import Taskform from './TaskForm';
import ClassForm from './ClassForm';
import styles from './List.module.css';

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
});

function List() {
  const [tasks, setTasks] = useState([]);
  const classes = useStyles();

  const [taskOpen, settaskOpen] = useState(false);
  const handleTaskOpen = () => { settaskOpen(!taskOpen); };

  const [userClasses, setClasses] = useState([]);

  const [classOpen, setclassOpen] = useState(false);
  const handleClassOpen = () => { setclassOpen(!classOpen); };

  async function fetchAll() {
    try {
      const response = await axios.get('http://localhost:5000/List');
      return response.data;
    } catch (error) {
      // We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  async function makeDeleteCall(id) {
    try {
      const response = await axios.delete('http://localhost:5000/List', { data: { taskId: id } });
      if (response.status === 200) {
        return response;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function removeTask(taskId) {
    const updatedTaskList = new Map();
    tasks.forEach((value, date) => {
      for (const task of value) {
        if (task.taskId !== taskId) {
          if (updatedTaskList.has(date)) {
            updatedTaskList.get(date).push(task);
          } else {
            updatedTaskList.set(date, [task]);
          }
        }
      }
    });
    console.log(updatedTaskList);
    setTasks(updatedTaskList);
  }

  const deleteTask = (deletedTaskId) => {
    makeDeleteCall(deletedTaskId).then((result) => {
      if (result) {
        removeTask(deletedTaskId);
      }
    });
  };

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
    tasks.forEach((value, key) => comps.push(<TaskHolder
      Key={key}
      tasks={value}
      deleteTask={deleteTask}
    />));
    return comps;
  }

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) {
        setTasks(cleanList(result.tasks));
        setClasses(result.classes);
      }
    });
  }, []);

  return (
    <div>
      <Grid container classes={{ container: classes.container }}>
        {renderTaskHolders()}
      </Grid>
      <div className={styles.buttons}>
        <Button className={classes.task} onClick={handleTaskOpen}>
          +
        </Button>
        <Taskform
          userClasses={userClasses}
          open={taskOpen}
          handleClickOpen={handleTaskOpen}
          tasks={tasks}
          setTasks={setTasks}
        />
        <Button className={classes.class} onClick={handleClassOpen}>
          Add A Class
        </Button>
        <ClassForm
          open={classOpen}
          userClasses={userClasses}
          setClasses={setClasses}
          handleClickOpen={handleClassOpen}
        />
      </div>
    </div>
  );
}

export default List;
