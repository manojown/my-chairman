const Joi = require("joi");

const schema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().required(),
});
exports.loginValidation = (body) => {
	return schema.validate(body);
};
