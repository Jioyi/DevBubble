import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

//icons
import CloseIcon from '@material-ui/icons/Close';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
//actions
import { createGroup } from '../../../redux/actions';

const DialogDeleteStyle = withStyles({
	paper: {
		backgroundColor: '#ffffff',
		color: '#000000',
	},
})(Dialog);

const useStyles = makeStyles((theme) => ({
	dialog: {
		padding: theme.spacing(0),
		margin: theme.spacing(0),
		display: 'flex',
		flexDirection: 'row-reverse',
		backgroundColor: '#f6f6f7',
	},
	dialogActions: {
		backgroundColor: '#f6f6f7',
	},
	center: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
	centerInput: {
		'paddingLeft': theme.spacing(6),
		'paddingRight': theme.spacing(6),
		'display': 'flex',
		'alignItems': 'center',
		'justifyContent': 'center',
		'input': {
			color: '#8e9297',
			borderColor: '#8e9297',
		},
		'& label.Mui-focused': {
			color: '#5865f2',
			borderColor: '#8e9297',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#8e9297',
			color: '#5865f2',
			borderColor: '#8e9297',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				color: '#5865f2',
				borderColor: '#8e9297',
			},
			'&:hover fieldset': {
				color: '#5865f2',
				borderColor: '#8e9297',
			},
			'&.Mui-focused fieldset': {
				color: '#5865f2',
				borderColor: '#5865f2',
			},
		},
		'& .Mui-error': {
			color: '#8e9297',
		},
		'& .MuiFormHelperText-root': {
			color: '#5865f2',
		},
	},
	button: {
		'fontSize': '1.0rem',
		'backgroundColor': '#4f545c',
		'color': '#ffffff',
		'borderRadius': 4,
		'padding': '2px 16px 2px 16px',
		'white-space': 'nowrap',
		'textTransform': 'none',
		'&:hover': {
			backgroundColor: '#5d6269',
			color: '#ffffff',
		},
	},
	buttonCreate: {
		'fontSize': '1.0rem',
		'backgroundColor': '#5865f2',
		'color': '#ffffff',
		'borderRadius': 4,
		'padding': '2px 16px 2px 16px',
		'white-space': 'nowrap',
		'textTransform': 'none',
		'&:hover': {
			backgroundColor: '#4752c4',
			color: '#ffffff',
		},
	},
	tittle: {
		color: '#000000',
		fontSize: '1.4rem',
		fontWeight: 'bold',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '5px',
	},
	text: {
		padding: '5px',
		color: '#848990',
		fontWeight: 'bold',
		fontSize: '0.9rem',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonCancel: {
		'padding': '0px',
		'margin': '6px',
		'&:hover': {
			backgroundColor: '#32353a',
		},
	},
	iconCancel: {
		'margin': '6px',
		'color': '#747f8d',
		'&:hover': {
			color: '#ffffff',
		},
	},
	maxWidth: {
		flexGrow: 1,
	},
	divider: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(2),
	},
	back: {
		'padding': '5px',
		'color': '#848990',
		'fontSize': '0.9rem',
		'display': 'flex',
		'alignItems': 'center',
		'justifyContent': 'center',
		'&:hover': {
			color: '#000000',
		},
		'cursor': 'pointer',
	},
	inputHide: {
		display: 'none',
	},
	centerPhoto: {
		padding: '10px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonPhoto: {
		'padding': theme.spacing(0),
		'margin': theme.spacing(0),
		'border': '2px dashed #5865f2',
		'&:hover': {
			border: '2px dashed #4752c4',
			backgroundColor: 'rgba(88, 101, 242, 0.2)',
		},
	},
	iconPhoto: {
		'margin': '30px',
		'color': '#5865f2',
		'&:hover': {
			color: '#4752c4',
		},
	},
	previewImage: {
		height: '84px',
		width: '84px',
		padding: theme.spacing(0),
		margin: theme.spacing(0),
	},
	input: {
		fontWeight: 'bold',
		padding: theme.spacing(0),
		width: '100%',
		marginTop: '6px',
		marginBottom: '0px',
		fontSize: '0.8rem',
		color: '#5865f2',
		borderColor: '#8e9297',
	},
}));

