import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
//components
import UserState from './components/UserState';
import CreateOrAddGroup from './components/CreateOrAddGroup';
import GroupList from './components/GroupList';
import ChannelsList from './components/ChannelList';

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
	groupsToolbar: {
		display: 'flex',
		padding: theme.spacing(0),
		margin: theme.spacing(0),
		backgroundColor: '#2f3136',
		width: `${drawerWidth}px`,
		height: '100%',
	},
	drawerEnd: {
		position: 'fixed',
		backgroundColor: '#292b2f',
		display: 'flex',
		alignItems: 'center',
		zIndex: theme.zIndex.drawer + 1,
		padding: theme.spacing(0, 1),
		left: 0,
		bottom: 0,
		width: `${drawerWidth}px`,
		...theme.mixins.toolbar,
	},
}));

const Nav = () => {
	const classes = useStyles();
	const { user } = useSelector((state) => state.auth);

	return (
		<div className={classes.root}>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<div className={classes.groupsToolbar}>
						<GroupList />
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
				<div className={classes.drawerMiddle}>
					<ChannelsList/>
				</div>
				<div className={classes.drawerEnd}>
					<UserState user={user} />
				</div>
			</Drawer>
		</div>
	);
};

export default Nav;
