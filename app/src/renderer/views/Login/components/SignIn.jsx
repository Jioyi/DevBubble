import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from 'renderer/redux/actions';

import { useStyles } from '../index';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  TextField,
  Box,
  Button,
} from '@material-ui/core';

const localStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  },
});

function SignIn({ showRegister, showRecoveryPassword }) {
  const classes = {
    ...useStyles(),
    ...localStyles(),
  };
  const dispatch = useDispatch();

  const [inputSignIn, setInputSignIn] = useState({
    email: 'karlosagreda@hotmail.com',
    password: '123456',
  });

  const handleOnChange = (e) => {
    setInputSignIn({
      ...inputSignIn,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(signIn(inputSignIn));
  };

  return (
    <Box>
      <Box className={classes.boxCenter}>
        <Typography className={classes.h1}>Inicio de sesion</Typography>
      </Box>
      <form
        className={classes.form}
        onSubmit={handleSignIn}
        onChange={handleOnChange}
      >
        <TextField
          label="Correo electrónico"
          name="email"
          type="email"
          value={inputSignIn.email}
          className={classes.textField}
          // helperText={'helperText'}
          error={false}
          InputProps={{
            className: classes.input,
          }}
          InputLabelProps={{
            className: classes.input,
          }}
          margin="dense"
          variant="outlined"
        />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          value={inputSignIn.password}
          className={classes.textField}
          // helperText={'helperText'}
          error={false}
          InputProps={{
            className: classes.input,
          }}
          InputLabelProps={{
            className: classes.input,
          }}
          margin="dense"
          variant="outlined"
        />
        <Button className={classes.button} onClick={handleSignIn}>
          INGRESAR
        </Button>
      </form>
      <Box className={classes.boxCenter}>
        <Typography className={classes.text}>
          ¿Primera ves en Dev Bubble?{' '}
          <a href="/" onClick={showRegister} className={classes.text2}>
            Crear una cuenta
          </a>
        </Typography>
        <Typography className={classes.text}>
          ¿Olvidaste Tu contraseña?{' '}
          <a href="/" onClick={showRecoveryPassword} className={classes.text2}>
            Recuperar mi contraseña!
          </a>
        </Typography>
      </Box>
    </Box>
  );
}

export default SignIn;
