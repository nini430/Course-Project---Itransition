"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const errorMessages_1 = __importDefault(require("../utils/errorMessages"));
const errorHandler = (err, req, res, next) => {
    let errors = Object.assign({}, err);
    errors.message = err.message;
    if (err.code === 'P2002') {
        errors = new errorResponse_1.default(errorMessages_1.default.uniqueEmailError, http_status_codes_1.StatusCodes.CONFLICT);
    }
    return res.status(errors.statusCode || 500).json({
        success: false,
        error: errors.message || 'Something went wrong'
    });
};
exports.default = errorHandler;
