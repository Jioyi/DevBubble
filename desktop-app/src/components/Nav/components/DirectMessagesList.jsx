import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
//icons
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	list: {
		width: '100%',
	},
	listItem: {
		'&:hover': {
			cursor: 'pointer',
			backgroundColor: '#32353a',
		},
	},
	listItemIcon: {
		'margin': '2px',
		'padding': '4px',
		'color': '#747f8d',
		'&:hover': {
			color: '#ffffff',
		},
	},
	listItemText: {
		'textTransform': 'uppercase',
		'fontSize': '0.7rem',
		'color': '#747f8d',
		'fontWeight': 'bold',
		'&:hover': {
			color: '#ffffff',
		},
	},
}));

const DirectMessagesList = () => {
	const classes = useStyles();
	const [open, setOpen] = useState(true);

	const handleOpen = () => {
		setOpen(!open);
	};

	return (
		<div className={classes.root}>
			<List component="div" disablePadding className={classes.list}>
				<ListItem onClick={handleOpen} className={classes.listItem}>
					{open ? (
						<ExpandLess className={classes.listItemIcon} />
					) : (
						<ExpandMore className={classes.listItemIcon} />
					)}
					<ListItemText
						classes={{ primary: classes.listItemText }}
						primary="Mensajes directos"
					/>
				</ListItem>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<ListItem className={classes.listItem} component="div" disablePadding>
						ss
					</ListItem>
					{/*textChannels.map((channel) => {
						return (
							<List
								className={classes.subList}
								key={channel.ID}
								component="div"
								disablePadding
							>
								<ListItem>
									<TextFieldsIcon className={classes.listItemIconChannel} />
									<ListItemText
										classes={{ primary: classes.listItemTextChannel }}
										primary={channel.name}
									/>
								</ListItem>
								<TextTooltip title="Editar canal" placement="top">
									<IconButton color="inherit" className={classes.iconButton}>
										<SettingsIcon className={classes.listItemIconChannel} />
									</IconButton>
								</TextTooltip>
							</List>
						);
					})*/}
				</Collapse>
			</List>
		</div>
	);
};

export default DirectMessagesList;
