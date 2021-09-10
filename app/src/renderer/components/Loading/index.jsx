import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
	paper: {
		backgroundColor: '#36393f',
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
	relative: {
		position: 'relative',
	},
	bottom: {
		color: "#202225",
	},
	top: {
		color: '#fff',
		animationDuration: '550ms',
		position: 'absolute',
		left: 0,
	},
	circle: {
		strokeLinecap: 'round',
	},
}));

const Loading = () => {
	const classes = useStyles();

	return (
		<Paper className={classes.paper}>
			<div className={classes.relative}>
				<CircularProgress
					variant="determinate"
					className={classes.bottom}
					size={52}
					thickness={4}
					value={100}
				/>
				<CircularProgress
					variant="indeterminate"
					disableShrink
					className={classes.top}
					classes={{
						circle: classes.circle,
					}}
					size={52}
					thickness={4}
				/>
			</div>
		</Paper>
	);
};

export default Loading;
