import React, { useState } from 'react';

import Register from './components/Register'
import Recovery from './components/Recovery'
import SignIn from './components/SignIn'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { login } from '../../redux/actions';
import imageLogin from './../../assets/images/login.png';

import { useStyles } from './style'

const Login = () => {
  const [ stateAuth, setStateAuth ] = useState('login');
    
  const classes = useStyles();

  
  const showRecoveryPassword = (e) => {
    e.preventDefault();
    setStateAuth('recoveryPassword');
  };

  const showLogin = (e) => {
    e.preventDefault();
    setStateAuth('login');
  };

  const showRegister = (e) => {
    e.preventDefault();
    setStateAuth('register');
  };

  return (
    <Paper className={classes.paper}>
      <CardMedia
        className={classes.image}
        image={imageLogin}
        title="image login"
      />
      <Typography className={classes.title}>
        Una única plataforma para tu equipo y tu trabajo
      </Typography>
      {
        stateAuth === 'login' ? 
          (<SignIn 
              showRegister={showRegister}
              showRecoveryPassword={showRecoveryPassword}
          />) 
        : stateAuth === 'register' ? 
          (<Register 
            showLogin={showLogin}
          />) 
        : 
          (<Recovery
            showLogin={showLogin}
            showRegister={showRegister}
          />)
      }
    </Paper>
  );
};

export default Login;
