const Joi = require("joi");

const initPayment = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        fullname: Joi.string().required(),
        amount: Joi.number().required(),
    }),
};

const verifyPayment = {
    query: Joi.object().keys({
        reference: Joi.string().required(),
        trxref: Joi.string(),
    }),
};

module.exports = {
    initPayment,
    verifyPayment,
};