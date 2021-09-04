import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Nav from '../../components/Nav';
//import Nav from '../../components/Nav';
//import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	offset: theme.mixins.toolbar,
	paper: {
		backgroundColor: '#000',
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
		width: 'calc(100% - 300px)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	tittle: {
		backgroundColor: '#ffffff',
		color: '#000',
	},
	container: {
		flexGrow: 1,
		display: 'flex',
		backgroundColor: '#eee',
		padding: theme.spacing(0),
		alignItems: 'center',
		justifyContent: 'center',
		color: theme.palette.text.secondary,
	},
	grid: {
		flexGrow: 1,
		display: 'flex',
		backgroundColor: '#eee',
		padding: theme.spacing(0),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	relative: {
		padding: theme.spacing(2),
		position: 'relative',
	},
	video: {
		backgroundColor: '#000',
		//height: "320px",
		//width: "560px",
		width: '100%',
		height: 'auto',
	},
	avatarStatus: {
		color: '#fff',
		position: 'absolute',
		padding: theme.spacing(0),
		right: 100,
		bottom: 20,
	},
}));

const Home = () => {
	const classes = useStyles();

	return (
		<Paper className={classes.paper}>
			<div className={classes.offset}></div>
			<Nav />
			<Paper className={classes.page}>
				<Grid container className={classes.grid}>
					{Array.from(Array(2)).map((_, index) => (
						<Grid item key={index}>
							<div className={classes.relative}>
								<div className={classes.video}>sss</div>
								<div className={classes.avatarStatus}>XXX</div>
							</div>
						</Grid>
					))}
				</Grid>
			</Paper>
		</Paper>
	);
};

export default Home;
