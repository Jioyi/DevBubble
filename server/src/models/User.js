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
		},
		{ timestamps: true }
	);
};
