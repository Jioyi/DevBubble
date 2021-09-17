import React from 'react';
import { useDispatch } from 'react-redux';
import useSound from 'use-sound';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//components
import TextTooltip from './../../TextTooltip';
//icons
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import VideocamIcon from '@material-ui/icons/Videocam';
import CallIcon from '@material-ui/icons/Call';
//sounds
import SoundCancel from './../../../assets/sounds/cancel.wav';
//actions
import { disconnectVoiceChannel } from '../../../redux/actions';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	typography: {
		'marginLeft': theme.spacing(1),
		'textTransform': 'uppercase',
		'color': '#ffffff',
		'fontWeight': 'bold',
		'fontSize': '0.6rem',
		'&:hover': {
			color: '#ffffff',
		},
	},
	button: {
		'marginTop': '10px',
		'marginBottom': '10px',
		'marginLeft': '4px',
		'marginRight': '4px',
		'backgroundColor': '#36393f',
		'color': '#ffffff',
		'fontWeight': 'bold',
		'borderRadius': 6,
		'padding': '6px 16px 6px 16px',
		'white-space': 'nowrap',
		'textTransform': 'none',
		'&:hover': {
			backgroundColor: '#2e3035',
			color: '#ffffff',
		},
	},
	icon: {
		'color': '#ffffff',
		'&:hover': {
			color: '#ffffff',
		},
	},
}));

const MenuOpenCall = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [playCancelConfirm] = useSound(SoundCancel);

	const handleDisconect = () => {
		dispatch(disconnectVoiceChannel());
		playCancelConfirm();
	};

	return (
		<div className={classes.root}>
			<TextTooltip title="Activar cámara" placement="top">
				<Button
					style={{ boxShadow: 'none' }}
					elevation={0}
					variant="contained"
					className={classes.button}
				>
					<VideocamIcon className={classes.icon} />
					<Typography color="inherit" className={classes.typography}>
						Video
					</Typography>
				</Button>
			</TextTooltip>
			<TextTooltip title="Compartir la pantalla" placement="top">
				<Button
					style={{ boxShadow: 'none' }}
					elevation={0}
					variant="contained"
					className={classes.button}
				>
					<ScreenShareIcon className={classes.icon} />
					<Typography color="inherit" className={classes.typography}>
						Pantalla
					</Typography>
				</Button>
			</TextTooltip>
			<TextTooltip
				title="Desconectar"
				placement="top"
				onClick={handleDisconect}
			>
				<Button
					style={{ boxShadow: 'none' }}
					elevation={0}
					variant="contained"
					className={classes.button}
				>
					<CallIcon className={classes.icon} />
				</Button>
			</TextTooltip>
		</div>
	);
};

export default MenuOpenCall;
