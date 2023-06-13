"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    const errors = Object.assign({}, err);
    errors.message = err.message;
    return res.status(errors.statusCode || 500).json({
        success: false,
        error: err.message || 'Something went wrong'
    });
};
exports.default = errorHandler;
