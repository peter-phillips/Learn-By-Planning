import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import IndividualTask from './IndividualTask';

function TaskHolder(props) {
  const { tasks } = props;

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
        {toLocalDate(tasks[0].dueDate)}
      </Card>
      {tasks.map((task) => <IndividualTask task={task} />)}
    </Grid>
  );
}

export default TaskHolder;
