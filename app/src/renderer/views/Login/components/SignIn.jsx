import React, { useState } from 'react';

import { useStyles } from '../index'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

function SignIn({ showRegister, showRecoveryPassword }) {
    const classes = useStyles();

    const [ inputLogin, setInputLogin ] = useState({
      email: 'karlosagreda@hotmail.com',
      password: '123456',
    });

    const handleOnChangeLogin = (e) => {
      setInputLogin({ ...inputLogin, [e.target.name]: e.target.value });
    };

    const handleOnSubmitLogin = () => {
      if (inputLogin.email !== '' && inputLogin.password !== '') {
        dispatch(login(inputLogin.email, inputLogin.password));
      }
    };

    return (
        <Box>
          <Box className={classes.boxCenter}>
            <Typography className={classes.h1}>Inicio de sesion</Typography>
          </Box>
          <Box className={classes.boxCenter}>
            <TextField
              label="Correo electrónico"
              name="email"
              type="email"
              value={inputLogin.email}
              className={classes.textField}
              helperText={'helperText'}
              error={false}
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{
                className: classes.input,
              }}
              onChange={handleOnChangeLogin}
              margin="dense"
              variant="outlined"
            />
          </Box>
          <Box className={classes.boxCenter}>
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              value={inputLogin.password}
              className={classes.textField}
              helperText={'helperText'}
              error={false}
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{
                className: classes.input,
              }}
              onChange={handleOnChangeLogin}
              margin="dense"
              variant="outlined"
            />
          </Box>
          <Box className={classes.boxCenter}>
            <Button className={classes.button} onClick={handleOnSubmitLogin}>
              INGRESAR
            </Button>
          </Box>
          <Box className={classes.boxCenter}>
            <Typography className={classes.text}>
              ¿Primera ves en Dev Bubble?{' '}
              <a href="/" onClick={showRegister} className={classes.text2}>
                Crear una cuenta
              </a>
            </Typography>
            <Typography className={classes.text}>
              ¿Olvidaste Tu contraseña?{' '}
              <a
                href="/"
                onClick={showRecoveryPassword}
                className={classes.text2}
              >
                Recuperar mi contraseña!
              </a>
            </Typography>
          </Box>
        </Box>
    )
}

export default SignIn
