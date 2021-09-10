import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Nav from '../../components/Nav';
import Box from '@material-ui/core/Box';
//import { useSelector } from 'react-redux';
const isElectron = require('is-electron');
const electron = isElectron();

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    backgroundColor: '#fff',
    padding: theme.spacing(0),
    margin: theme.spacing(0),
    width: '100%',    
    height: '100%',  
  },
  page: {
    //flexGrow: 1,
    display: 'flex',
    backgroundColor: '#36393f',
    overflowY: 'scroll',    
    paddingTop: electron ? '262px' : '234px',
    height: electron ? 'calc(100% - 92px)' : 'calc(100% - 64px)',
    width: 'calc(100% - 300px)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    flexDirection: 'column',
    position: "fixed",
    overflowX: 'hidden',
    bottom: 0,
    right: 0,
    paddingBottom: "70px"
  },
}));

const DirectMessage = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Nav />
      <Box overflow="auto" id="scroll" bgcolor="white" className={classes.page}>
        <div>xxx</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>kkkk</div>
      </Box>
    </Paper>
  );
};

export default DirectMessage;
