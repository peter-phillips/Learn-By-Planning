import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import IndividualTask from './IndividualTask';

function TaskHolder(props) {
  const {
    Key, tasks, deleteTask, isItToday,
  } = props;

  const toLocalDate = (unformatedDate) => {
    // eslint-disable-next-line radix
    const a = new Date(unformatedDate);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const day = days[a.getDay()];
    const date = a.getDate();
    // let hour = a.getHours();
    // let min = a.getMinutes();
    // const ampm = hour >= 12 ? 'pm' : 'am';
    // hour %= 12;
    // hour = hour || 12;
    // min = min < 10 ? `0${min}` : min;
    // const strTime = `${hour}:${min} ${ampm}`;
    const time = `${day}, ${month} ${date}, ${year}`;
    return time;
  };

  function renderTasks() {
    if (tasks == null || tasks.length === 0) {
      return <p>Nothing due today!</p>;
    }
    return tasks.map((task) => (
      <IndividualTask
        Key={Key}
        task={task}
        deleteTask={deleteTask}
      />
    ));
  }

  return (
    <Grid
      container
      direction="column"
      style={{
        minHeight: 325, backgroundColor: '#FBF8EC', display: 'flex', alignItems: 'center', marginBottom: 10,
      }}
    >
      <Card style={{
        minHeight: 50, backgroundColor: '#154734', color: 'white', fontSize: 28, display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 5, marginTop: 10, width: '99%',
      }}
      >
        {isItToday ? 'Due Today' : toLocalDate(tasks[0].dueDate)}
      </Card>
      {renderTasks()}
    </Grid>
  );
}

export default TaskHolder;
