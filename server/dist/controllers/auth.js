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
exports.getMyPassportUser = exports.passportSuccessRedirect = exports.verifyEmailActionHandler = exports.verifyEmailHandler = exports.resetPasswordActionHandler = exports.resetPasswordHandler = exports.forgotPasswordHandler = exports.getMyFollowsHandler = exports.updateUserInfoHandler = exports.uploadProfileImageHandler = exports.logoutUser = exports.generateRefreshToken = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auth_1 = require("../services/auth");
const token_1 = require("../services/token");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const errorMessages_1 = __importDefault(require("../utils/errorMessages"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const mailConstructor_1 = require("../utils/mailConstructor");
const registerUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return next(new errorResponse_1.default(errorMessages_1.default.missingFields, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const _a = yield (0, auth_1.createUser)({
        firstName,
        lastName,
        email,
        password,
    }), { password: pass } = _a, rest = __rest(_a, ["password"]);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({ success: true, user: rest });
}));
exports.registerUser = registerUser;
const loginUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new errorResponse_1.default(errorMessages_1.default.missingFields, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const user = yield (0, auth_1.findUserByEmail)(email);
    if ((user === null || user === void 0 ? void 0 : user.status) === 'blocked') {
        return next(new errorResponse_1.default(errorMessages_1.default.blockedUser, http_status_codes_1.StatusCodes.FORBIDDEN));
    }
    if ((user === null || user === void 0 ? void 0 : user.status) === 'deleted') {
        return next(new errorResponse_1.default(errorMessages_1.default.deletedUser, http_status_codes_1.StatusCodes.FORBIDDEN));
    }
    if (!user) {
        return next(new errorResponse_1.default(errorMessages_1.default.invalidCredentials, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const isPasswordCorrect = yield (0, auth_1.comparePassword)(password, user.password);
    if (!isPasswordCorrect) {
        return next(new errorResponse_1.default(errorMessages_1.default.invalidCredentials, http_status_codes_1.StatusCodes.BAD_REQUEST));
    }
    const accessToken = (0, auth_1.generateJwt)(user.id, process.env.JWT_ACCESS_TOKEN_SECRET, process.env.JWT_ACCESS_TOKEN_EXPIRE_MIN);
    const refreshToken = (0, auth_1.generateJwt)(user.id, process.env.JWT_REFRESH_TOKEN_SECRET, process.env.JWT_REFRESH_TOKEN_EXPIRE_MIN);
    const { password: pass, isEmailVerified } = user, rest = __rest(user, ["password", "isEmailVerified"]);
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        user: Object.assign(Object.assign({}, rest), { isEmailVerified }),
        accessToken,
        refreshToken,
    });
}));
exports.loginUser = loginUser;
const generateRefreshToken = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const refreshToken = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
    if (!refreshToken) {
        return next(new errorResponse_1.default(errorMessages_1.default.unauthenticated, http_status_codes_1.StatusCodes.UNAUTHORIZED));
    }
    try {
        const tokenInfo = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
        if (tokenInfo.id) {
            const accessToken = (0, auth_1.generateJwt)(tokenInfo.id, process.env.JWT_ACCESS_TOKEN_SECRET, process.env.JWT_ACCESS_TOKEN_EXPIRE_MIN);
            return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, accessToken });
        }
    }
    catch (err) {
        return next(new errorResponse_1.default(err.name === 'TokenExpiredError'
            ? errorMessages_1.default.tokenExpired
            : errorMessages_1.default.unauthenticated, http_status_codes_1.StatusCodes.UNAUTHORIZED));
    }
}));
exports.generateRefreshToken = generateRefreshToken;
const logoutUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.user = null;
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ success: true, data: 'logged_out' });
}));
exports.logoutUser = logoutUser;
const uploadProfileImageHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const image = yield (0, auth_1.uploadProfileImage)(req.body.image, req.user.id);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: image });
}));
exports.uploadProfileImageHandler = uploadProfileImageHandler;
const updateUserInfoHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { input, update } = req.body;
    let updatedUser;
    const user = yield (0, auth_1.findUserById)(req.user.id);
    if (!user) {
        return next(new errorResponse_1.default(errorMessages_1.default.notFound, http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    if (update === 'fullName' || update === 'email') {
        updatedUser = yield (0, auth_1.updateUserInfo)(input, req.user.id, update);
    }
    if (update === 'password') {
        const isPasswordCorrect = yield (0, auth_1.comparePassword)(input.password, user.password);
        if (!isPasswordCorrect) {
            return next(new errorResponse_1.default(errorMessages_1.default.invalidCredentials, http_status_codes_1.StatusCodes.BAD_REQUEST));
        }
        const hashedPassword = yield (0, auth_1.hashPassword)(input.newPassword);
        updatedUser = yield (0, auth_1.updatePassword)(hashedPassword, req.user.id);
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ success: true, data: updatedUser });
}));
exports.updateUserInfoHandler = updateUserInfoHandler;
const getMyFollowsHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const followInfo = yield (0, auth_1.getMyFollows)(req.user.id);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: followInfo });
}));
exports.getMyFollowsHandler = getMyFollowsHandler;
const forgotPasswordHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, auth_1.findUserByEmail)(req.body.email);
    if (!user) {
        return next(new errorResponse_1.default(errorMessages_1.default.userNotFound, http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    const { email, firstName, lastName, id } = user;
    const tokenInstance = yield (0, token_1.findTokenByUserId)(id, 'password');
    if (!tokenInstance) {
        const token = yield (0, auth_1.forgotPassword)(user.id);
        (0, sendEmail_1.default)((0, mailConstructor_1.generatePasswordMail)({ email, firstName, lastName, token, userId: id }));
    }
    else if (tokenInstance && tokenInstance.tokenExpire < Date.now()) {
        (0, token_1.removeTokenByUserId)(tokenInstance.id);
        const token = yield (0, auth_1.forgotPassword)(id);
        (0, sendEmail_1.default)((0, mailConstructor_1.generatePasswordMail)({ email, firstName, lastName, token, userId: id }));
    }
    else {
        return next(new errorResponse_1.default(errorMessages_1.default.emailAlreadySent, http_status_codes_1.StatusCodes.FORBIDDEN));
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ success: true, data: 'email_sent_success' });
}));
exports.forgotPasswordHandler = forgotPasswordHandler;
const resetPasswordHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let expired;
    const token = yield (0, token_1.findTokenByUserId)(req.params.userId, 'password');
    if (!token) {
        expired = true;
    }
    else {
        const isTokenCorrect = (0, auth_1.compareCryptoToken)(req.body.token, token.hashedToken);
        if (!isTokenCorrect) {
            yield (0, token_1.removeTokenByUserId)(token.id);
            expired = true;
        }
        else {
            if (token.tokenExpire < Date.now()) {
                yield (0, token_1.removeTokenByUserId)(token.id);
                expired = true;
            }
        }
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, expired });
}));
exports.resetPasswordHandler = resetPasswordHandler;
const resetPasswordActionHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield (0, auth_1.resetPassword)(req.body.newPassword, req.params.userId);
    if (token) {
        yield (0, token_1.removeTokenByUserId)(token === null || token === void 0 ? void 0 : token.id);
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ success: true, data: 'password_reset_success' });
}));
exports.resetPasswordActionHandler = resetPasswordActionHandler;
const verifyEmailHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, auth_1.findUserById)(req.user.id);
    const tokenInstance = yield (0, token_1.findTokenByUserId)(user === null || user === void 0 ? void 0 : user.id, 'email');
    if (!tokenInstance) {
        const token = yield (0, auth_1.verifyEmail)(req.user.id);
        (0, sendEmail_1.default)((0, mailConstructor_1.generateEmailMail)({
            email: user === null || user === void 0 ? void 0 : user.email,
            firstName: user === null || user === void 0 ? void 0 : user.firstName,
            lastName: user === null || user === void 0 ? void 0 : user.lastName,
            token,
            userId: user === null || user === void 0 ? void 0 : user.id,
        }));
    }
    else if (tokenInstance && tokenInstance.tokenExpire < Date.now()) {
        yield (0, token_1.removeTokenByUserId)(tokenInstance.id);
        const token = yield (0, auth_1.verifyEmail)(req.user.id);
        (0, sendEmail_1.default)((0, mailConstructor_1.generateEmailMail)({
            email: user === null || user === void 0 ? void 0 : user.email,
            firstName: user === null || user === void 0 ? void 0 : user.firstName,
            lastName: user === null || user === void 0 ? void 0 : user.lastName,
            token,
            userId: user === null || user === void 0 ? void 0 : user.id,
        }));
    }
    else {
        return next(new errorResponse_1.default(errorMessages_1.default.emailAlreadySent, http_status_codes_1.StatusCodes.FORBIDDEN));
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ success: true, data: 'email_sent_success' });
}));
exports.verifyEmailHandler = verifyEmailHandler;
const verifyEmailActionHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let expired = false;
    const tokenInstance = yield (0, token_1.findTokenByUserId)(req.params.userId, 'email');
    if (!tokenInstance) {
        expired = true;
    }
    else {
        const isTokenCorrect = (0, auth_1.compareCryptoToken)(req.body.token, tokenInstance.hashedToken);
        if (!isTokenCorrect) {
            expired = true;
        }
        else {
            if (tokenInstance.tokenExpire < Date.now()) {
                expired = true;
            }
            else {
                yield (0, auth_1.verifyEmailAction)(req.params.userId);
            }
        }
        yield (0, token_1.removeTokenByUserId)(tokenInstance.id);
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: expired });
}));
exports.verifyEmailActionHandler = verifyEmailActionHandler;
const passportSuccessRedirect = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.redirect(`${process.env.MY_APP}/redirect`);
}));
exports.passportSuccessRedirect = passportSuccessRedirect;
const getMyPassportUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _c = req.user, { password } = _c, rest = __rest(_c, ["password"]);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: rest });
}));
exports.getMyPassportUser = getMyPassportUser;
