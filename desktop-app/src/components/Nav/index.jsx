import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';

import Divider from '@material-ui/core/Divider';
//components
import UserState from './components/UserState';
import CreateOrAddGroup from './components/CreateOrAddGroup';
import GroupList from './components/GroupList';
import ChannelsList from './components/ChannelList';
import MenuOpenCall from './components/MenuOpenCall';
import DirectMessagesList from './components/DirectMessagesList';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		boxShadow: 'none',
		marginTop: '30px',
		backgroundColor: '#36393f',
		zIndex: theme.zIndex.drawer + 1,
	},
	toolbar: {
		flexGrow: 1,
		borderRight: '2px solid #202225',
		borderBottom: '2px solid #202225',
		padding: theme.spacing(0),
		margin: theme.spacing(0),
		height: '50px',
	},
	maxWidth: {
		flexGrow: 1,
	},
	drawer: {
		marginTop: '94px',
		backgroundColor: '#2f3136',
		width: drawerWidth,
		overflowY: 'hidden',
		overflowX: 'hidden',
	},
	drawerMiddle: {
		'padding': '0px',
		'paddingBottom': '158px',
		'overflowY': 'auto',
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
			marginBottom: '158px',
		},
		'&::-webkit-scrollbar-track-piece:start': {
			background: 'transparent',
		},
		'overflowX': 'hidden',
	},
	drawerMiddleCall: {
		'padding': '0px',
		'paddingBottom': '240px',
		'overflowY': 'auto',
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
			marginBottom: '240px',
		},
		'&::-webkit-scrollbar-track-piece:start': {
			background: 'transparent',
		},
		'overflowX': 'hidden',
	},
	groupsToolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: theme.spacing(0),
		margin: theme.spacing(0),
		backgroundColor: '#2f3136',
		width: `${drawerWidth}px`,
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
	const [group, setGroup] = useState(null);
	const [openCall, setOpenCall] = useState(false);
	const { user } = useSelector((state) => state.auth);
	const { streaming } = useSelector((state) => state.voice);
	const { groups, groupSelectedID } = useSelector((state) => state.group);

	useEffect(() => {
		if (streaming) {
			setOpenCall(true);
		} else {
			setOpenCall(false);
		}
	}, [streaming]);

	useEffect(() => {
		setGroup(groups.find((group) => group.ID === groupSelectedID));
	}, [groupSelectedID, groups]);

	return (
		<div className={classes.root}>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<div className={classes.groupsToolbar}>
						<GroupList group={group} groups={groups} />
						<div className={classes.maxWidth}></div>
						<CreateOrAddGroup />
					</div>
					<div className={classes.maxWidth}>max</div>
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
						[classes.drawerMiddleCall]: openCall,
					})}
				>
					<ChannelsList />
					<DirectMessagesList />					
				</div>
				<div className={classes.drawerEnd}>
					{openCall && (
						<>
							<MenuOpenCall />
							<Divider className={classes.divider} />
						</>
					)}
					<UserState user={user} />
				</div>
			</Drawer>
		</div>
	);
};

export default Nav;
