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
  cell: {
    backgroundColor: '#CAC7A7', textAlign: 'center', color: '#154734', fontSize: '18px',
  },
  headerCell: {
    backgroundColor: '#154734', textAlign: 'center', color: 'white', fontSize: '33px',
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
            <TableCell style={{ backgroundColor: task.color.hex, textAlign: 'center', fontSize: '15px' }}>{task.name}</TableCell>
            <TableCell style={{ backgroundColor: task.color.hex, textAlign: 'center', fontSize: '15px' }}>
              {task.targetDate.slice(0, -13)}
            </TableCell>
            <TableCell style={{ backgroundColor: task.color.hex, textAlign: 'center', fontSize: '15px' }}>
              {task.dueDate.slice(0, -13)}
            </TableCell>
          </TableRow>,
        );
      }
    });
    return comps;
  }

  return (
    <TableContainer component={Paper} style={{ paddingTop: 8, paddingLeft: 5, paddingRight: 5 }}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{ backgroundColor: '#154734', color: 'white', fontSize: '20' }}>
          <TableRow>
            <TableCell style={{ backgroundColor: '#154734' }} />
            <TableCell className={classes.headerCell}>Do Today</TableCell>
            <TableCell style={{ backgroundColor: '#154734' }} />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className={classes.cell}>Task</TableCell>
            <TableCell className={classes.cell}>Target Date</TableCell>
            <TableCell className={classes.cell}>Due Date</TableCell>
          </TableRow>
          {renderTaskRows()}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TaskTable;
