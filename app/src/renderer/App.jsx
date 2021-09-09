import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
//components
import WindowControls from './components/WindowControls';
import GuestRoute from './components/GuestRoute';
/*
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/Loading';*/
//views
import Login from './views/Login';
/*import Home from './views/Home';
import VoiceChannel from './views/VoiceChannel';
import DirectMessage from './views/DirectMessage';
//actions
import { setLoading, checkToken } from './redux/actions';*/

const useStyles = makeStyles(() => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#202225',
    padding: '1px',
    margin: '0px',
    height: '100vh',
    width: '100%',
    flexGrow: 1,
  },
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  //const { isLoading, isAuthenticated } = useSelector((state) => state.auth);

  /*useEffect(() => {
		if (isAuthenticated) {
			dispatch(checkToken());
		} else {
			dispatch(setLoading(false));
		}
	}, [dispatch, isAuthenticated]);*/

  /*if (isLoading) {
		return (
			<div className={classes.app}>
				<CssBaseline />
				<WindowControls />
				<Loading />
			</div>
		);
	}*/

  return (
    <div className={classes.app}>
      <CssBaseline />
      <WindowControls />
      <Switch>
        <GuestRoute path="*" exact component={Login} />
        {/* 
				<ProtectedRoute path="/home" exact component={Home} />
				<ProtectedRoute path="/voice_channel" exact component={VoiceChannel} />
				<ProtectedRoute path="/direct_message/:ID" exact component={DirectMessage} />
				<Route path="*" render={() => <Redirect to="/" />} />*/}
      </Switch>
    </div>
  );
};

export default App;
