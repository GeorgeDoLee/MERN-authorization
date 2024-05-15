

const errorResponseHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'serverside error',
        statusCode
    });
}

const invalidPathHandler = (req, res, next) => {
    let error = new Error('Invalid path');
    error.statusCode = 404;
    next(error);
}

export {errorResponseHandler, invalidPathHandler};