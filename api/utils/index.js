const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");



const parseJWTError = (error) => {
	let errorMessage = error.message;
	let message = "Invalid Token.";
	switch (error.name) {
		case "JsonWebTokenError":
			if (["invalid token", "jwt malformed", "invalid signature"].indexOf(errorMessage) != -1) {
				message = "Invalid Token.";
			}
			break;
		default: {
			message = "Invalid Token.";
			break;
		}
	}
	return message;
};

const createToken = (payload) => {
	return new Promise((resolve, reject) => {
		jwt.sign(
			{
				...payload,
			},
			JWT_SECRET,
			(err, token) => {
				if (err) {
					return reject(err);
				}
				console.log("-================", token);
				return resolve(token);
			}
		);
	});
};

const validateToken = (authToken) => {
	return new Promise((resolve, reject) => {
		jwt.verify(authToken, JWT_SECRET, function (err, decoded) {
			if (err) {
				return reject(err);
			}
			return resolve(decoded);
		});
	});
};

module.exports = {
	createToken,
	validateToken,
	parseJWTError,
};
