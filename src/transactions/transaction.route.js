const express = require("express");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const router = express.Router();
const transactionController = require("./transaction.controller");
const transactionValidation = require("./transaction.validation");

router
    .route("/")
    .post(
        auth,
        validate(transactionValidation.initPayment),
        transactionController.initPayment
    )
    .get(
        validate(transactionValidation.verifyPayment),
        transactionController.paystackCallback
    );

router
    .route("/:id")
    .get(
        auth,
        validate(transactionValidation.getAllUserTransactions),
        transactionController.getAllUserTransactions
    );

module.exports = router;
