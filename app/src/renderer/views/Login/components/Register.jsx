import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useStyles } from '../index'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const initInput = {
    username: '',
    email: '',
    password: '',
}

function Register({ showLogin }) {
    const classes = useStyles()

    const [ inputRegister, setInputRegister ] = useState(initInput);

    const handleOnChangeRegister = (e) => {
      setInputRegister({
        ...inputRegister,
        [e.target.name]: e.target.value,
      });
    };

    const handleOnSubmitRegister = () => {};
    
    return (
        <Box>
          <Box className={classes.boxCenter}>
            <Typography className={classes.h1}>Registro de usuario</Typography>
          </Box>
          <Box className={classes.boxCenter}>
            <TextField
              label="Correo electrónico"
              name="email"
              type="email"
              value={inputRegister.email}
              className={classes.textField}
              // helperText={'helperText'}
              error={false}
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{
                className: classes.input,
              }}
              onChange={handleOnChangeRegister}
              margin="dense"
              variant="outlined"
            />
          </Box>
          <Box className={classes.boxCenter}>
            <TextField
              label="Usuario"
              name="username"
              type="text"
              value={inputRegister.username}
              className={classes.textField}
              // helperText={'helperText'}
              error={false}
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{
                className: classes.input,
              }}
              onChange={handleOnChangeRegister}
              margin="dense"
              variant="outlined"
            />
          </Box>
          <Box className={classes.boxCenter}>
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              value={inputRegister.password}
              className={classes.textField}
              // helperText={'helperText'}
              error={false}
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{
                className: classes.input,
              }}
              onChange={handleOnChangeRegister}
              margin="dense"
              variant="outlined"
            />
          </Box>
          <Box className={classes.boxCenter}>
            <Button className={classes.button} onClick={handleOnSubmitRegister}>
              registrase
            </Button>
          </Box>
          <Box className={classes.boxCenter}>
            <Typography className={classes.text}>
              ¿Ya tienes una Cuenta en Dev Bubble?{' '}
              <a href="/" onClick={showLogin} className={classes.text2}>
                Iniciar sesión
              </a>
            </Typography>
          </Box>
        </Box>
    )
}

export default Register
