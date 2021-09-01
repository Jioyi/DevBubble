const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Group',
		{
			ID: {
				type: DataTypes.UUID,
				primaryKey: true,
				unique: true,
			},
			name: {
				type: DataTypes.STRING,
			},
			image: {
				type: DataTypes.STRING,
			},
		},
		{ timestamps: true }
	);
};