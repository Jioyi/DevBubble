import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { login } from '../../redux/actions';
import imageLogin from './../../assets/images/login.png';

const useStyles = makeStyles((theme) => ({
	paper: {
		'backgroundColor': '#2f3136',
		'padding': theme.spacing(0),
		'margin': theme.spacing(0),
		'width': '100%',
		'height': '100%',
		'display': 'flex',
		'alignItems': 'center',
		'flexGrow': 1,
		'justifyContent': 'center',
		'flexDirection': 'column',
		'input': {
			color: '#8e9297',
			borderColor: '#8e9297',
		},
		'& label.Mui-focused': {
			color: '#8e9297',
			borderColor: '#8e9297',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#8e9297',
			color: '#8e9297',
			borderColor: '#8e9297',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				color: '#8e9297',
				borderColor: '#8e9297',
			},
			'&:hover fieldset': {
				color: '#8e9297',
				borderColor: '#8e9297',
			},
			'&.Mui-focused fieldset': {
				color: '#8e9297',
				borderColor: '#8e9297',
			},
		},
		'& .Mui-error': {
			color: '#8e9297',
		},
		'& .MuiFormHelperText-root': {
			color: '#8e9297',
		},
	},
	tittle: {
        margin: theme.spacing(2),
		textAlign: 'left',
		color: '#8e9297',
		fontSize: '1.4rem',
		fontWeight: 600,
	},
	span: {
		textAlign: 'left',
		color: '#8e9297',
		fontSize: '0.8rem',
		fontWeight: 600,
	},
	input: {
		fontSize: '0.8rem',
		color: '#8e9297',
		borderColor: '#8e9297',
	},
	textField: {
		color: '#fff',
		width: '40ch',
	},
	image: {
		'height': '200px',
		'width': '200px',
		'@media (max-height: 620px)': {
			display: 'none',
		},
	},
	button: {
		'margin': theme.spacing(1),
		'backgroundColor': '#5865f2',
		'color': '#ffffff',
		'fontWeight': 'bold',
		'borderRadius': 6,
		'padding': '6px 16px 6px 16px',
		'white-space': 'nowrap',
		'textTransform': 'none',
		'&:hover': {
			backgroundColor: '#4752c4',
			color: '#ffffff',
		},
	},
	boxCenter: {
		display: 'flex',
		alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'center',
		flexDirection: 'column',
	},
	text: {
		fontSize: '0.7rem',
		color: '#b9bbbe',
		margin: theme.spacing(0.2),
	},
	text2: {
		'fontSize': '0.7rem',
		'color': '#b9bbbe',
		'margin': theme.spacing(0.2),
		'textDecoration': 'none',
		'fontWeight': 600,
		'&:hover': {
			color: '#ffffff',
		},
	},
	h1: {
		fontSize: '1.0rem',
		fontWeight: 600,
		color: '#b9bbbe',
		margin: theme.spacing(0.2),
	},
}));

const Login = () => {
    const dispatch = useDispatch();
	const [stateAuth, setStateAuth] = useState('login');
	const [inputLogin, setInputLogin] = useState({
		email: '',
		password: '',
	});
	const [inputRegister, setInputRegister] = useState({
		username: '',
		email: '',
		password: '',
	});
	const [inputRecoveryPassword, setInputRecoveryPassword] = useState({
		email: '',
	});
	const classes = useStyles();

	const handleOnChangeLogin = (e) => {
		setInputLogin({ ...inputLogin, [e.target.name]: e.target.value });
	};

	const handleOnChangeRecoveryPassword = (e) => {
		setInputRecoveryPassword({
			...inputRecoveryPassword,
			[e.target.name]: e.target.value,
		});
	};

	const handleOnChangeRegister = (e) => {
		setInputRegister({
			...inputRegister,
			[e.target.name]: e.target.value,
		});
	};

	const handleOnSubmitLogin = () => {
        dispatch(login())
    };
	const handleOnSubmitRegister = () => {};
	const handleOnSubmitRecoveryPassword = () => {};

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
			<Typography className={classes.tittle}>
				Una única plataforma para tu equipo y tu trabajo
			</Typography>
			{stateAuth === 'login' ? (
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
			) : stateAuth === 'register' ? (
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
							helperText={'helperText'}
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
							helperText={'helperText'}
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
							helperText={'helperText'}
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
			) : (
				<Box>
					<Box className={classes.boxCenter}>
						<Typography className={classes.h1}>
							Recuperación de contraseña
						</Typography>
					</Box>
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
				</Box>
			)}
		</Paper>
	);
};

export default Login;
