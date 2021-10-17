const { Users } = require("../models");
const { validateToken } = require("../utils");

const validateUser = async (req, res, next) => {
	try {
		const authHeader = req.headers["authorization"];
		let authToken = authHeader && authHeader.split(" ")[1];
		console.log("authorization",authToken)
		if (!authToken) {
			return res.status(401).send({ status: false, message: "No token provided." });
		}
		const tokenData = await validateToken(authToken);
		console.log("tokenData",tokenData)
		let user = await Users.findOne({ email: tokenData.email }).select("+password").lean();

		if (user && user.email) {
			req.user = user;
			next();
		} else {
			return res.status(400).send({ status: false, message: "User Not Found." });
		}
	} catch (error) {
		console.log(error);
		if (error.name == "JsonWebTokenError" || error.name == "NotBeforeError" || error.name == "TokenExpiredError") {
			return res.status(400).send({ status: false, message: "Invalid Token" });
		} else {
			return res.status(401).send({ status: false, message: "User is not authenticated" });
		}
	}
};



module.exports = { validateUser };
