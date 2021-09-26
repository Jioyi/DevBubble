import React, { useState } from 'react'

import { useStyles } from '../index'
import {
    Paper, 
    Typography,
    CardMedia, 
    Input,
    Box, 
    Button,
    FormLabel,
    FormGroup,
    FormControl,
    FormHelperText,
    TextField
  } from '@material-ui/core';

export default function Recovery({ showLogin, showRegister }) {
    const classes = useStyles();

    const [ inputRecoveryPassword, setInputRecoveryPassword ] = useState({
        email: '',
    });

    const handleOnChangeRecoveryPassword = (e) => {
        setInputRecoveryPassword({
            ...inputRecoveryPassword,
            [e.target.name]: e.target.value,
        });
    };
    const handleOnSubmitRecoveryPassword = () => {};

    return (
        <FormGroup>
          <FormLabel className={classes.FormLabelCenter}>
            <Typography className={classes.h1}>
              Recuperación de contraseña
            </Typography>
          </FormLabel>
          <Box className={classes.boxCenter}>
            <TextField
              label="Correo electrónico"
              name="email"
              value={inputRecoveryPassword.email}
              className={classes.textField}
              helperText={'helperText'}
              error={false}
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{
                className: classes.input,
              }}
              onChange={handleOnChangeRecoveryPassword}
              margin="dense"
              variant="outlined"
            />
          </Box>
          <Box className={classes.boxCenter}>
            <Button
              className={classes.button}
              onClick={handleOnSubmitRecoveryPassword}
            >
              recuperar
            </Button>
          </Box>
          <Box className={classes.boxCenter}>
            <Typography className={classes.text}>
              ¿No nesecitas recuperar tu contraseña?{' '}
              <a href="/" onClick={showLogin} className={classes.text2}>
                Iniciar sesión
              </a>
            </Typography>
            <Typography className={classes.text}>
              ¿Primera ves en Dev bubble?{' '}
              <a href="/" onClick={showRegister} className={classes.text2}>
                Crear una cuenta
              </a>
            </Typography>
          </Box>
        </FormGroup>
    )
}