const DialogCreateOrAddGroup = ({ open, onCancel }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [state, setState] = useState('createOrAdd');
	const [name, setName] = useState('');
	const [selectedFile, setSelectedFile] = useState(null);
	const [previewImage, setPreviewImage] = useState(null);

	const handleOnConfirmCreate = () => {
		if (selectedFile && name !== '') {
			dispatch(createGroup(selectedFile, name));
			setState('createOrAdd');
			setPreviewImage(null);
			setSelectedFile(null);
			setName('');
		}
	};

	const handleOnChangeName = (e) => {
		setName(e.target.value);
	};

	const handleOnConfirmAdd = () => {
		//AddGroup
	};

	const handleOnCancel = () => {
		onCancel();
		setState('createOrAdd');
		setPreviewImage(null);
		setSelectedFile(null);
	};

	const handleOnState = (state) => {
		setState(state);
	};

	const onFileChange = (event) => {
		if (event.target.files[0]) {
			setSelectedFile(event.target.files[0]);
			setPreviewImage(URL.createObjectURL(event.target.files[0]));
		}
	};

	return (
		<div>
			<DialogDeleteStyle
				open={open === undefined ? false : open}
				aria-labelledby={'dialog-add-group'}
			>
				<DialogTitle id={'dialog-add-group'} className={classes.dialog}>
					<IconButton className={classes.buttonCancel} onClick={handleOnCancel}>
						<CloseIcon className={classes.iconCancel} />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{state === 'createOrAdd' && (
							<>
								<Typography className={classes.tittle}>
									Crea un servidor
								</Typography>
								<Typography className={classes.text}>
									Tu servidor es donde te reunes con tu grupo de trabajo. Crea
									el tullo y comienza a compartir.
								</Typography>
								<div className={classes.center}>
									<Button
										onClick={() => {
											handleOnState('create');
										}}
										className={classes.buttonCreate}
									>
										Crear un servidor
									</Button>
								</div>
								<Divider variant="middle" className={classes.divider} />
								<Typography className={classes.tittle}>
									¿Ya tienes una invitacion?
								</Typography>
								<div className={classes.center}>
									<Button
										onClick={() => {
											handleOnState('add');
										}}
										className={classes.button}
									>
										Únete a un servidor
									</Button>
								</div>
							</>
						)}
						{state === 'create' && (
							<>
								<Typography className={classes.tittle}>
									Personaliza tu servidor
								</Typography>
								<Typography className={classes.text}>
									Dale una personalidad propia a tu nuevo servidor con un nombre
									y un icono. Siempre puedes cambiarlo más tarde.
								</Typography>
								<div className={classes.center}>
									<input
										accept="image/*"
										className={classes.inputHide}
										style={{ display: 'none' }}
										id="raised-button-file"
										multiple
										type="file"
										onChange={onFileChange}
									/>
									{selectedFile === null ? (
										<label
											htmlFor="raised-button-file"
											className={classes.centerPhoto}
										>
											<IconButton
												component="span"
												color="inherit"
												className={classes.buttonPhoto}
											>
												<PhotoCameraIcon className={classes.iconPhoto} />
											</IconButton>
										</label>
									) : (
										<label
											htmlFor="raised-button-file"
											className={classes.centerPhoto}
										>
											<IconButton
												component="span"
												color="inherit"
												className={classes.buttonPhoto}
											>
												{selectedFile && (
													<Avatar
														alt="previewImage"
														src={previewImage}
														className={classes.previewImage}
													/>
												)}
											</IconButton>
										</label>
									)}
								</div>
								<div className={classes.centerInput}>
									<TextField
										className={classes.input}
										label="Nombre"
										type="text"
										autoComplete="current-password"
										variant="outlined"
										value={name}
										onChange={handleOnChangeName}
										InputProps={{
											className: classes.input,
										}}
										InputLabelProps={{
											className: classes.input,
										}}
									/>
								</div>
								<div className={classes.center}>
									<Typography className={classes.text}>
										Al crear un servidor aceptas las Directivas de la comunidad.
									</Typography>
								</div>
							</>
						)}
					</DialogContentText>
				</DialogContent>
				<DialogActions className={classes.dialogActions}>
					{state === 'create' && (
						<>
							<Typography
								className={classes.back}
								onClick={() => {
									handleOnState('createOrAdd');
								}}
							>
								Atrás
							</Typography>
							<div className={classes.maxWidth}></div>
							<Button
								onClick={handleOnConfirmCreate}
								className={classes.buttonCreate}
							>
								Crear
							</Button>
						</>
					)}
					{state === 'add' && (
						<>
							<Typography
								className={classes.back}
								onClick={() => {
									handleOnState('createOrAdd');
								}}
							>
								Atrás
							</Typography>
							<div className={classes.maxWidth}></div>
							<Button
								onClick={handleOnConfirmAdd}
								className={classes.buttonCreate}
							>
								Unirse al servidor
							</Button>
						</>
					)}
				</DialogActions>
			</DialogDeleteStyle>
		</div>
	);
};
export default DialogCreateOrAddGroup;
