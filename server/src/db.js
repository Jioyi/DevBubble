const { Sequelize } = require('sequelize');
const {
	SERVER_DB_USER,
	SERVER_DB_PASS,
	SERVER_DB_HOST,
	SERVER_DB_PORT,
	SERVER_DB_NAME,
} = process.env;

let sequelize;

const DATABASE_URL = process.env.DATABASE_URL;

if (DATABASE_URL) {
	sequelize = new Sequelize(DATABASE_URL, {
		logging: false,
		dialect: 'postgres',
		protocol: 'postgres',
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	});
} else {
	sequelize = new Sequelize(
		`postgres://${SERVER_DB_USER}:${SERVER_DB_PASS}@${SERVER_DB_HOST}:${SERVER_DB_PORT}/${SERVER_DB_NAME}`,
		{
			logging: false, // set to console.log to see the raw SQL queries
			native: false, // lets Sequelize know we can use pg-native for ~30% more speed
		}
	);
}

const models = [];
models.push(require('./models/User'));
models.push(require('./models/Group'));
models.push(require('./models/Channel'));
models.push(require('./models/DirectMessage'));
models.push(require('./models/Message'));
models.push(require('./models/SocialNetwork'));
models.push(require('./models/Hidden'));

models.forEach((model) => model(sequelize));

const { User, Group, Channel, DirectMessage, Message, SocialNetwork, Hidden } =
	sequelize.models;

//relacion user a grupos como creador del grupo
//un usuario puede ser creador de muchos grupos
//pero el grupo solo le pertenece a ese usuario
User.hasMany(Group, { as: 'owner', foreignKey: 'ownerID' });
Group.belongsTo(User, { as: 'owner', foreignKey: 'ownerID' });

//relacion user a SocialNetwork como creador de un enlace a red social
//un usuario puede ser creador de muchos link
//pero el link solo le pertenece a ese usuario
User.hasMany(SocialNetwork, { as: 'social_networks', foreignKey: 'UserID' });
SocialNetwork.belongsTo(User, { as: 'social_networks', foreignKey: 'UserID' });

//relacion user a grupo muchos a muchos como miembro del grupo
//un usuario puede pertenecer a muchos grupos
//y a un grupo pueden pertenecer muchos usuarios
User.belongsToMany(Group, { as: 'groups', through: 'UserGroup' });
Group.belongsToMany(User, { as: 'users', through: 'UserGroup' });

//realacion User a HiddenList
User.hasMany(Hidden, { as: 'hidden_list', foreignKey: 'UserID' });
Hidden.belongsTo(User, { as: 'hidden_list', foreignKey: 'UserID' });

//realacion Group a Channels
//un groupo puede tener muchos canales
//pero el canal solo le pertenece a ese grupo
Group.hasMany(Channel, { as: 'channels', foreignKey: 'GroupID' });
Channel.belongsTo(Group, { as: 'channels', foreignKey: 'GroupID' });

//DirectMessage
User.belongsToMany(DirectMessage, {
	as: 'direct_messages',
	through: 'UserDirectMessage',
	foreignKey: 'UserID',
	otherKey: 'DirectMessageID',
});

DirectMessage.belongsToMany(User, {
	as: 'users',
	through: 'UserDirectMessage',
	foreignKey: 'DirectMessageID',
	otherKey: 'UserID',
});

DirectMessage.hasMany(Message, {
	as: 'messages',
	foreignKey: 'DirectMessageID',
});
Message.belongsTo(DirectMessage, {
	as: 'messages',
	foreignKey: 'DirectMessageID',
});

User.hasMany(Message, { as: 'user', foreignKey: 'UserID' });
Message.belongsTo(User, { as: 'user', foreignKey: 'UserID' });

module.exports = {
	...sequelize.models,
	conn: sequelize,
};
