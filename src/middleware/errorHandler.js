// Global error handling middleware
export const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);

    //Mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({ message: messages.join(', ') });
    }
    
    //Mongoose duplicate key error
    if (err.code && err.code === 11000) {
        const field = Object.keys(err.keyValue);
        return res.status(400).json({ message: `Duplicate field value entered for ${field}` });
    }

    //JWT error
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
    }
    
    //JWT expired error
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
    }
    //Mongoose cast error (eg: invalid ObjectId)
    if (err.name === 'CastError') {
        return res.status(404).json({ message: 'Resource not found' });
    }
    //default to 500 server error
    res.status(err.statusCode || 500).json({ message: err.message || 'Server Error' });
};