import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import useSound from 'use-sound';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

//components
import PanelEditGroup from './PanelEditGroup';
//icons
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
//sounds
import SoundConfirm from './../../../assets/sounds/confirm.wav';
//actions
import { createSocketVoice, getChannels } from '../../../redux/actions';
import { disconnectVoiceChannel } from '../../../redux/actions';

const TextTooltip = withStyles({
	tooltip: {
		backgroundColor: '#18191c',
		color: '#fff',
	},
})(Tooltip);

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	maxWidth: {
		flexGrow: 1,
	},
	list: {
		width: '100%',
	},
	subList: {
		'display': 'flex',
		'flexDirection': 'row',
		'alignItems': 'center',
		'&:hover': {
			cursor: 'pointer',
			backgroundColor: '#32353a',
		},
	},
	listItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	listItemText: {
		'textTransform': 'uppercase',
		'fontSize': '0.7rem',
		'color': '#747f8d',
		'fontWeight': 'bold',
		'&:hover': {
			color: '#ffffff',
		},
	},
	listItemIcon: {
		'margin': '2px',
		'padding': '4px',
		'color': '#747f8d',
		'&:hover': {
			color: '#ffffff',
		},
	},
	listItemTextChannel: {
		'fontSize': '0.9rem',
		'color': '#747f8d',
		'fontWeight': 600,
		'&:hover': {
			color: '#ffffff',
		},
	},
	listItemIconChannel: {
		'margin': '2px',
		'padding': '4px',
		'color': '#747f8d',
		'&:hover': {
			color: '#ffffff',
		},
	},
	iconButton: {
		'padding': theme.spacing(0),
		'margin': '6px',
		'&:hover': {
			backgroundColor: '#292b2f',
		},
	},
}));
const ChannelsList = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const [playSoundConfirm] = useSound(SoundConfirm);
	const { groupSelectedID, channels } = useSelector((state) => state.group);
	const { voiceChannelID, streaming } = useSelector((state) => state.voice);
	const [voiceChannels, setVoiceChannels] = useState([]);
	const [textChannels, setTextChannels] = useState([]);

	const [openVoiceChannels, setOpenVoiceChannels] = useState(true);
	const [openTextChannels, setOpenTextChannels] = useState(true);

	const handleOpenVoiceChannels = () => {
		setOpenVoiceChannels(!openVoiceChannels);
	};

	const handleOpenTextChannels = () => {
		setOpenTextChannels(!openTextChannels);
	};

	const handleConnectVoiceChannel = (channelID) => {
		if (streaming) {
			if (voiceChannelID !== channelID) {
				dispatch(disconnectVoiceChannel());
				dispatch(createSocketVoice(channelID));
			} else {
				history.push('/voice_channel');
			}
		} else {
			dispatch(createSocketVoice(channelID));
			history.push('/voice_channel');
		}
		playSoundConfirm();
	};

	useEffect(() => {
		setVoiceChannels(channels.filter((channel) => channel.type === 'voice'));
		setTextChannels(channels.filter((channel) => channel.type === 'text'));
	}, [channels]);

	useEffect(() => {
		dispatch(getChannels(groupSelectedID));
	}, [dispatch, groupSelectedID]);

	return (
		<div className={classes.root}>
			<List className={classes.list}>
				<PanelEditGroup />
				<List component="div" disablePadding className={classes.subList}>
					<ListItem onClick={handleOpenTextChannels}>
							{openTextChannels ? (
								<ExpandLess className={classes.listItemIcon} />
							) : (
								<ExpandMore className={classes.listItemIcon} />
							)}
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Canales de Texto"
						/>
					</ListItem>
					<TextTooltip title="Crear canal" placement="top">
						<IconButton color="inherit" className={classes.iconButton}>
							<AddIcon className={classes.listItemIconChannel} />
						</IconButton>
					</TextTooltip>
				</List>
				<Collapse in={openTextChannels} timeout="auto" unmountOnExit>
					{textChannels.map((channel) => {
						return (
							<List
								className={classes.subList}
								key={channel.ID}
								component="div"
								disablePadding
							>
								<ListItem>
									<TextFieldsIcon className={classes.listItemIconChannel} />
									<ListItemText
										classes={{ primary: classes.listItemTextChannel }}
										primary={channel.name}
									/>
								</ListItem>
								<TextTooltip title="Editar canal" placement="top">
									<IconButton color="inherit" className={classes.iconButton}>
										<SettingsIcon className={classes.listItemIconChannel} />
									</IconButton>
								</TextTooltip>
							</List>
						);
					})}
				</Collapse>
				<List className={classes.subList} component="div" disablePadding>
					<ListItem onClick={handleOpenVoiceChannels}>
							{openVoiceChannels ? (
								<ExpandLess className={classes.listItemIcon} />
							) : (
								<ExpandMore className={classes.listItemIcon} />
							)}
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary="Canales de Voz"
						/>
					</ListItem>
					<TextTooltip title="Crear canal" placement="top">
						<IconButton color="inherit" className={classes.iconButton}>
							<AddIcon className={classes.listItemIconChannel} />
						</IconButton>
					</TextTooltip>
				</List>
				<Collapse in={openVoiceChannels} timeout="auto" unmountOnExit>
					{voiceChannels.map((channel) => {
						return (
							<List
								key={channel.ID}
								className={classes.subList}
								component="div"
								disablePadding
							>
								<ListItem
									className={classes.listItem}
									onClick={() => {
										handleConnectVoiceChannel(channel.ID);
									}}
								>
									<VolumeUpIcon className={classes.listItemIconChannel} />
									<ListItemText
										classes={{ primary: classes.listItemTextChannel }}
										primary={channel.name}
									/>
								</ListItem>
								<TextTooltip title="Editar canal" placement="top">
									<IconButton color="inherit" className={classes.iconButton}>
										<SettingsIcon className={classes.listItemIconChannel} />
									</IconButton>
								</TextTooltip>
							</List>
						);
					})}
				</Collapse>
			</List>
		</div>
	);
};

export default ChannelsList;
