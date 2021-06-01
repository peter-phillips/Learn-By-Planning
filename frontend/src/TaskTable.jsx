/* eslint-disable no-restricted-syntax */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function TaskTable(props) {
  const { tasks } = props;
  console.log(tasks);
  const classes = useStyles();

  function renderTaskRows() {
    const comps = [];
    // eslint-disable-next-line no-unused-vars
    tasks.forEach((value) => {
      for (const task of value) {
        comps.push(
          <TableRow key={task.name}>
            <TableCell>{task.name}</TableCell>
            <TableCell>{task.targetDate}</TableCell>
            <TableCell>{task.dueDate}</TableCell>
          </TableRow>,
        );
      }
    });
    return comps;
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Assignments</TableCell>
            <TableCell align="right">Target Date</TableCell>
            <TableCell align="right">Due Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderTaskRows()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TaskTable;
