const Joi = require("joi");
const { objectId } = require("../utils/custom.validation");

const initPayment = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        amount: Joi.number().required(),
    }),
};

const verifyPayment = {
    query: Joi.object().keys({
        reference: Joi.string().required(),
        trxref: Joi.string(),
    }),
};
const getAllUserTransactions = {
    params: Joi.object().keys({
        id: Joi.string().required().custom(objectId),
    }),
};

module.exports = {
    initPayment,
    verifyPayment,
    getAllUserTransactions,
};