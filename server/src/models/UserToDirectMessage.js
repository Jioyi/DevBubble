const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'UserToDirectMessage',
		{
			ID: {
				type: DataTypes.UUID,
				primaryKey: true,
				unique: true,
			},
		},
		{ timestamps: true }
	);
};
