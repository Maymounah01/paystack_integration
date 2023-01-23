const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const config = require("./src/config/config");
const morgan = require("./src/config/morgan");
const passport = require("passport");
const { errorConverter, errorHandler } = require("./src/middleware/error");
const authRoute = require("./src/users/auth.route");
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

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Basic Payment API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple Payment App built with Node-Express-MongoDB and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Aphatheology",
                url: "https://github.com/Aphatheology",
                email: "aphatheology@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./src/*/*.route.js"],
};

const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/auth", authRoute);
app.use("/user", userRoute);
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
