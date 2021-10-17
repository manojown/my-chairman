const { BCRYPT_SALT } = process.env;
const bcrypt = require("bcrypt");
const { Users } = require("../models");
const saveUserDetails = async (user) => {
	let salt = await bcrypt.genSalt(Number(BCRYPT_SALT));
	let hashedPassword = await bcrypt.hash(user.password, salt);
	let newUser = new Users({
		...user,
		password: hashedPassword,
	});
	let userResp = await newUser.save();
	return userResp;
};

module.exports = { saveUserDetails };
