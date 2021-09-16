const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Message',
		{
			ID: {
				type: DataTypes.UUID,
				primaryKey: true,
				unique: true,
			},
			content: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{ timestamps: true }
	);
};
