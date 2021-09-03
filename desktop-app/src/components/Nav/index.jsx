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
		borderRight: '2px solid #202225',
		borderBottom: '2px solid #202225',
		padding: theme.spacing(0),
		margin: theme.spacing(0),
		minHeight: '20px',
	},
	maxWidth: {
		flexGrow: 1,
	},
	drawer: {
		marginTop: '32px',
		backgroundColor: '#2f3136',
		width: drawerWidth,
	},
	groupsToolbar: {
		display: 'flex',
		padding: theme.spacing(0),
		margin: theme.spacing(0),
		backgroundColor: '#2f3136',
		width: `${drawerWidth}px`,
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
					<div>logo</div>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				classes={{
					paper: classes.drawer,
				}}
			>
				<div className={classes.drawerEnd}>
					<UserState user={user} />
				</div>
			</Drawer>
		</div>
	);
};

export default Nav;
