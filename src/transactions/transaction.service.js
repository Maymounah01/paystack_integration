const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const Transactions = require("./transaction.model");
const { initializePayment, verifyPayment } = require("../config/paystack");

const initPayment = async (user, paymentBody) => {
    const paymentResponse = await initializePayment(paymentBody);
    paymentResponse.user = user._id;
    paymentResponse.amount = paymentBody.amount;
    paymentResponse.email = paymentBody.email;
    const transaction = await Transactions.create(paymentResponse);
    console.log(transaction);
    return paymentResponse.authorization_url;
};

const paystackCallback = async (reference) => {
    const paymentDetails = await verifyPayment(reference);

    const { status } = paymentDetails;

    const transaction = await Transactions.findOneAndUpdate(
        { reference },
        { status },
        { returnDocument: "after" }
    );
    return {status};
};

module.exports = {
    initPayment,
    paystackCallback,
};
