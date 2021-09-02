import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useSound from 'use-sound';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
//icons
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import AddCircleIcon from '@material-ui/icons/AddCircle';
//sounds
import SoundConfirm from './../../assets/sounds/confirm.wav';
import SoundCancel from './../../assets/sounds/cancel.wav';
//actions
import {
	changeMicState,
	changeVolumeState,
	setOpenAddGroup,
} from '../../redux/actions';
//components
import MenuUserState from './components/MenuUserState';
import DialogCreateOrAddGroup from './components/DialogCreateOrAddGroup';

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
		borderRight: '2px solid #202225',
		borderBottom: '2px solid #202225',
		padding: theme.spacing(0),
		margin: theme.spacing(0),
		minHeight: '20px',
	},
	icon: {
		'margin': '6px',
		'color': '#747f8d',
		'&:hover': {
			color: '#ffffff',
		},
	},
	iconButton: {
		'padding': theme.spacing(0),
		'margin': '6px',
		'&:hover': {
			backgroundColor: '#32353a',
		},
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
	const { volume, mic, openAddGroup } = useSelector((state) => state.ui);

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

	const handleOnAddGroup = () => {
		dispatch(setOpenAddGroup(true));
	};

	const handleOnCloseAddGroup = () => {
		dispatch(setOpenAddGroup(false));
	};

	return (
		<div className={classes.root}>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<div className={classes.groupsToolbar}>
						<div>logo</div>
						<div className={classes.maxWidth}>max</div>
						<IconButton
							color="inherit"
							onClick={handleOnAddGroup}
							className={classes.iconButton}
						>
							<AddCircleIcon className={classes.icon} />
						</IconButton>
						<DialogCreateOrAddGroup
							open={openAddGroup}
							onCancel={handleOnCloseAddGroup}
						></DialogCreateOrAddGroup>
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
					<MenuUserState user={user} />
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
						<HeadsetIcon
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
