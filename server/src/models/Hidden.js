const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Hidden',
		{
			ID: {
				type: DataTypes.UUID,
				primaryKey: true,
				unique: true,
			},
			DirectMessageID: {
				type: DataTypes.UUID,
			},
		},
		{ timestamps: false }
	);
};