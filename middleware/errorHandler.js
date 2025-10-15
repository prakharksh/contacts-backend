const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case 400:
             res.json({
            title: 'Bad Request',
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
            });
        case 401:
            res.json({
            title: 'Unauthorized',
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
            });
        case 403:
            res.json({
            title: 'Forbidden',
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
            });
        case 404:
            res.json({ 
            title: 'Not Found',
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
            });
        case 500:
            res.json({
            title: 'Internal Server Error',
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
            });
        default:
            console.log("No Error, All Good");
            break;
    }
        
}

module.exports = {errorHandler};