import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
//icons
import Brightness1Icon from '@material-ui/icons/Brightness1';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
//components
import TextTooltip from './../../TextTooltip';
//actions
import {
  getDirectMessages,
  setHiddenDirectMessage,
} from '../../../redux/actions';

const { SERVER_API_URL } = process.env;
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colapse: {
    margin: '0px',
    padding: '0px',
  },
  list: {
    width: '100%',
  },
  listItem: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#32353a',
    },
  },
  listItemIcon: {
    margin: '0px',
    padding: '4px',
    color: '#747f8d',
    '&:hover': {
      color: '#ffffff',
    },
  },
  listItemText: {
    textTransform: 'uppercase',
    fontSize: '0.7rem',
    color: '#747f8d',
    fontWeight: 'bold',
    '&:hover': {
      color: '#ffffff',
    },
  },
  avatar: {
    margin: '4px',
    height: '20px',
    width: '20px',
  },
  avatarStatus: {
    position: 'absolute',
    padding: theme.spacing(0),
    right: -2,
    bottom: -6,
  },
  iconConnectStroke: {
    stroke: '#292b2f',
    strokeWidth: 2,
    height: '14px',
    width: '14px',
    color: '#3ba55d',
  },
  iconAbsentStroke: {
    stroke: '#292b2f',
    strokeWidth: 2,
    height: '14px',
    width: '14px',
    color: '#faa81a',
  },
  iconDoNotDisturbStroke: {
    stroke: '#292b2f',
    strokeWidth: 2,
    height: '14px',
    width: '14px',
    color: '#ed4245',
  },
  iconDisconnectStroke: {
    stroke: '#292b2f',
    strokeWidth: 2,
    height: '14px',
    width: '14px',
    color: '#747f8d',
  },
  listDirectMessageText: {
    marginLeft: '6px',
    fontSize: '0.7rem',
    color: '#747f8d',
    fontWeight: 'bold',
    '&:hover': {
      color: '#ffffff',
    },
  },
  relative: {
    position: 'relative',
  },
  noSelect: {
    '-moz-user-select': 'none',
    '-webkit-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
  },
  iconButton: {
    padding: theme.spacing(0),
    margin: '0px',
    '&:hover': {
      backgroundColor: '#292b2f',
    },
  },
}));

const DirectMessagesList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(true);
  const { hidden_list, user } = useSelector((state) => state.auth);
  const { directMessages } = useSelector((state) => state.message);

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open) {
      dispatch(getDirectMessages());
    }
  }, [dispatch, open]);

  const handlePushDirectMessage = (ID) => {
    history.push(`/direct_message/${ID}`);
  };

  const handleHiddenDirectMessage = (ID) => {
    dispatch(setHiddenDirectMessage(ID));
  };

  return (
    <div className={classes.root}>
      <List component="div" disablePadding className={classes.list}>
        <ListItem onClick={handleOpen} className={classes.listItem}>
          {open ? (
            <ExpandLess className={classes.listItemIcon} />
          ) : (
            <ExpandMore className={classes.listItemIcon} />
          )}
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Mensajes directos"
          />
        </ListItem>
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          className={classes.collapse}
        >
          {open &&
            directMessages.map((DirectMessage) => {
              if (hidden_list.includes(DirectMessage.ID)) {
                return null;
              }
              let primary = '';
              let usersFiltered;
              if (DirectMessage.users.length === 1) {
                primary = 'Tú';
                usersFiltered = DirectMessage.users;
              } else if (DirectMessage.users.length === 2) {
                usersFiltered = DirectMessage.users.filter(
                  (userP) => userP.ID !== user.ID
                );
                primary = `${usersFiltered[0].username}`;
              } else {
                primary = `Tú y ${DirectMessage.users.length - 1} personas`;
                usersFiltered = DirectMessage.users
                  .filter((userP) => userP.ID !== user.ID)
                  .slice(0, 5);
              }
              return (
                <ListItem
                  onClick={() => {
                    handlePushDirectMessage(DirectMessage.ID);
                  }}
                  key={DirectMessage.ID}
                  className={classes.listItem}
                  component="div"
                >
                  {usersFiltered.map((user) => {
                    return (
                      <div key={user.ID} className={classes.relative}>
                        <Avatar
                          variant="rounded"
                          className={classes.avatar}
                          alt="avatar"
                          src={`${SERVER_API_URL}/avatars/${user.avatar}`}
                        />
                        <div className={classes.avatarStatus}>
                          {user.connected ? (
                            user.state === 'connected' ? (
                              <Brightness1Icon
                                className={classes.iconConnectStroke}
                              />
                            ) : user.state === 'absent' ? (
                              <Brightness1Icon
                                className={classes.iconAbsentStroke}
                              />
                            ) : user.state === 'doNotDisturb' ? (
                              <Brightness1Icon
                                className={classes.iconDoNotDisturbStroke}
                              />
                            ) : (
                              <Brightness1Icon
                                className={classes.iconDisconnectStroke}
                              />
                            )
                          ) : (
                            <Brightness1Icon
                              className={classes.iconDisconnectStroke}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <ListItemText
                    classes={{
                      primary: clsx(
                        classes.listDirectMessageText,
                        classes.noSelect
                      ),
                    }}
                    primary={primary}
                  />
                  <ListItemSecondaryAction>
                    <TextTooltip title="Ocultar" placement="top">
                      <IconButton
                        color="inherit"
                        className={classes.iconButton}
                        onClick={(e) => {
                          e.preventDefault();
                          handleHiddenDirectMessage(DirectMessage.ID);
                        }}
                      >
                        <CloseIcon className={classes.listItemIcon} />
                      </IconButton>
                    </TextTooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
        </Collapse>
      </List>
    </div>
  );
};

export default DirectMessagesList;
