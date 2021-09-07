const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'DirectMessage',
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
