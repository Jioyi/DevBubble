import React, { useState } from 'react';

import { signup } from '../../../redux/API/index'

import { makeStyles } from '@material-ui/core/styles';
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


const initInput = {
    username: '',
    email: '',
    password: '',
}

const localStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem'
  }
})

function Register({ showLogin }) {  
    const classes = {
      ...useStyles(),
      ...localStyles()
    }

    const [ inputRegister, setInputRegister ] = useState(initInput);

    const handleOnChangeRegister = (e) => {
      setInputRegister({
        ...inputRegister,
        [e.target.name]: e.target.value,
      });
    };

    const handleOnSubmitRegister = async (e) => {
      e.preventDefault()
      try{
        const newUser = await signup(inputRegister);
        alert(`User ${newUser.data.username} created!`);
      } catch (err) {
        alert('User not created. Please try again.');
      }
    };
    
    return (
        <FormGroup >
          <FormLabel className={classes.boxCenter}>
            <Typography className={classes.h1}>Registro de usuario</Typography>
          </FormLabel>
          <form
            className={classes.form}
            onSubmit={handleOnSubmitRegister}
          >
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

            <Button 
              className={classes.button}
              type='submit'
            >
              Register
            </Button>

          </form>
          
          <FormHelperText>
            <Typography className={classes.text}>
              ¿Ya tienes una Cuenta en Dev Bubble?{' '}
              <a href="/" onClick={showLogin} className={classes.text2}>
                Iniciar sesión
              </a>
            </Typography>
          </FormHelperText>
              
        </FormGroup>
    )
}

export default Register
