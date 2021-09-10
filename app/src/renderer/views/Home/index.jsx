import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Nav from '../../components/Nav';
import Box from '@material-ui/core/Box';
//import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  offset: theme.mixins.toolbar,
  paper: {
    backgroundColor: '#fff',
    padding: theme.spacing(0),
    margin: theme.spacing(0),
    width: '100%',
    height: 'calc(100% - 28px)',
  },
  page: {
    //flexGrow: 1,
    display: 'flex',
    backgroundColor: '#36393f',
    //marginLeft: '300px !important',
    overflowY: 'scroll',
    height: 'calc(100% - 78px)',
    width: 'calc(100% - 298px)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    flexDirection: 'column',
    float: 'right',
	overflowX: 'hidden',
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <div className={classes.offset}></div>
      <Nav />
      <Box overflow="auto" id="scroll" bgcolor="white" className={classes.page}>
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
        <div>ssss</div>
        <div>ssss</div>
      </Box>
    </Paper>
  );
};

export default Home;
