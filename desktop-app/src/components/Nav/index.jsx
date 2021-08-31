import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useSound from 'use-sound';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
//icons
import MenuIcon from '@material-ui/icons/Menu';
import MicIcon from '@material-ui/icons/Mic';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import SettingsIcon from '@material-ui/icons/Settings';
import Brightness1Icon from '@material-ui/icons/Brightness1';
//sounds
import SoundConfirm from './../../assets/sounds/confirm.wav';
import SoundCancel from './../../assets/sounds/cancel.wav';
//actions
import { changeMicState, changeVolumeState } from '../../redux/actions';

const drawerWidth = 220;

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
		padding: theme.spacing(0),
		margin: theme.spacing(0),
		minHeight: '20px',
	},
	menuButton: {
		fontSize: '2rem',
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
		padding: theme.spacing(0),
		margin: theme.spacing(0),
		backgroundColor: '#2f3136',
		width: drawerWidth,
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
	relative: {
		position: 'relative',
	},
	avatar: {
		marginLeft: '8px',
	},
	avatarStatus: {
		position: 'absolute',
		padding: theme.spacing(0),
		right: -10,
		bottom: -10,
	},
	iconAvatarStatus: {
		stroke: '#292b2f',
		strokeWidth: 4,
		height: '20px',
		width: '20px',
		color: '#3ba55d',
	},
	iconSettings: {
		'margin': '6px',
		'color': '#747f8d',
		'&:hover': {
			color: '#ffffff',
		},
	},
	iconSettingsCancel: {
		'margin': '6px',
		'color': '#ed4245',
		'&:hover': {
			color: '#ed4245',
		},
	},
	buttonSettings: {
		'padding': theme.spacing(0),
		'margin': theme.spacing(0),
		'&:hover': {
			backgroundColor: '#32353a',
		},
	},
}));

const Nav = () => {
	const dispatch = useDispatch();
	//const history = useHistory();
	const [playSoundConfirm] = useSound(SoundConfirm);
	const [playCancelConfirm] = useSound(SoundCancel);
	const classes = useStyles();
	const { user } = useSelector((state) => state.auth);
	const { volume, mic } = useSelector((state) => state.ui);

	const handleOnChangeMic = () => {
		if (mic) {
			playCancelConfirm();
		} else {
			playSoundConfirm();
		}
		dispatch(changeMicState());
	};

	const handleOnChangeVolume = () => {
		if (volume) {
			playCancelConfirm();
		} else {
			playSoundConfirm();
		}
		dispatch(changeVolumeState());
	};

	return (
		<div className={classes.root}>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<div className={classes.groupsToolbar}>
						<IconButton color="inherit" className={classes.menuButton}>
							<MenuIcon />
						</IconButton>
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
					<div className={classes.relative}>
						<Avatar
							className={classes.avatar}
							alt="user-picture"
							src={`./avatar/${user.avatar}`}
						/>
						<div className={classes.avatarStatus}>
							<Brightness1Icon className={classes.iconAvatarStatus} />
						</div>
					</div>
					<div className={classes.maxWidth}></div>
					<IconButton
						className={classes.buttonSettings}
						onClick={handleOnChangeMic}
					>
						<MicIcon
							className={clsx({
								[classes.iconSettings]: mic,
								[classes.iconSettingsCancel]: !mic,
							})}
						/>
					</IconButton>
					<IconButton
						className={classes.buttonSettings}
						onClick={handleOnChangeVolume}
					>
						<VolumeUpIcon
							className={clsx({
								[classes.iconSettings]: volume,
								[classes.iconSettingsCancel]: !volume,
							})}
						/>
					</IconButton>
					<IconButton className={classes.buttonSettings}>
						<SettingsIcon className={classes.iconSettings} />
					</IconButton>
				</div>
			</Drawer>
		</div>
	);
};

export default Nav;
