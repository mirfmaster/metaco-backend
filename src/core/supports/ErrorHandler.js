const sendErrorJson = (err, res) => {
    let {
        statusCode,
        message
    } = err;
    res.ext.error(message, statusCode)
};

const ErrorHandler = (err, req, res, next) => {
    if (process.env.APP_ENV !== "production") console.log(err.stack);
    sendErrorJson(err, res);

    if (!res.headersSent) {
        return next(err);
    }
}

module.exports = ErrorHandler;