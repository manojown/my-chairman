const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const { Users } = require("../models");
const APIError = require("../utils/APIError");
const { createToken, validateToken } = require("../utils");
const logger = require("../../config/logger");
const { loginValidation } = require("../validations/users.validation");

const { saveUserDetails } = require("../services/user.service");

const login = async (req, res, next) => {
	let { email, password } = req.body;
	const filterUser = {
		email,
	};
	try {
		let resp = loginValidation(req.body);
		if (resp.error) {
			logger.info("User login error: " + resp.error);
			throw new APIError({
				message: resp.error.stack,
				status: 400,
				errCode: "validation_error",
			});
		}
		email = email.trim();
		password = password.trim();
		let user = await Users.findOne(filterUser).select("+password");
		if (!user) {
			throw new APIError({
				message: "Sorry, You are not registered with us, Please Sign Up.",
				status: 400,
				errCode: "email_not_registered",
			});
		}

		let userData = await bcrypt.compare(password, user.password);
		//if both match than you can do anything
		if (userData) {
			await user.save();
			user = user.toObject();
			delete user.password;
			let jwtAuthToken = await createToken({email:user.email, walletAddress:user.walletAddress});
			return res.status(httpStatus.OK).send({
				message: "Login Success.",
				token: jwtAuthToken,
				user: user,
				success: true,
			});
		} else {
			throw new APIError({
				message: "Email/Password is wrong",
				errCode: "invalid_creds",
				status: 400,
			});
		}
	} catch (err) {
		next(err);
	}
};

const registerUser = async (req, res, next) => {
	console.log(" req.body;", req.body)
	let { email, password, first_name, last_name } = req.body;
	email = email.trim();
	password = password.trim();
	first_name = first_name.trim();
	last_name = last_name.trim();
	try {
		let user = await Users.findOne({
			email,
		});

		// check whether user is already registered or not.
		if (user && user.email) {
			throw new APIError({
				message: "User already registered, Please Sign In",
				errCode: "email_exist",
				status: 400,
			});
		} else {
			const userResp = await saveUserDetails({
				email,
				password,
				first_name,
				last_name,
			});
			delete userResp.password;
			return res.status(httpStatus.CREATED).send({
				success: true,
				message: "You have been successfully registered, please verify and proceed.",
				user: userResp,
			});
		}
	} catch (err) {
		throw next(err);
	}
};

const verifyToken = async (req, res) => {
	let { token } = req.query;
	let data = await validateToken(token);
	if (data) {
		return res.status(200).send({
			message: "successfully verified.",
			token: token,
			user: data,
		});
	} else {
		return res.send({
			message: "Something went wrong.",
			token: token,
			user: null,
		});
	}
};

const allUsers = async (req, res, next) => {
	try {
		const users = await Users.find().select("-password");
		return res.send({
			message: "All users list",
			data: users,
		});
	} catch (err) {
		next(err);
	}
};

module.exports = {
	registerUser,
	login,
	allUsers,
	verifyToken,
};
