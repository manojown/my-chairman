"use strict";
// const { port, env } = require("./config/vars");
// const serverless = require('serverless-http');
const logger = require("./config/logger");
const app = require("./config/express");
const mongoose = require("./config/mongoose");

// open mongoose connection
mongoose.connect();


// const handler = serverless(app);
app.listen(4000, () => {
    console.log(`Example app listening at http://localhost:${4000}`)
  })
// module.exports.server = async (event, context) => await handler(event, context)