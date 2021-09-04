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
models.push(require('./models/Group'));
models.push(require('./models/Channel'));
models.forEach((model) => model(sequelize));

const { User, Group, Channel } = sequelize.models;

//relacion user a grupos como creador del grupo
//un usuario puede ser creador de muchos grupos
//pero el grupo solo le pertenece a ese usuario
User.hasMany(Group, { as: 'owner', foreignKey: 'ownerID' });
Group.belongsTo(User, { as: 'owner', foreignKey: 'ownerID' });

//relacion user a grupo muchos a muchos como miembro del grupo
//un usuario puede pertenecer a muchos grupos
//y a un grupo pueden pertenecer muchos usuarios
User.belongsToMany(Group, { as: 'groups', through: 'UserGroup' });
Group.belongsToMany(User, { as: 'users', through: 'UserGroup' });

//realacion Group a Channels
//un groupo puede tener muchos canales
//pero el canal solo le pertenece a ese grupo
Group.hasMany(Channel, { as: 'channels', foreignKey: 'GroupID' });
Channel.belongsTo(Group, { as: 'channels', foreignKey: 'GroupID' });

module.exports = {
	...sequelize.models,
	conn: sequelize,
};
