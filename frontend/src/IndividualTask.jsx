import React from 'react';
import Card from '@material-ui/core/Card';

function IndividualTask(props) {
  const { task } = props;
  return (
    <Card>
      {task.name}
    </Card>
  );
}

export default IndividualTask;
