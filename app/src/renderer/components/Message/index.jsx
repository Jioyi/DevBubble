import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
//utisl
import { calculateDate } from './../../utils';
import ParserHtmlToComponents from '../../utils/ParserHtmlToComponents';

const { SERVER_API_URL } = process.env;

const useStyles = makeStyles(() => ({
  chatBox: {
    display: 'flex',
    margin: '0px',
    padding: '5px',
  },
  chatBoxMention: {
    display: 'flex',
    margin: '0px',
    padding: '5px',
    backgroundColor: '#49443c',
    borderLeft: '3px solid #faa81a',
  },
  chatBoxAvatar: {
    display: 'flex',
    height: '40px',
    width: '40px',
    marginLeft: '15px',
    marginRight: '15px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  chatBoxUsername: {
    display: 'flex',
  },
  chatBoxTypoUsername: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    paddingRight: '6px',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
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

const Message = ({ message, user, handleOpenUserProfile, reference }) => {
  const classes = useStyles();
  const avatarRef = useRef();
  const usernameRef = useRef();
  const isMention = message.content.includes(`@@@__${user.ID}^^^__`)
    ? true
    : false;
  return (
    <Box
      ref={reference}
      className={clsx(classes.chatBox, {
        [classes.chatBoxMention]: isMention,
      })}
    >
      <Avatar
        ref={avatarRef}
        onClick={() => {
          handleOpenUserProfile(avatarRef.current, message.user.ID);
        }}
        className={classes.chatBoxAvatar}
        alt="user-picture"
        src={`${SERVER_API_URL}/avatars/${message.user.avatar}`}
      />
      <Box>
        <Box className={classes.chatBoxUsername}>
          <Typography
            ref={usernameRef}
            onClick={() => {
              handleOpenUserProfile(usernameRef.current, message.user.ID);
            }}
            className={classes.chatBoxTypoUsername}
          >
            {message.user.username}
          </Typography>
          <Typography className={classes.chatBoxTypoDate}>
            {calculateDate(message.createdAt)}
          </Typography>
        </Box>
        <ParserHtmlToComponents
          user={user}
          htmlValue={message.content}
          handleOpen={handleOpenUserProfile}
        />
      </Box>
    </Box>
  );
};

export default Message;
