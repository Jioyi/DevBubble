import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

//icons
import Brightness1Icon from '@material-ui/icons/Brightness1';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
//actions
import { logOut, ChangeUserState } from '../../../redux/actions';
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	relative: {
		position: 'relative',
	},
	avatar: {
		marginLeft: '8px',
	},
	avatarStatus: {
		position: 'absolute',
		padding: theme.spacing(0),
		right: -10,
		bottom: -10,
	},
	userMenu: {
		backgroundColor: '#2f3136',
	},
	menuItem: {
		'backgroundColor': '#2f3136',
		'&:hover': {
			backgroundColor: '#40444b',
		},
	},
	menuItemSpan: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	menuItemTypography: {
		'textTransform': 'uppercase',
		'fontSize': '0.7rem',
		'color': '#747f8d',
		'fontWeight': 600,
		'&:hover': {
			color: '#ffffff',
		},
	},
	iconConnect: {
		height: '16px',
		width: '16px',
		color: '#3ba55d',
	},
	iconConnectStroke: {
		stroke: '#292b2f',
		strokeWidth: 4,
		height: '20px',
		width: '20px',
		color: '#3ba55d',
	},
	iconAbsent: {
		height: '16px',
		width: '16px',
		color: '#faa81a',
	},
	iconAbsentStroke: {
		stroke: '#292b2f',
		strokeWidth: 4,
		height: '20px',
		width: '20px',
		color: '#faa81a',
	},
	iconDoNotDisturb: {
		height: '16px',
		width: '16px',
		color: '#ed4245',
	},
	iconDoNotDisturbStroke: {
		stroke: '#292b2f',
		strokeWidth: 4,
		height: '20px',
		width: '20px',
		color: '#ed4245',
	},
	iconInvisible: {
		height: '16px',
		width: '16px',
		color: '#747f8d',
	},
	iconInvisibleStroke: {
		stroke: '#292b2f',
		strokeWidth: 4,
		height: '20px',
		width: '20px',
		color: '#747f8d',
	},
	iconExit: {
		'height': '16px',
		'width': '16px',
		'color': '#747f8d',
		'&:hover': {
			color: '#ffffff',
		},
	},
}));

const MenuUserState = ({ user, userState }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [open, setOpen] = useState(null);

	const handleUserMenuStateOpen = (event) => {
		setOpen(event.currentTarget);
	};

	const handleUserMenuStateClose = () => {
		setOpen(null);
	};

	const handleLogOut = () => {
		setOpen(null);
		dispatch(logOut());
	};

	const handleChangeUserState = (state) => {
		setOpen(null);
		dispatch(ChangeUserState(state));
	};

	return (
		<>
			<IconButton
				onClick={handleUserMenuStateOpen}
				aria-label="show-menu-user-state"
				aria-haspopup="true"
				color="inherit"
			>
				<div className={classes.relative}>
					<Avatar
						className={classes.avatar}
						alt="user-picture"
						src={`./avatar/${user.avatar}`}
					/>
					<div className={classes.avatarStatus}>
						{userState === 'connected' ? (
							<Brightness1Icon className={classes.iconConnectStroke} />
						) : userState === 'absent' ? (
							<Brightness1Icon className={classes.iconAbsentStroke} />
						) : userState === 'doNotDisturb' ? (
							<Brightness1Icon className={classes.iconDoNotDisturbStroke} />
						) : (
							<Brightness1Icon className={classes.iconInvisibleStroke} />
						)}
					</div>
				</div>
			</IconButton>
			<Menu
				classes={{ paper: classes.userMenu }}
				id="show-menu-user-state"
				anchorEl={open}
				keepMounted
				open={Boolean(open)}
				onClose={handleUserMenuStateClose}
			>
				<MenuItem
					className={classes.menuItem}
					onClick={() => handleChangeUserState('connected')}
				>
					<span
						color="inherit"
						aria-label="add"
						className={classes.menuItemSpan}
					>
						<Brightness1Icon className={classes.iconConnect} />
						&nbsp;
						<Typography color="inherit" className={classes.menuItemTypography}>
							Conectado
						</Typography>
					</span>
				</MenuItem>
				<MenuItem
					className={classes.menuItem}
					onClick={() => handleChangeUserState('absent')}
				>
					<span
						color="inherit"
						aria-label="add"
						className={classes.menuItemSpan}
					>
						<Brightness2Icon className={classes.iconAbsent} />
						&nbsp;
						<Typography color="inherit" className={classes.menuItemTypography}>
							Ausente
						</Typography>
					</span>
				</MenuItem>
				<MenuItem
					className={classes.menuItem}
					onClick={() => handleChangeUserState('doNotDisturb')}
				>
					<span
						color="inherit"
						aria-label="add"
						className={classes.menuItemSpan}
					>
						<RemoveCircleIcon className={classes.iconDoNotDisturb} />
						&nbsp;
						<Typography color="inherit" className={classes.menuItemTypography}>
							No molestar
						</Typography>
					</span>
				</MenuItem>
				<MenuItem
					className={classes.menuItem}
					onClick={() => handleChangeUserState('invisible')}
				>
					<span
						color="inherit"
						aria-label="add"
						className={classes.menuItemSpan}
					>
						<RadioButtonUncheckedIcon className={classes.iconInvisible} />
						&nbsp;
						<Typography color="inherit" className={classes.menuItemTypography}>
							Invisible
						</Typography>
					</span>
				</MenuItem>
				<MenuItem className={classes.menuItem} onClick={handleLogOut}>
					<span
						color="inherit"
						aria-label="add"
						className={classes.menuItemSpan}
					>
						<ExitToAppIcon className={classes.iconExit} />
						&nbsp;
						<Typography color="inherit" className={classes.menuItemTypography}>
							Cerrar sesión
						</Typography>
					</span>
				</MenuItem>
			</Menu>
		</>
	);
};

export default MenuUserState;
