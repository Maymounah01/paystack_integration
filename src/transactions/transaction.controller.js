const httpStatus = require("http-status");
const transactionService = require("./transaction.service");
const catchAsync = require("../utils/catchAsync");

const initPayment = catchAsync(async (req, res) => {
    const transaction = await transactionService.initPayment(req.user, req.body);
    res.status(httpStatus.CREATED).send(transaction);
});

const paystackCallback = catchAsync(async (req, res) => {
    const transaction = await transactionService.paystackCallback(req.query.reference);
    res.status(httpStatus.CREATED).send(transaction);
});

const paymentReceipt = catchAsync(async (req, res) => {
    const transaction = await transactionService.paymentReceipt(req.body);
    res.status(httpStatus.CREATED).send(transaction);
});

module.exports = {
    initPayment,
    paystackCallback,
    paymentReceipt,
};