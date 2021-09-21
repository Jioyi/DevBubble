import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

//actions
const useStyles = makeStyles(() => ({
  dialog: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  tittle: {
    color: '#000000',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0px',
  },
  text: {
    padding: '5px',
    color: '#848990',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const DialogStyle = withStyles({
  paper: {
    backgroundColor: '#ffffff',
    color: '#000000',
  },
})(Dialog);

const DialogAlert = ({ title, message, open, setOpen }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  useEffect(() => {
    if (open) {
      setTimeout(handleClose, 2000);
    }
  }, [open]);

  return (
    <DialogStyle
      open={open}
      onClose={handleClose}
      aria-labelledby={'global-alert'}
      BackdropProps={{
        classes: {
          root: classes.dialog,
        },
      }}
    >
      <DialogTitle id={'global-alert'} className={classes.dialog}>
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography className={classes.text}>{message}</Typography>
      </DialogContent>
    </DialogStyle>
  );
};

export default DialogAlert;
