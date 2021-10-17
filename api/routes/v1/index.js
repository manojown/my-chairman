const express = require("express");
const  { validateUser } = require("../../middlewares");

const router = express.Router();

const userRoute = require("../v1/users.routes");


const forceUpdateVersion = "1.0.10";

const { emailServiceStatus, mongoDBStatus } = require("../../services");

router.get("/status", async (req, res) => {
	const mailServerStatus = await emailServiceStatus();
	const mongoDBStatusMessage = mongoDBStatus();
	return res.status(200).send({
		version: process.env.VERSION,
		mongo: mongoDBStatusMessage,
		mailService: mailServerStatus,
	});
});

router.get("/version", async (req, res) => {
	return res.status(200).json({ message: "Force update version", version: forceUpdateVersion });
});

router.use("/users", userRoute);





module.exports = router;
