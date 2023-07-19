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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_codes_1 = require("http-status-codes");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const errorMessages_1 = __importDefault(require("../utils/errorMessages"));
const auth_1 = require("../services/auth");
const authProtect = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    console.log(req.user, 'opa!!!!', req.isAuthenticated());
    if (req.isAuthenticated()) {
        return next();
    }
    if (!token) {
        return next(new errorResponse_1.default(errorMessages_1.default.unauthenticated, http_status_codes_1.StatusCodes.UNAUTHORIZED));
    }
    try {
        const tokenInfo = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
        const user = yield (0, auth_1.findUserById)(tokenInfo === null || tokenInfo === void 0 ? void 0 : tokenInfo.id);
        if (!user) {
            return next(new errorResponse_1.default(errorMessages_1.default.unauthenticated, http_status_codes_1.StatusCodes.UNAUTHORIZED));
        }
        const { password } = user, rest = __rest(user, ["password"]);
        req.user = rest;
        next();
    }
    catch (err) {
        console.log(err.name, 'lalala');
        return next(new errorResponse_1.default(err.name === 'TokenExpiredError'
            ? errorMessages_1.default.tokenExpired
            : errorMessages_1.default.unauthenticated, http_status_codes_1.StatusCodes.UNAUTHORIZED));
    }
}));
exports.default = authProtect;
