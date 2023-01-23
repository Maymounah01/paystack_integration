const express = require("express");
const config = require("./src/config/config");
const morgan = require("./src/config/morgan");
const passport = require("passport");
const { errorConverter, errorHandler } = require("./src/middleware/error");
const userRoute = require("./src/users/user.route");
const transactionRoute = require("./src/transactions/transaction.route");
require("./src/config/passport");

const app = express();

if (config.env !== "test") {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}
app.use(express.json());
app.use(passport.initialize());

app.use("/auth", userRoute);
app.use("/payment", transactionRoute)

app.get("/", (req, res) => {
    res.send({ message: "Welcome to Aphatheology's Basic Payment App" });
});
app.use("*", (req, res) => {
    res.send({ message: "Route Not found" });
});

app.use(errorConverter);

app.use(errorHandler);

module.exports = app;
