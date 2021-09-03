import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useSound from 'use-sound';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
//actions
import { changeMicState, changeVolumeState } from '../../../redux/actions';
//icons
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
//sounds
import SoundConfirm from './../../../assets/sounds/confirm.wav';
import SoundCancel from './../../../assets/sounds/cancel.wav';
//components
import MenuUserState from './MenuUserState';

const useStyles = makeStyles((theme) => ({
	maxWidth: {
		flexGrow: 1,
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

const UserState = ({ user }) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [playSoundConfirm] = useSound(SoundConfirm);
	const [playCancelConfirm] = useSound(SoundCancel);
	const { userState, volume, mic } = useSelector((state) => state.ui);

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
		<>
			<MenuUserState user={user} userState={userState} />
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
		</>
	);
};

export default UserState;
