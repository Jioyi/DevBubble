import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import WindowControls from './components/WindowControls';
import GuestRoute from './components/GuestRoute';
import ProtectedRoute from './components/ProtectedRoute';
//views
import Login from './views/Login';
import Home from './views/Home';

const useStyles = makeStyles((theme) => ({
	app: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: '#202225',
		padding: theme.spacing(0),
		margin: theme.spacing(0),
		height: '100vh',
		width: '100%',
		flexGrow: 1,
	},
}));

const App = () => {
	const classes = useStyles();

	return (
		<div className={classes.app}>
			<CssBaseline />
			<WindowControls />
			<Switch>
				<GuestRoute path="/" exact component={Login} />
				<ProtectedRoute path="/home" exact component={Home} />
				<Route path="*" render={() => <Redirect to="/" />} />
			</Switch>
		</div>
	);
};

export default App;
