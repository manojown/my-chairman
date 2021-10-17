/**
 * Schema definition for Users
 */
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		first_name: {
			type: String,
			trim: true,
		},
		last_name: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			unique: true,
		},
		password: {
			type: String,
			select: false,
		},
		is_verified: {
			type: Boolean,
			default: false,
		},
		accessToken: {
			type: String,
		},
		deviceToken: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

/**
 * @model Users
 */
module.exports = mongoose.model("users", UserSchema);
