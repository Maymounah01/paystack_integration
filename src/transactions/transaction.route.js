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
    .route("/receipt")
    .get(
        auth,
        validate(transactionValidation.paymentReceipt),
        transactionController.paymentReceipt
    );

// router
//     .route("/:reference")
//     .get(
//         validate(transactionValidation.verifyPayment),
//         transactionController.verifyPayment
//     );

module.exports = router;

// const {start Payment, createPayment, getPayment } = require('../controllers/payment');
// const router = express. Router()
// router.post('/', startPayment ); router.get('/createPayment', createPayment); router.get('/paymentDetails', getPayment);
// module.exports = router;
