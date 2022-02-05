const routeCallback = (handler) => {
    return async (req, res, next) => {
        let error;

        try {
            await handler(req, res);
        } catch (err) {
            error = err;
        }

        if (!res.headersSent) {
            return next(error);
        }
    };
};

module.exports = {
    routeCallback
};