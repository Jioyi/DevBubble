import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
//icons
import CloseIcon from '@material-ui/icons/Close';
import MinimizeIcon from '@material-ui/icons/Minimize';
import WebAssetIcon from '@material-ui/icons/WebAsset';
//actions
import { minimize, maximize, close } from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    verticalAlign: 'middle',
    display: 'flex',
    flexGrow: 1,
    backgroundColor: '#202225',
    width: '100%',
    padding: theme.spacing(0),
    margin: theme.spacing(0),
  },
  max: {
    flexGrow: 1,
    '-webkit-app-region': 'drag',
  },
  button: {
    cursor: 'pointer',
    verticalAlign: 'middle',
    padding: '4px',
    margin: theme.spacing(0),
    backgroundColor: '#202225',
    '&:hover': {
      backgroundColor: '#282b2e',
    },
  },
  buttonCancel: {
    cursor: 'pointer',
    verticalAlign: 'middle',
    padding: '4px',
    margin: theme.spacing(0),
    backgroundColor: '#202225',
    '&:hover': {
      backgroundColor: '#ed4245',
    },
  },
  icon: {
    verticalAlign: 'middle',
    margin: theme.spacing(0),
    padding: theme.spacing(0),
    height: '18px',
    width: '18px',
    color: '#747f8d',
    '&:hover': {
      color: '#ffffff',
    },
  },
  tittle: {
    '-webkit-app-region': 'drag',
    paddingLeft: '6px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    verticalAlign: 'middle',
    textAlign: 'center',
    fontSize: '0.8rem',
    color: '#747f8d',
    fontWeight: 'bold',
  },
}));

const WindowControls = () => {
  const { TITTLE } = process.env;
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleOnMinimize = () => {
    dispatch(minimize());
  };

  const handleOnMaximize = () => {
    dispatch(maximize());
  };
  const handleOnClose = () => {
    dispatch(close());
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.tittle}>{TITTLE}</Typography>
      <div id="drag-region" className={classes.max}></div>
      <div onClick={handleOnMinimize} className={classes.button}>
        <MinimizeIcon className={classes.icon} />
      </div>
      <div onClick={handleOnMaximize} className={classes.button}>
        <WebAssetIcon className={classes.icon} />
      </div>
      <div onClick={handleOnClose} className={classes.buttonCancel}>
        <CloseIcon className={classes.icon} />
      </div>
    </div>
  );
};

export default WindowControls;
