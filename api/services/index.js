// const logger = require('../../config/logger');


const mongoose = require("mongoose");



const mongoDBStatus = () => {
	const mongoState = mongoose.connection.readyState;
	let mongoStatusMessage = "Getting MongoDB Status";
	if (mongoState == 0) {
		mongoStatusMessage = "MongoDB is not connected.";
	} else if (mongoState == 1) {
		mongoStatusMessage = "MongoDB is connected.";
	} else if (mongoState == 2) {
		mongoStatusMessage = "MongoDB is connecting.";
	} 
	return mongoStatusMessage;
};

module.exports = {
	mongoDBStatus,
};
