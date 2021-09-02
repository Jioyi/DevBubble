import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
//components
import WindowControls from './components/WindowControls';
import GuestRoute from './components/GuestRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/Loading';
//views
import Login from './views/Login';
import Home from './views/Home';
//actions
import { setLoading, checkToken } from './redux/actions';

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
	const dispatch = useDispatch();
	const { isLoading, isAuthenticated } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(checkToken());
		} else {
			dispatch(setLoading(false));
		}
	}, [dispatch, isAuthenticated]);

	if (isLoading) {
		return (
			<div className={classes.app}>
				<CssBaseline />
				<WindowControls />
				<Loading />
			</div>
		);
	}

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
