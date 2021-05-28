import React from 'react';
import Card from '@material-ui/core/Card';

function IndividualTask(props) {
  const { task } = props;
  return (
    <Card style={{
      minHeight: 30, width: '99%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 5,
    }}
    >
      {task.name}
    </Card>
  );
}

export default IndividualTask;
