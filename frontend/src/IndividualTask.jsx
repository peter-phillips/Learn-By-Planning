import React from 'react';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './IndividualTask.module.css';

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
  },
}));

const toLocalDate = (unformatedDate) => {
  // eslint-disable-next-line radix
  const a = new Date(unformatedDate);
  let hour = a.getHours();
  let min = a.getMinutes();
  const ampm = hour >= 12 ? 'pm' : 'am';
  hour %= 12;
  hour = hour || 12;
  min = min < 10 ? `0${min}` : min;
  const strTime = `${hour}:${min} ${ampm}`;
  const time = `${strTime}`;
  return time;
};

function IndividualTask(props) {
  const { task, deleteTask } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={styles.ListTasks}>
      <Card
        style={{
          minHeight: 30,
          width: '99%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 5,
          backgroundColor: task.color.hex,
        }}
        // className={clsx(classes.expand, {
        //   [classes.expandOpen]: expanded,
        // })}
        // onClick={handleExpandClick}
      >
        {task.name}
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
          <IconButton
            onClick={() => deleteTask(task.taskId)}
            aria-label="delete task"
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Collapse
        style={{
          backgroundColor: '#fff',
          display: 'flex',
          justify: 'center',
          minHeight: 30,
          width: '99%',
        }}
        in={expanded}
        timeout="auto"
        unmountOnExit
      >
        <div style={{ alignSelf: 'center', padding: 10 }}>
          <Typography paragraph>
            Class:
            {' '}
            {task.class}
          </Typography>
          <Typography paragraph>
            Time Due:
            {' '}
            {toLocalDate(task.dueDate)}
          </Typography>
          <Typography paragraph>
            Description:
            {' '}
            {task.desc}
          </Typography>
        </div>
      </Collapse>
    </div>
  );
}

export default IndividualTask;
