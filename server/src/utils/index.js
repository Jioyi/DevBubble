const organizeUser = (user) => {
	let groups = [];
	if (user.groups !== null) {
		for (let i in user.groups) {
			groups.push(user.groups[i]);
		}
	}
	/*let roles = [];
	let permissions = [];
	if (user.roles !== null) {
		for (let i in user.roles) {
			roles.push(user.roles[i].name);
			if (user.roles[i].permissions !== null) {
				for (let f in user.roles[i].permissions) {
					if (!permissions.includes(user.roles[i].permissions[f].name)) {
						permissions.push(user.roles[i].permissions[f].name);
					}
				}
			}
		}
	}*/
	return {
		ID: user.ID,
		email: user.email,
		avatar: user.avatar,
		connected: user.connected,
		groups: groups,
	};
};

module.exports = {
	organizeUser,
};
