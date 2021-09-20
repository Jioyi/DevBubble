import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

//utils
import { calculateDate } from './../../utils';
import ParserHtmlToComponents from '../../utils/ParserHtmlToComponents';
//icons
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import InsertEmoticonOutlinedIcon from '@material-ui/icons/InsertEmoticonOutlined'; //InsertEmoticonOutlined
//components
import TextTooltip from '../TextTooltip';

const { SERVER_API_URL } = process.env;

const useStyles = makeStyles((theme) => ({
  chatBox: {
    position: 'relative',
    display: 'flex',
    margin: '0px',
    padding: '5px',
    '&:hover': {
      backgroundColor: '#32353b',
    },
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
  chatBoxMenuEdit: {
    zIndex: 1,
    backgroundColor: '#36393f',
    boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    position: 'absolute',
    right: 10,
    top: -10,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  Icon: {
    margin: '4px',
    padding: '0px',
    color: '#b9bbbe',
    '&:hover': {
      color: '#fff',
    },
  },
  iconButton: {
    borderRadius: 8,
    padding: theme.spacing(0),
    margin: theme.spacing(0),
    '&:hover': {
      backgroundColor: '#292b2f',
    },
  },
}));

const Message = ({ message, user, handleOpenUserProfile, reference }) => {
  const classes = useStyles();
  const avatarRef = useRef();
  const usernameRef = useRef();
  const [openMenuEdit, setOpenMenuEdit] = useState(false);
  const isMention = message.content.includes(`@@@__${user.ID}^^^__`)
    ? true
    : false;
  return (
    <Box
      ref={reference}
      className={clsx(classes.chatBox, {
        [classes.chatBoxMention]: isMention,
      })}
      onMouseEnter={() => {
        setOpenMenuEdit(true);
      }}
      onMouseLeave={() => {
        setOpenMenuEdit(false);
      }}
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
      <Box className={classes.chatBoxMenuEdit}>
        {openMenuEdit && (
          <>
            <TextTooltip title="Añadir reaccion" placement="bottom">
              <IconButton color="inherit" className={classes.iconButton}>
                <InsertEmoticonOutlinedIcon className={classes.Icon} />
              </IconButton>
            </TextTooltip>
            {message.user.ID === user.ID && (
              <>
                <TextTooltip title="Editar" placement="bottom">
                  <IconButton
                    color="inherit"
                    variant="rounded"
                    className={classes.iconButton}
                  >
                    <EditOutlinedIcon className={classes.Icon} />
                  </IconButton>
                </TextTooltip>
                <TextTooltip title="Eliminar" placement="bottom">
                  <IconButton color="inherit" className={classes.iconButton}>
                    <DeleteOutlineIcon className={classes.Icon} />
                  </IconButton>
                </TextTooltip>
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Message;
