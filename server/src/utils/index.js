const organizeUser = (user) => {
	let groups = [];
	if (user.groups !== null) {
		for (let i in user.groups) {
			groups.push(user.groups[i]);
		}
	}
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
