import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Nav from '../../components/Nav';
//import Nav from '../../components/Nav';
//import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	offset: theme.mixins.toolbar,
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
	page: {
		backgroundColor: `#fff`,
		marginLeft: theme.spacing(35),
		marginTop: theme.spacing(5),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
	},
}));

const Home = () => {
	
	const classes = useStyles();

	return (
		<Paper className={classes.paper}>
			<div className={classes.offset}></div>
			<Nav />
			<div className={classes.page}>
				<Typography className={classes.tittle}>Home</Typography>
			</div>
		</Paper>
	);
};

export default Home;
