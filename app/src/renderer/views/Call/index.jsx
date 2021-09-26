import React, { useRef, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
//context
import { SocketContext } from './../../components/SocketContext';
//components
import Nav from '../../components/Nav';

const isElectron = require('is-electron');
const electron = isElectron();

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    borderRight: '2px solid #202225',
  },
  paper: {
    backgroundColor: '#36393f',
    padding: theme.spacing(0),
    margin: theme.spacing(0),
    width: '100%',
    height: '100%',
  },
  page: {
    borderRight: '1px solid #202225',
    display: 'flex',
    backgroundColor: '#000',
    height: electron ? 'calc(100% - 92px)' : 'calc(100% - 64px)',
    width: 'calc(100% - 300px)',
    position: 'fixed',
    bottom: 0,
    right: 0,
  },
  card: {
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    //minWidth: 275,
    padding: '0px',
    margin: '10px',
    borderRadius: 8,
  },
  video: {
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: '100%',
    height: 'auto',
    '@media (max-width:960px)': {},
    '@media (max-height:810px)': {
      maxHeight: 'auto',
    },
    padding: theme.spacing(0),
    margin: theme.spacing(0),
  },
  single: {
    display: 'flex',
    padding: theme.spacing(0),
    paddingLeft: '20px',
    paddingRight: '20px',
    margin: theme.spacing(0),
    height: '100%',
    width: '100%',
    overflowY: 'hidden',
    overflowX: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Call = () => {
  const classes = useStyles();
  const { stream, stream2 } = useContext(SocketContext);

  const video = useRef();
  const video2 = useRef();

  useEffect(() => {
    if (stream) {
      if (video.current) {
        video.current.srcObject = stream;
      }
    }
  }, [stream, video]);

  useEffect(() => {
    if (stream2) {
      if (video2.current) {
        video2.current.srcObject = stream2;
      }
    }
  }, [stream2, video2]);

  return (
    <Paper className={classes.paper}>
      <Nav />
      <Box className={classes.page}>
        <div className={classes.single}>
          <Grid container spacing={0}>
            <Grid item md={6}>
              <Card className={classes.card}>
                <CardMedia
                  component="video"
                  muted="muted"
                  className={classes.video}
                  ref={video}
                  autoPlay
                />
              </Card>
            </Grid>
            <Grid item md={6}>
              <Card className={classes.card}>
                <CardMedia
                  component="video"
                  className={classes.video}
                  ref={video2}
                  autoPlay
                />
              </Card>
            </Grid>
          </Grid>
        </div>
      </Box>
    </Paper>
  );
};

export default Call;
