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

const getAllUserTransactions = catchAsync(async (req, res) => {
    const transactions = await transactionService.getAllUserTransactions(req.user, req.params.id);
    res.status(httpStatus.OK).send(transactions);
});

module.exports = {
    initPayment,
    paystackCallback,
    getAllUserTransactions,
};