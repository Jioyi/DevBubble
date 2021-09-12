import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Nav from '../../components/Nav';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
//components
import CustomEditorText from 'renderer/components/CustomEditorText';
//icons
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';

const isElectron = require('is-electron');
const electron = isElectron();

const TextTooltip = withStyles({
  tooltip: {
    backgroundColor: '#18191c',
    color: '#fff',
  },
})(Tooltip);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    
    backgroundColor: '#36393f',
    padding: theme.spacing(0),
    margin: theme.spacing(0),
    width: '100%',
    height: '100%',
  },
  page: {
    display: 'flex',
    backgroundColor: '#36393f',
    height: electron ? 'calc(100% - 92px)' : 'calc(100% - 64px)',
    width: 'calc(100% - 300px)',
    position: 'fixed',
    paddingTop: 64,
    bottom: 0,
    right: 0,
    marginBottom: '58px',
  },
  end: {
    display: 'flex',
    position: 'fixed',
    alignItems: 'top',
    verticalAlign: 'middle',
    justifyContent: 'center',
    width: `calc((100%) - 300px)`,
    right: 0,
    bottom: 0,
    padding: '10px',
  },
  endAdd: {
    borderRadius: '10px 0px 0px 10px',
    backgroundColor: '#40444b',
    display: 'flex',
    padding: '10px',
  },
  endSend: {
    borderRadius: '0px 10px 10px 0px',
    backgroundColor: '#40444b',
    display: 'flex',
    padding: '10px',
  },
  endEditor: { flexGrow: 1, display: 'flex' },
  addIcon: {
    margin: '2px',
    padding: '4px',
  },
  sendIcon: {
    margin: '2px',
    padding: '2px',
    color: '#40444b',
    height: '20px',
    width: '20px',
  },
  iconButton: {
    height: '20px',
    width: '20px',
    padding: theme.spacing(0),
    margin: '0px',
    backgroundColor: '#b9bbbe',
    '&:hover': {
      backgroundColor: '#dcddde',
    },
  },
  single: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      height: '0.4em',
      boxShadow: 'inset 0 0 5px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.04)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.4)',
      outline: '0px solid slategrey',
    },
    '&::-webkit-scrollbar-track-piece:end': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-track-piece:start': {
      background: 'transparent',
    },
  },
}));

const DirectMessage = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Nav />
      <Box className={classes.page}>
        <Box
          className={classes.single}
          style={{ maxHeight: '100vh', overflow: 'auto' }}
        >
          <div>aaa</div>
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
          <div>sss</div>
          <div>kkkk</div>
        </Box>
      </Box>
      <div className={classes.end}>
        <div className={classes.endAdd}>
          <TextTooltip title="Adjuntar archivo" placement="top">
            <IconButton color="inherit" className={classes.iconButton}>
              <AddIcon className={classes.addIcon} />
            </IconButton>
          </TextTooltip>
        </div>
        <CustomEditorText />
        <div className={classes.endSend}>
          <TextTooltip title="Enviar mensaje" placement="top">
            <IconButton color="inherit" className={classes.iconButton}>
              <SendIcon className={classes.sendIcon} />
            </IconButton>
          </TextTooltip>
        </div>
      </div>
    </Paper>
  );
};

export default DirectMessage;
