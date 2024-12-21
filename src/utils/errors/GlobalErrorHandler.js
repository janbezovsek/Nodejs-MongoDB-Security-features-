// Development mode -> Send a dev error
const sendErrorForDev = (err, res) => {
    console.log("Dev error invoked");

    res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
});
};

// Production mode -> Send a client error
const sendErrorForProd = (err, res) => {
    console.log("Prod error invoked");

    

    if (err.isOperational) {
    console.log("Trusted user");

    // User is trusted
        res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
} else {
    console.log("Unknown user");

    // User is unknown
    res.status(500).json({
        status: "error",
        message: "Something went wrong",
    });
}
};

module.exports = (err, req, res, next) => {
err.statusCode = err.statusCode || 500;
err.status = err.status || "error";
err.message = err.message || "Something went wrong";


if(process.env.NODE_ENV === "development") {
    // Development error responses
    sendErrorForDev(err, res)
} else {
    // Production error responses
    sendErrorForProd(err, res)
}


}
