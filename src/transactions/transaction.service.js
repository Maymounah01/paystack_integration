const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const Transactions = require("./transaction.model");
const { initializePayment, verifyPayment } = require("../config/paystack");
const Users = require("../users/user.model");

const initPayment = async (user, paymentBody) => {
    const paymentResponse = await initializePayment(paymentBody);

    paymentResponse.user = user._id;
    paymentResponse.amount = paymentBody.amount;
    paymentResponse.email = paymentBody.email;

    const transaction = await Transactions.create(paymentResponse);

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

    if (status === "success") {
        const user = await Users.findOne({ _id: transaction.user });
        user.balance = user.balance + transaction.amount;
        await user.save();
    }

    return { status };
};

const getAllUserTransactions = async (loggedInUser, id) => {
    const transactions = await Transactions.find({ user: id });

    if (transactions.length > 0 && loggedInUser._id.toString() !== id) {
        throw new ApiError(httpStatus.FORBIDDEN, "Not authorized");
    }

    if (transactions.length == 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Transactions");
    }

    return transactions;
};

module.exports = {
    initPayment,
    paystackCallback,
    getAllUserTransactions,
};
