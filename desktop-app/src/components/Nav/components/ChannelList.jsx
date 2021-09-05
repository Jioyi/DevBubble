import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';


//icons
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
//actions
import { createSocketVoice, getChannels } from '../../../redux/actions';
import PanelEditGroup from './PanelEditGroup';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	list: {
		width: '100%',
	},
}));
const ChannelsList = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const { groupSelectedID, channels } = useSelector((state) => state.group);
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
		dispatch(createSocketVoice(channelID));
		history.push("/voice_channel");		
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
				<ListItem button onClick={handleOpenTextChannels}>
					{openTextChannels ? <ExpandLess /> : <ExpandMore />}
					<ListItemText primary="Canales de Texto" />
				</ListItem>
				<Collapse in={openTextChannels} timeout="auto" unmountOnExit>
					{textChannels.map((channel) => {
						return (
							<List key={channel.ID} component="div" disablePadding>
								<ListItem button className={classes.nested}>
									<ListItemIcon>
										<TextFieldsIcon />
									</ListItemIcon>
									<ListItemText primary={channel.name} />
								</ListItem>
							</List>
						);
					})}
				</Collapse>
				<ListItem button onClick={handleOpenVoiceChannels}>
					{openVoiceChannels ? <ExpandLess /> : <ExpandMore />}
					<ListItemText primary="Canales de Voz" />
				</ListItem>
				<Collapse in={openVoiceChannels} timeout="auto" unmountOnExit>
					{voiceChannels.map((channel) => {
						return (
							<List
								onClick={() => {
									handleConnectVoiceChannel(channel.ID);
								}}
								key={channel.ID}
								component="div"
								disablePadding
							>
								<ListItem button className={classes.nested}>
									<ListItemIcon>
										<VolumeUpIcon />
									</ListItemIcon>
									<ListItemText primary={channel.name} />
								</ListItem>
							</List>
						);
					})}
				</Collapse>
			</List>
		</div>
	);
};

export default ChannelsList;
