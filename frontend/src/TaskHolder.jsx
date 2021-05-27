import React from 'react';
import Grid from '@material-ui/core/Grid';
import IndividualTask from './IndividualTask';

function TaskHolder(props) {
  const { tasks } = props;
  return (
    <Grid
      container
      direction="column"
      style={{
        minHeight: 325, backgroundColor: 'black', display: 'flex', alignItems: 'center',
      }}
    >
      {tasks.map((task) => <IndividualTask task={task} />)}
    </Grid>
  );
}

export default TaskHolder;

// eslint-disable-next-line no-lone-blocks
{ /* <Grid className="day" item classes={{ root: classes.root }} style={{ height: 60 }}>
    <Card>Monday, May 24th 2021</Card>
</Grid>
<Grid item classes={{ item: classes.item }}>
    <text className={styles.tasks}>Task One</text>
</Grid> */ }
