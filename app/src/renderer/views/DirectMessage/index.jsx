import React, { useEffect, useState, useRef, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
//icons
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
//components
import Nav from '../../components/Nav';
import InputMentions from './../../components/InputMentions';
import Message from './../../components/Message';
import UserProfilePopover from './../../components/UserProfilePopover';
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
import Loading from 'renderer/components/Loading';
//hooks
import useFetch from '../../components/hooks/useFetch';
import useValue from './../../components/hooks/useValue';
import { AuthContext } from 'renderer/contexts/AuthContext';

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
  const { user } = useContext(AuthContext);

  const { loading, error, firstElementRef } = useFetch({
    limit: 20,
    ID: ID,
    serverPath: `/directMessage/find/`,
    data: messages,
    setData: setMessages,
    cleanData: clearMessages,
  });

  const [messagesOrdered, setMessagesOrdered] = useState([]);
  const lastElementRef = useRef();

  const [editable, setEditable] = useState('');
  const [value, onChange, onAdd] = useValue('');

  const handleOnSubmitMessage = () => {
    if (value.trim().length !== 0) {
      const data = { ID: ID, message: value };
      dispatch(sendMessage(data));
      onChange('');
    }
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

  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenUserProfile = (spanRef, userID) => {
    dispatch(getUserInfo(userID));
    setAnchorEl(spanRef);
  };
  const handleCloseUserProfile = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    return () => {
      setEditable('');
      setMessagesOrdered([]);
    };
  }, [ID]);

  const filterForInputSearch = (message) => {
    return (
      message.content.toLowerCase().indexOf(inputSearch.toLowerCase()) > -1
    );
  };

  const addEditable = (message) => {
    if (message.ID === editable) {
      return { ...message, isEditMode: true };
    }
    return { ...message, isEditMode: false };
  };

  useEffect(() => {
    const messageAux = messages.map(addEditable).sort(sortDate);
    if (inputSearch !== '') {
      setMessagesOrdered(messageAux.filter(filterForInputSearch));
    } else {
      setMessagesOrdered(messageAux);
    }
  }, [messages, inputSearch, editable]);

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
                editable={editable}
                setEditable={setEditable}
              />
            );
          })}
          {loading && (
            <Box className={classes.chatBox}>
              <Loading size={25} />
            </Box>
          )}
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
          value={value}
          onChange={onChange}
          onAdd={onAdd}
          handleKeyDown={handleKeyDown}
          placeholder={'Enviar mensaje!'}
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
