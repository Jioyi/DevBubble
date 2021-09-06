import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Nav from '../../components/Nav';
import './index.css';
import VideoStream from './VideoStream.jsx';

const useStyles = makeStyles((theme) => ({
	offset: theme.mixins.toolbar,
	paper: {
		backgroundColor: '#000000',
		padding: theme.spacing(0),
		margin: theme.spacing(0),
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'center',
		flexDirection: 'column',
	},
	page: {
		flexGrow: 1,
		display: 'flex',
		backgroundColor: '#fff',
		padding: theme.spacing(0),
		margin: theme.spacing(0),
		marginLeft: '300px !important',
		width: 'calc(100% - 310px)',
		alignItems: 'center',
		justifyContent: 'center',
	},
}));

const VoiceChannel = () => {
	const classes = useStyles();
	const { streamings } = useSelector((state) => state.voice);
	const myID = useSelector((state) => state.auth.user.ID);

	return (
		<Paper className={classes.paper}>
			<div className={classes.offset}></div>
			<Nav />
			<Paper className={classes.page}>
				{streamings.map((user) => {
					return <VideoStream key={user.ID} myID={myID} user={user} />;
				})}
			</Paper>
		</Paper>
	);
};

export default VoiceChannel;
