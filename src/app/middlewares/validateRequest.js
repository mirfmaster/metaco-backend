const yup = require('yup');

const validateRequest = (
    shape,
    path = 'body'
) => async (req, res, next) => {
    const schema = yup.object().shape(shape);
    const { services } = req.app;

    try {
        const validData = await schema.validate(req[path], {
            abortEarly: false,
            context: services
        });

        req.validated = isEmpty(validData) ? req.body : validData;

        return next();
    } catch (error) {
        const {
            errors,
            inner: details
        } = error;

        return res.status(400).json({
            errors,
            details
        });
    }
};

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

module.exports = validateRequest;