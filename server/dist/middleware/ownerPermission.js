"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const errorMessages_1 = __importDefault(require("../utils/errorMessages"));
const http_status_codes_1 = require("http-status-codes");
const ownerPermission = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let ownerId;
    if (req.body.ownerId === req.user.id) {
        ownerId = req.user.id;
    }
    else if (req.user.role === 'ADMIN' && req.body.ownerId !== req.user.id) {
        ownerId = req.body.ownerId;
    }
    else {
        return next(new errorResponse_1.default(errorMessages_1.default.forbiddenOperation, http_status_codes_1.StatusCodes.FORBIDDEN));
    }
    req.ownerId = ownerId;
    next();
}));
exports.default = ownerPermission;
