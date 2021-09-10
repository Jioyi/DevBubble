import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useSound from 'use-sound';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
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

const TextTooltip = withStyles({
	tooltip: {
		backgroundColor: '#18191c',
		color: '#fff',
	},
})(Tooltip);

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		width: '280px',
		alignItems: 'center',
	},
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
		margin: "5px",
		height: "40px",
		width: "40px",
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
		<div className={classes.root}>
			<MenuUserState user={user} userState={userState} />
			<div className={classes.maxWidth}></div>
			<TextTooltip title="Silenciar" placement="top">
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
			</TextTooltip>
			<TextTooltip title="Ensordecer" placement="top">
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
			</TextTooltip>
			<TextTooltip title="Ajustes de Usuario" placement="top">
				<IconButton className={classes.buttonSettings}>
					<SettingsIcon className={classes.iconSettings} />
				</IconButton>
			</TextTooltip>
		</div>
	);
};

export default UserState;
