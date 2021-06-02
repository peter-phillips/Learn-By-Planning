/* eslint-disable no-trailing-spaces */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function Notification(props) {
  const { notifMessages, notifSetOpen, notifOpen } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Collapse in={notifOpen}>
        <Alert
          variant="filled"
          severity="info"
          action={(
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                notifSetOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          )}
        >
          Reminder for 
          {' '}
          {notifMessages}
        </Alert>
      </Collapse>
    </div>
  );
}
export default Notification;
