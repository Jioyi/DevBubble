import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

//components
import SocialNetworkIcon from './../SocialNetworkIcon';
//actions
import { sendMessageToUser } from './../../redux/actions';

const { SERVER_API_URL } = process.env;

const CustomPopover = withStyles({
  paper: {
    display: 'flex',
    backgroundColor: 'transparent',
    borderRadius: '8px',
    '& label.Mui-focused': {
      color: '#8e9297',
      borderColor: '#8e9297',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#8e9297',
      color: '#8e9297',
      borderColor: '#8e9297',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        color: '#8e9297',
        borderColor: '#8e9297',
      },
      '&:hover fieldset': {
        color: '#8e9297',
        borderColor: '#8e9297',
      },
      '&.Mui-focused fieldset': {
        color: '#8e9297',
        borderColor: '#8e9297',
      },
    },
    '& .Mui-error': {
      color: '#8e9297',
    },
    '& .MuiFormHelperText-root': {
      color: '#8e9297',
    },
  },
})(Popover);
const useStyles = makeStyles(() => ({
  relative: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
  },
  startDisconnected: {
    display: 'flex',
    backgroundColor: '#747f8d',
    height: '70px',
    width: '300px',
  },
  startConnected: {
    display: 'flex',
    backgroundColor: '#3ba55d',
    height: '70px',
    width: '300px',
  },
  startAbsent: {
    display: 'flex',
    backgroundColor: '#faa81a',
    height: '70px',
    width: '300px',
  },
  startDoNotDisturb: {
    display: 'flex',
    backgroundColor: '#ed4245',
    height: '70px',
    width: '300px',
  },
  end: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#18191c',
    minHeight: '100px',
    width: '300px',
  },
  avatar: {
    position: 'absolute',
    height: '100px',
    width: '100px',
    top: 20,
    left: 10,
  },
  username: {
    position: 'absolute',
    top: 80,
    left: 120,
  },
  usernameTypo: {
    color: '#5f6a79',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  pad: {
    display: 'flex',
    padding: 30,
  },
  socialNetworksTitle: {
    display: 'flex',
    paddingLeft: 10,
  },
  networksTypo: {
    color: '#5f6a79',
    fontSize: '0.9rem',
    fontWeight: 'normal',
  },
  socialNetworks: {
    display: 'flex',
    paddingLeft: 8,
    paddingBottom: 8,
  },
  sendMessageBox: {
    display: 'flex',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  input: {
    fontSize: '0.8rem',
    color: '#8e9297',
    borderColor: '#8e9297',
  },
  textField: {
    color: '#fff',
    width: '40ch',
    backgroundColor: '#292b2f',
  },
}));
const UserProfilePopover = ({ id, open, anchorEl, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userTarget } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState('');

  const handleOnChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.which == 13) {
      e.preventDefault();
      handleOnSubmitMessage();
    }
  };

  const handleOnSubmitMessage = () => {
    if (message !== '') {
      const data = { UserID: userTarget.ID, message: message };
      dispatch(sendMessageToUser(data));
      onClose();
    }
  };

  useEffect(() => {
    return () => setMessage('');
  }, [onClose]);

  return (
    <CustomPopover id={id} open={open} anchorEl={anchorEl} onClose={onClose}>
      <Box className={classes.relative}>
        {userTarget && userTarget.connected ? (
          userTarget.state === 'connected' ? (
            <Box className={classes.startConnected}></Box>
          ) : userTarget.state === 'absent' ? (
            <Box className={classes.startAbsent}></Box>
          ) : userTarget.state === 'doNotDisturb' ? (
            <Box className={classes.startDoNotDisturb}></Box>
          ) : (
            <Box className={classes.startDisconnected}></Box>
          )
        ) : (
          <Box className={classes.startDisconnected}></Box>
        )}
        <Box className={classes.end}>
          <Box className={classes.pad}></Box>
          {userTarget && userTarget.social_networks.length > 0 && (
            <>
              <Box className={classes.socialNetworksTitle}>
                <Typography className={classes.networksTypo}>
                  Redes Sociales
                </Typography>
              </Box>
              <Box className={classes.socialNetworks}>
                {userTarget &&
                  userTarget.social_networks
                    .slice(0, 7)
                    .map((socialNetwork) => {
                      return (
                        <SocialNetworkIcon
                          key={socialNetwork.ID}
                          link={socialNetwork.link}
                          height="36"
                          width="36"
                        />
                      );
                    })}
              </Box>
            </>
          )}
          {userTarget && userTarget.ID !== user.ID && (
            <Box className={classes.sendMessageBox}>
              <TextField
                spellCheck={false}
                label={`Mensaje para @${userTarget.username}`}
                name="password"
                type="text"
                value={message}
                className={classes.textField}
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  className: classes.input,
                }}
                onKeyDown={handleKeyDown}
                noValidate
                autoComplete="off"
                onChange={handleOnChange}
                margin="dense"
                variant="outlined"
              />
            </Box>
          )}
        </Box>
        {userTarget && (
          <>
            <Avatar
              className={classes.avatar}
              alt="user-picture"
              src={`${SERVER_API_URL}/avatars/${userTarget.avatar}`}
            />
            <Box className={classes.username}>
              <Typography className={classes.usernameTypo}>
                {`@${userTarget.username}`}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </CustomPopover>
  );
};

export default UserProfilePopover;
