const axios = require("axios");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const config = require("./config");
const logger = require("./logger");
const secretKey = config.paystackSecret;

const paystackApi = axios.create({
    baseURL: "https://api.paystack.co",
    headers: { authorization: `Bearer ${secretKey}` },
});

const initializePayment = async (paymentBody) => {
    const payload = {
        ...paymentBody,
        amount: paymentBody.amount * 100,
    };

    try {
        const res = await paystackApi.post("/transaction/initialize", payload);

        const {
            status,
            data: { authorization_url, reference },
        } = res.data;

        const response = { status, authorization_url, reference };

        return response;
    } catch (error) {
        logger.error(error)
        throw new ApiError(httpStatus.BAD_REQUEST, error);
    }
};

const verifyPayment = async (paymentReference) => {
    try {
        const res = await paystackApi.get(`transaction/verify/${paymentReference}`);

        const {
            data: {
                amount,
                status,
                gateway_response,
                reference,
                customer: { email },
            },
        } = res.data;

        const response = { amount, status, gateway_response, reference, email };

        return response;
    } catch (error) {
        logger.error(error)
        throw new ApiError(httpStatus.BAD_REQUEST, error);
    }
};

module.exports = { initializePayment, verifyPayment };
