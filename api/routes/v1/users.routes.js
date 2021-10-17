const express = require("express");
const router = express.Router();
const { registerUser, login, verifyToken } = require("../../controllers/users.controller.js");




router.post("/register", registerUser);

router.post("/login", login);
router.get("/verifyToken", verifyToken);


module.exports = router;
