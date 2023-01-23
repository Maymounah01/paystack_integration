const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        reference: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    }
);

transactionSchema.set("timestamps", true);

module.exports = mongoose.model("Transaction", transactionSchema);
