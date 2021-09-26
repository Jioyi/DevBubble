const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'SocialNetwork',
		{
			ID: {
				type: DataTypes.UUID,
				primaryKey: true,
				unique: true,
			},
			link: {
				type: DataTypes.STRING,
			},
		},
		{ timestamps: false }
	);
};
