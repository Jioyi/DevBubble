import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
//icons
import EditIcon from '@material-ui/icons/Edit';
import { AuthContext } from 'renderer/contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
	icon: {
		'color': '#747f8d',
		'&:hover': {
			color: '#ffffff',
		},
	},
	iconButton: {
		'&:hover': {
			backgroundColor: '#32353a',
		},
	},
}));

const PanelEditGroup = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [group, setGroup] = useState(null);
	const { user } = useContext(AuthContext);
	const { groups, groupSelectedID } = useSelector((state) => state.group);

	useEffect(() => {
		setGroup(groups.find((group) => group.ID === groupSelectedID));
	}, [groupSelectedID, groups]);

	return (
		<>
			{group?.ownerID === user.ID && (
				<ListItem>
					<ListItemText primary="Editar Grupo" />
					<ListItemIcon>
						<EditIcon />
					</ListItemIcon>
				</ListItem>
			)}
		</>
	);
};
export default PanelEditGroup;
