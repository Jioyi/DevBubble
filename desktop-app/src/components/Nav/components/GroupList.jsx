import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
//icons
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
//actions
import { selectGroup } from '../../../redux/actions';
const SERVER_API_URL = 'http://localhost:3001'; //cambiar por varialbe de entorno

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: '#848990',
		paddingLeft: '10px',
		fontSize: '0.9rem',
		fontWeight: 'bold',
	},
	icon: {
		'margin': '6px',
		'color': '#747f8d',
		'&:hover': {
			color: '#ffffff',
		},
	},
	iconButton: {
		'padding': theme.spacing(0),
		'margin': '6px',
		'&:hover': {
			backgroundColor: '#32353a',
		},
	},
	menu: {
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
		'fontSize': '0.9rem',
		'color': '#747f8d',
		'fontWeight': 600,
		'&:hover': {
			color: '#ffffff',
		},
	},
	menuItemImage: {
		margin: '4px',
		marginRight: '20px',
	},
	selectedGroupImage: {
		margin: '10px',
		marginRight: '20px',
		marginLeft: '20px',
	},
}));
const GroupList = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [group, setGroup] = useState(null);
	const [open, setOpen] = useState(null);
	const { groups, groupSelected } = useSelector((state) => state.group);

	const handleMenuGroupsOpen = (event) => {
		setOpen(event.currentTarget);
	};

	const handleMenuGroupsClose = () => {
		setOpen(null);
	};

	const handleSelectGroup = (ID) => {
		dispatch(selectGroup(ID));
		setOpen(null);
	};

	useEffect(() => {
		setGroup(groups.find((group) => group.ID === groupSelected));
	}, [groupSelected, groups]);

	return (
		<div className={classes.root}>
			{group ? (
				<span color="inherit" aria-label="add" className={classes.menuItemSpan}>
					<Avatar
						variant="rounded"
						className={classes.selectedGroupImage}
						alt="group-selected-image"
						src={`${SERVER_API_URL}/images/${group.image}`}
					/>
					<Typography color="inherit" className={classes.menuItemTypography}>
						{group.name}
					</Typography>
				</span>
			) : groups.length > 0 ? (
				<Typography className={classes.text}>Seleciona un Servidor</Typography>
			) : (
				<Typography className={classes.text}>Unete a un Servidor</Typography>
			)}
			{groups.length > 0 && (
				<>
					<IconButton
						onClick={handleMenuGroupsOpen}
						aria-label="show-menu-select-group"
						aria-haspopup="true"
						color="inherit"
						className={classes.iconButton}
					>
						<KeyboardArrowDownIcon className={classes.icon} />
					</IconButton>
					<Menu
						classes={{ paper: classes.menu }}
						id="show-menu-select-group"
						anchorEl={open}
						keepMounted
						open={Boolean(open)}
						onClose={handleMenuGroupsClose}
					>
						{groups.map((group) => {
							return (
								<MenuItem
									key={group.ID}
									className={classes.menuItem}
									onClick={() => {
										handleSelectGroup(group.ID);
									}}
								>
									<span
										color="inherit"
										aria-label="add"
										className={classes.menuItemSpan}
									>
										<Avatar
											variant="rounded"
											className={classes.menuItemImage}
											alt="group-image"
											src={`${SERVER_API_URL}/images/${group.image}`}
										/>
										<Typography
											color="inherit"
											className={classes.menuItemTypography}
										>
											{group.name}
										</Typography>
									</span>
								</MenuItem>
							);
						})}
					</Menu>
				</>
			)}
		</div>
	);
};

export default GroupList;
