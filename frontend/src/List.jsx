/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import TaskHolder from './TaskHolder';

const useStyles = makeStyles({
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

  async function fetchAll() {
    try {
      const response = await axios.get('http://localhost:5000/List');
      return response.data.tasks;
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

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) {
        setTasks(cleanList(result));
      }
    });
  }, []);
  return (
    <Grid container classes={{ container: classes.container }}>
      {renderTaskHolders()}
    </Grid>
  );
}

export default List;
