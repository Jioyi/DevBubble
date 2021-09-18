import React, { useEffect, useState, useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MentionsInput, Mention } from 'react-mentions';
import Paper from '@material-ui/core/Paper';
import Nav from '../../components/Nav';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
//icons
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
//internal files
import defaultStyle from './defaultStyle.js';
import classNames from './style.css';
//components
import Message from './../../components/Message';
//import useScroll from './../../components/useScroll';
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
import UserProfilePopover from './../../components/UserProfilePopover';

const { SERVER_API_URL } = process.env;
const isElectron = require('is-electron');
const electron = isElectron();
const store = electron ? window.localStorage : localStorage;

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
  //styles
  const classes = useStyles();

  const { ID } = useParams();
  const { messages, inputSearch } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);

  //state open UserProfilePopover
  const [anchorEl, setAnchorEl] = useState(null);

  const [users, setUsers] = useState([]);

  const [messagesOrdered, setMessagesOrdered] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [handleGetMore, setHandleGetMore] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const lastElementRef = useRef();
  const firstElementRef = useCallback(
    (node) => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setHandleGetMore((prevHandleGetMore) => prevHandleGetMore + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  //get more mesagges
  const GetData = async (DirectMessage, clean = false) => {
    try {
      const token = store.getItem('access_token');
      let cancel;
      let config = {
        method: 'POST',
        url: `${SERVER_API_URL}/directMessage/find/${DirectMessage}`,
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          offset: clean ? 0 : messages.length,
          limit: 20,
        },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      };
      const response = await axios(config);
      const responseData = response.data;
      if (clean) {
        dispatch(setMessages(responseData.items));
      } else {
        dispatch(setMessages([...messages, ...responseData.items]));
      }
      setHasMore(responseData.has_more);
      setLoading(false);
      return () => cancel();
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
      if (axios.isCancel(error)) {
        return;
      }
    }
  };

  useEffect(() => {
    GetData(ID);
  }, [handleGetMore]);

  const dispatch = useDispatch();
  const [emojis, setEmojis] = useState([]);
  const [value, setValue] = useState({
    content: '',
  });
  const onAdd = useCallback(() => {}, []);
  const neverMatchingRegex = /($a)/;

  const getUsers = async () => {
    const response = await axios.get(`${SERVER_API_URL}/user`);
    if (response?.data?.message === 'successful') {
      const usersOdered = response.data.users.map((user) => ({
        display: user.username,
        id: user.ID,
        avatar: user.avatar,
      }));
      setUsers(usersOdered);
    }
  };

  const getEmojis = async () => {
    const response = await axios.get(`${SERVER_API_URL}/emojis`);
    if (response?.data?.message === 'successful') {
      setEmojis(response.data.emojis);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const searchEmoji = (query, callback) => {
    if (query.length === 0) return;
    const matches = emojis
      .filter((emoji) => {
        return emoji.name.indexOf(query.toLowerCase()) > -1;
      })
      .slice(0, 10);
    return matches.map(({ emoji }) => ({ id: emoji }));
  };

  const handleOnSubmitMessage = () => {
    if (value.content !== '') {
      const data = { ID: ID, message: value.content };
      dispatch(sendMessage(data));
      setValue({
        content: '',
      });
    }
  };

  const onChange = (e, newValue) => {
    setValue({
      ...value,
      content: newValue,
    });
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
    GetData(ID, true);

    return () => {
      setHandleGetMore(1);
      setMessagesOrdered([]);
      dispatch(clearMessages([]));
    };
  }, [ID]);

  useEffect(() => {
    getUsers();
    getEmojis();
  }, []);

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
          {messagesOrdered &&
            messagesOrdered.map((message, key) => {
              if (key === messagesOrdered.length - 1) {
                return (
                  <Message
                    key={key}
                    refer={firstElementRef}
                    message={message}
                    user={user}
                    handleOpenUserProfile={handleOpenUserProfile}
                  />
                );
              } else {
                return (
                  <Message
                    key={key}
                    message={message}
                    user={user}
                    handleOpenUserProfile={handleOpenUserProfile}
                  />
                );
              }
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
        <MentionsInput
          spellCheck={false}
          name="content"
          value={value.content}
          onChange={onChange}
          style={defaultStyle}
          onKeyDown={handleKeyDown}
          placeholder={'Enviar mensaje!'}
          className="mentions"
          classNames={classNames}
          allowSuggestionsAboveCursor={true}
          a11ySuggestionsListLabel={'mensiones sugeridas!'}
        >
          <Mention
            suggestionsPosition={'top'}
            trigger="@"
            data={users}
            markup="@@@____id__^^^____display__@@@^^^"
            displayTransform={(userID) => {
              const userTarget = users.find((user) => user.id === userID);
              return `@${userTarget.display}`;
            }}
            onAdd={onAdd}
            className={classNames.mentions__mention}
            renderSuggestion={(
              suggestion,
              search,
              highlightedDisplay,
              index,
              focused
            ) => (
              <div className={`user ${focused ? 'focused' : ''}`}>
                {highlightedDisplay}
              </div>
            )}
          />
          <Mention
            trigger=":"
            markup="__id__"
            regex={neverMatchingRegex}
            data={searchEmoji}
          />
        </MentionsInput>
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
