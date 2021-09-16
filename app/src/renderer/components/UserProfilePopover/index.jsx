import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
const { SERVER_API_URL } = process.env;

const CustomPopover = withStyles({
  paper: {
    display: 'flex',
    backgroundColor: 'transparent',
  },
})(Popover);
const useStyles = makeStyles(() => ({
  relative: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
  },
  start: {
    display: 'flex',
    backgroundColor: '#faa81a',
    height: '70px',
    width: '300px',
  },
  end: {
    display: 'flex',
    backgroundColor: '#18191c',
    height: '200px',
    width: '300px',
  },
  avatar: {
    position: 'absolute',
    height: '100px',
    width: '100px',
    top: '25%',
    left: '25%',
    '-ms-transform': 'translate(-50%, -50%)',
    transform: 'translate(-50%, -50%)',
  },
  socialNetworks: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '55%',
    left: '50%',
    '-ms-transform': 'translate(-50%, -50%)',
    transform: 'translate(-50%, -50%)',
  },
}));
const UserProfilePopover = ({ id, open, anchorEl, onClose }) => {
  const classes = useStyles();
  const { userTarget } = useSelector((state) => state.ui);
  return (
    <CustomPopover id={id} open={open} anchorEl={anchorEl} onClose={onClose}>
      <Box className={classes.relative}>
        <Box className={classes.start}>
        </Box>
        <Box className={classes.end}>
        </Box>
        <Avatar
          className={classes.avatar}
          alt="user-picture"
          src={`${SERVER_API_URL}/avatars/avatar.gif`}
        />
        <Box className={classes.socialNetworks}>
          <Typography className={classes.chatBoxTypoUsername}>{userTarget && userTarget.username}</Typography>
          <Typography className={classes.chatBoxTypoDate}>ss</Typography>
        </Box>
      </Box>
    </CustomPopover>
  );
};

export default UserProfilePopover;
