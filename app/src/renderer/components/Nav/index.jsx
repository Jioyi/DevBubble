import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
//context
import { SocketContext } from '../../contexts/SocketContext';
//components
import UserState from './components/UserState';
import CreateOrAddGroup from './components/CreateOrAddGroup';
import GroupList from './components/GroupList';
import ChannelsList from './components/ChannelList';
import MenuOpenCall from './components/MenuOpenCall';
import DirectMessagesList from './components/DirectMessagesList';
import TopBar from '../TopBar';
import { AuthContext } from 'renderer/contexts/AuthContext';

const drawerWidth = 300;
const isElectron = require('is-electron');
const electron = isElectron();

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    boxShadow: 'none',
    marginTop: electron ? '28px' : '0px',
    backgroundColor: '#36393f',
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    minHeight: '64px',
    flexGrow: 1,
    borderRight: '1px solid #202225',
    borderBottom: '1px solid #202225',
    padding: theme.spacing(0),
    margin: theme.spacing(0),
    height: '50px',
  },
  maxWidth: {
    flexGrow: 1,
  },
  drawer: {
    flexShrink: 0,
    marginTop: electron ? '92px' : '64px',
    backgroundColor: '#2f3136',
    width: drawerWidth,
    minWidth: drawerWidth,
    overflowY: 'hidden',
    overflowX: 'hidden',
  },
  drawerMiddle: {
    padding: '0px',
    paddingBottom: electron ? '156px' : '128px',
    overflowY: 'auto',
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
      marginBottom: electron ? '156px' : '128px',
    },
    '&::-webkit-scrollbar-track-piece:start': {
      background: 'transparent',
    },
    overflowX: 'hidden',
  },
  drawerMiddleCall: {
    paddingBottom: electron ? '214px' : '186px',
    overflowY: 'auto',
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
      marginBottom: electron ? '214px' : '186px',
    },
    '&::-webkit-scrollbar-track-piece:start': {
      background: 'transparent',
    },
    overflowX: 'hidden',
  },
  groupsToolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0),
    margin: theme.spacing(0),
    backgroundColor: '#2f3136',
    width: `${drawerWidth}px`,
    minWidth: `${drawerWidth}px`,
    height: '100%',
  },
  drawerEnd: {
    display: 'flex',
    position: 'fixed',
    backgroundColor: '#292b2f',
    alignItems: 'center',
    flexDirection: 'column',
    zIndex: theme.zIndex.drawer + 1,
    padding: theme.spacing(0, 1),
    left: 0,
    bottom: 0,
    width: `${drawerWidth}px`,
    ...theme.mixins.toolbar,
  },
  divider: {
    background: '#35383e',
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    width: '280px',
    height: '2px',
  },
}));

const Nav = () => {
  const classes = useStyles();
  const { state, closeCall } = useContext(SocketContext);
  const [group, setGroup] = useState(null);
  const [openMenuOpenCall, setOpenMenuOpenCall] = useState(false);

  const { user } = useContext(AuthContext);
  const { groups, groupSelectedID } = useSelector((state) => state.group);

  useEffect(() => {
    setGroup(groups.find((group) => group.ID === groupSelectedID));
  }, [groupSelectedID, groups]);

  useEffect(() => {
    if (state?.current === 'inCall') {
      setOpenMenuOpenCall(true);
    } else {
      setOpenMenuOpenCall(false);
    }
  }, [state?.current]);

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.groupsToolbar}>
            <GroupList group={group} groups={groups} />
            <div className={classes.maxWidth}></div>
            <CreateOrAddGroup />
          </div>
          <TopBar />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawer,
        }}
      >
        <div
          className={clsx(classes.drawerMiddle, {
            [classes.drawerMiddleCall]: openMenuOpenCall,
          })}
        >
          <ChannelsList />
          <DirectMessagesList />
        </div>
        <div className={classes.drawerEnd}>
          {openMenuOpenCall && (
            <>
              <MenuOpenCall closeCall={closeCall} />
              <Divider className={classes.divider} />
            </>
          )}
          <UserState user={user} />
        </div>
      </Drawer>
    </>
  );
};

export default Nav;
