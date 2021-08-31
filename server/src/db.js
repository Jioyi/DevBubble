const { Sequelize } = require('sequelize');
const {
	SERVER_DB_USER,
	SERVER_DB_PASS,
	SERVER_DB_HOST,
	SERVER_DB_PORT,
	SERVER_DB_NAME,
} = process.env;

const sequelize = new Sequelize(
	`postgres://${SERVER_DB_USER}:${SERVER_DB_PASS}@${SERVER_DB_HOST}:${SERVER_DB_PORT}/${SERVER_DB_NAME}`,
	{
		logging: false,
		native: false,
	}
);

const models = [];
models.push(require('./models/User'));
models.forEach((model) => model(sequelize));

const { User } = sequelize.models;

module.exports = {
	...sequelize.models,
	conn: sequelize,
};
