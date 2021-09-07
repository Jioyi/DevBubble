const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'User',
		{
			ID: {
				type: DataTypes.UUID,
				primaryKey: true,
				unique: true,
			},
			username: {
				type: DataTypes.STRING,
			},
			email: {
				type: DataTypes.STRING,
			},
			password: {
				type: DataTypes.STRING,
			},
			avatar: {
				type: DataTypes.STRING,
				defaultValue: 'avatar.gif',
			},
			connected: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			state: {
				type: DataTypes.ENUM,
				values: ['connected', 'absent', 'doNotDisturb', 'invisible'],
				defaultValue: 'connected',
			},
		},
		{ timestamps: true }
	);
};
