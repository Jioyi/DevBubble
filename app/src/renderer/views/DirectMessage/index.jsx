import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Nav from '../../components/Nav';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
//icons
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
//components
import InputMentions from './../../components/InputMentions';
import Message from './../../components/Message';
import UserProfilePopover from './../../components/UserProfilePopover';
import useScroll from './../../components/useScroll';
import TextTooltip from './../../components/TextTooltip';
//actions
import {
  sendMessage,
  clearMessages,
  setMessages,
  getUserInfo,
} from './../../redux/actions';
//utils
import { sortDate } from './../../utils';

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
    backgroundColor: '#36393f',
    height: electron ? 'calc(100% - 86px)' : 'calc(100% - 58px)',
    width: 'calc(100% - 300px)',
    position: 'fixed',
    paddingTop: 64,
    bottom: 0,
    right: 0,
    marginBottom: '58px',
  },
  end: {
    borderRight: '1px solid #202225',
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
    display: 'flex',
    flexDirection: 'column-reverse',
    height: '100%',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    ScreenOrientation: 'end',
    '&::-webkit-scrollbar': {
      width: '0.6em',
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
  const { ID } = useParams();
  const dispatch = useDispatch();

  const { messages, inputSearch } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);

  const { loading, error, firstElementRef } = useScroll({
    limit: 20,
    ID: ID,
    serverPath: `/directMessage/find/${ID}`,
    data: messages,
    setData: setMessages,
    cleanData: clearMessages,
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [messagesOrdered, setMessagesOrdered] = useState([]);
  const lastElementRef = useRef();
  const [inputValue, setInputValue] = useState('');

  const handleOnSubmitMessage = () => {
    if (inputValue !== '') {
      const data = { ID: ID, message: inputValue };
      dispatch(sendMessage(data));
      setInputValue('');
    }
  };

  const onChange = (e, newValue) => {
    setInputValue(newValue);
  };

  const handleKeyDown = (e) => {
    if (e.shiftKey && e.keyCode === 13) {
      return;
    }
    if (e.which == 13) {
      e.preventDefault();
      handleOnSubmitMessage();
    }
  };

  const handleOpenUserProfile = (spanRef, userID) => {
    dispatch(getUserInfo(userID));
    setAnchorEl(spanRef);
  };

  const handleCloseUserProfile = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    return () => {
      setMessagesOrdered([]);
    };
  }, [ID]);

  useEffect(() => {
    if (inputSearch !== '') {
      setMessagesOrdered(
        messages
          .filter(
            (message) =>
              message.content.toLowerCase().indexOf(inputSearch.toLowerCase()) >
              -1
          )
          .sort(sortDate)
      );
    } else {
      setMessagesOrdered(messages.sort(sortDate));
    }
    return () => {
      setMessagesOrdered([]);
    };
  }, [messages, inputSearch]);

  return (
    <Paper className={classes.paper}>
      <Nav />
      <Box className={classes.page}>
        <UserProfilePopover
          id="show-user-profile"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleCloseUserProfile}
        />
        <div className={classes.single}>
          {<Box ref={lastElementRef} className={classes.chatBox}></Box>}
          {messagesOrdered?.map((message, key) => {
            return (
              <Message
                key={key}
                reference={
                  key === messagesOrdered.length - 1 ? firstElementRef : null
                }
                message={message}
                user={user}
                handleOpenUserProfile={handleOpenUserProfile}
              />
            );
          })}
          {loading && <Box className={classes.chatBox}>Cargando..</Box>}
          {error && <Box className={classes.chatBox}>Error</Box>}
        </div>
      </Box>
      <div className={classes.end}>
        <div className={classes.endAdd}>
          <TextTooltip title="Adjuntar archivo" placement="top">
            <IconButton color="inherit" className={classes.iconButton}>
              <AddIcon className={classes.addIcon} />
            </IconButton>
          </TextTooltip>
        </div>
        <InputMentions
          value={inputValue}
          onChange={onChange}
          handleKeyDown={handleKeyDown}
        />
        <div className={classes.endSend}>
          <TextTooltip title="Enviar mensaje" placement="top">
            <IconButton
              onClick={handleOnSubmitMessage}
              color="inherit"
              className={classes.iconButton}
            >
              <SendIcon className={classes.sendIcon} />
            </IconButton>
          </TextTooltip>
        </div>
      </div>
    </Paper>
  );
};

export default DirectMessage;
