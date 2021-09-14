import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MentionsInput, Mention } from 'react-mentions';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Nav from '../../components/Nav';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
//icons
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
//internal files
import defaultStyle from './defaultStyle.js';
import classNames from './style.css';
import useValue from './useValue.jsx';
//actions
import {
  sendMessage,
  getMessages,
  clearMessages,
} from 'renderer/redux/actions';

const { SERVER_API_URL } = process.env;
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
    display: 'inline-block',
    alignSelf: 'flex-end',
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
  chatBox: {
    display: 'flex',
    marginBottom: '15px',
  },
  chatBoxAvatar: {
    display: 'flex',
    height: '40px',
    width: '40px',
    marginLeft: '15px',
    marginRight: '15px',
  },
  chatBoxUsername: {
    display: 'flex',
  },
  chatBoxContent: {
    display: 'flex',
    color: '#fff',
  },
  chatBoxTypoUsername: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    paddingRight: '6px',
  },
  chatBoxTypoDate: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#5f6a79',
    fontSize: '0.7rem',
    fontWeight: 'normal',
  },
}));

const DirectMessage = () => {
  const { messages } = useSelector((state) => state.message);
  const { ID } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [emojis, setEmojis] = useState([]);
  const [value, onChange, onAdd] = useValue('');
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
    const data = { ID: ID, message: value };
    onChange('');
    dispatch(sendMessage(data));
  };

  const filterContent = (content) => {
    let newContent = content;
    newContent = newContent.split('@@@__').join('<a href="/user/');
    newContent = newContent.split('^^^__').join(`">@`);
    newContent = newContent.split('@@@^^^').join('</a>');
    return newContent;
  };

  const calculateDate = (time) => {
    let date = new Date(time);
    let minutes = date.getMinutes().toString();
    minutes = minutes.length < 2 ? `0${minutes}` : minutes;
    let hours = date.getHours().toString();
    hours = hours.length < 2 ? `0${hours}` : hours;
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    let year = date.getFullYear();
    let diff = (new Date().getTime() - date.getTime()) / 1000;
    let day_diff = Math.floor(diff / 86400);
    if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return;

    if (day_diff === 0) {
      return `hoy a las ${hours}:${minutes}`;
    } else if (day_diff === 1) {
      return `ayer a las ${hours}:${minutes}`;
    } else {
      return `${day}/${month}/${year}`;
    }
  };

  useEffect(() => {
    dispatch(getMessages(ID));
    getUsers();
    getEmojis();
    return () => dispatch(clearMessages());
  }, []);

  return (
    <Paper className={classes.paper}>
      <Nav />
      <Box className={classes.page}>
        <Box className={classes.single}>
          {messages.map((message) => {
            return (
              <Box key={message.ID} className={classes.chatBox}>
                <Avatar
                  className={classes.chatBoxAvatar}
                  alt="user-picture"
                  src={`${SERVER_API_URL}/avatars/${message.user.avatar}`}
                />
                <Box>
                  <Box className={classes.chatBoxUsername}>
                    <Typography className={classes.chatBoxTypoUsername}>
                      {message.user.username}
                    </Typography>
                    <Typography className={classes.chatBoxTypoDate}>
                      {calculateDate(message.createdAt)}
                    </Typography>
                  </Box>
                  <Box
                    className={classes.chatBoxContent}
                    dangerouslySetInnerHTML={{
                      __html: filterContent(message.content),
                    }}
                  />
                </Box>
              </Box>
            );
          })}
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
        <MentionsInput
          id="my-textarea"
          value={value}
          onChange={onChange}
          style={defaultStyle}
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
