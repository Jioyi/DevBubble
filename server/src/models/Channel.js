const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Channel',
		{
			ID: {
				type: DataTypes.UUID,
				primaryKey: true,
				unique: true,
			},
			name: {
				type: DataTypes.STRING,
			},
			type: {
				type: DataTypes.ENUM,
				values: ['text', 'voice'],
				defaultValue: 'text',
			},
		},
		{ timestamps: true }
	);
};