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
exports.verifyEmailAction = exports.verifyEmail = exports.compareCryptoToken = exports.resetPassword = exports.forgotPassword = exports.findUserByIdWithoutPass = exports.getMyFollows = exports.updatePassword = exports.updateUserInfo = exports.uploadProfileImage = exports.generateJwt = exports.findUserByEmail = exports.comparePassword = exports.findUserById = exports.createUser = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const common_1 = require("./common");
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(password, 12);
    return hashedPassword;
});
exports.hashPassword = hashPassword;
const comparePassword = (candidatePassword, password) => __awaiter(void 0, void 0, void 0, function* () {
    const isPasswordCorrect = yield bcrypt_1.default.compare(candidatePassword, password);
    return isPasswordCorrect;
});
exports.comparePassword = comparePassword;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClient_1.default.user.findFirst({
        where: { email },
        include: { followedIds: true, followerIds: true },
    });
    return user;
});
exports.findUserByEmail = findUserByEmail;
const hashCryptoToken = () => {
    const token = crypto_1.default.randomBytes(20).toString('hex');
    const hashedToken = crypto_1.default.createHash('sha256').update(token).digest('hex');
    return { token, hashedToken };
};
const compareCryptoToken = (token, userHashedToken) => {
    const hashedToken = crypto_1.default.createHash('sha256').update(token).digest('hex');
    return hashedToken === userHashedToken;
};
exports.compareCryptoToken = compareCryptoToken;
const resetPassword = (newPassword, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield hashPassword(newPassword);
    const token = yield prismaClient_1.default.token.findFirst({ where: { userId, name: 'password' } });
    yield prismaClient_1.default.user.update({ data: { password: hashedPassword }, where: { id: userId } });
    return token;
});
exports.resetPassword = resetPassword;
const forgotPassword = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, hashedToken } = hashCryptoToken();
    const tokenExpire = Date.now() + 10 * 60 * 1000;
    yield prismaClient_1.default.token.create({ data: { userId, tokenExpire, hashedToken, name: 'PASSWORD' } });
    return token;
});
exports.forgotPassword = forgotPassword;
const generateJwt = (userId, secret, expiresIn) => {
    const token = jsonwebtoken_1.default.sign({ id: userId }, secret, { expiresIn });
    return token;
};
exports.generateJwt = generateJwt;
const findUserByIdWithoutPass = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClient_1.default.user.findUnique({
        where: { id },
        select: {
            firstName: true,
            lastName: true,
            profileImage: true,
            id: true,
            role: true,
        },
    });
    return user;
});
exports.findUserByIdWithoutPass = findUserByIdWithoutPass;
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prismaClient_1.default.user.findUnique({ where: { id } });
    return user;
});
exports.findUserById = findUserById;
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield hashPassword(input.password);
    const user = yield prismaClient_1.default.user.create({
        data: {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            password: hashedPassword,
        },
    });
    return user;
});
exports.createUser = createUser;
const uploadProfileImage = (imageBase64, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const img = yield (0, common_1.uploadImage)(imageBase64);
    yield prismaClient_1.default.user.update({
        data: { profileImage: img },
        where: { id: userId },
    });
    return img;
});
exports.uploadProfileImage = uploadProfileImage;
const updateUserInfo = (input, userId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email } = input;
    const updatedUser = yield prismaClient_1.default.user.update({
        data: update === 'fullName' ? { firstName, lastName } : { email },
        where: { id: userId },
    });
    const { password } = updatedUser, rest = __rest(updatedUser, ["password"]);
    return rest;
});
exports.updateUserInfo = updateUserInfo;
const verifyEmail = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { hashedToken, token } = hashCryptoToken();
    const tokenExpire = Date.now() + 10 * 60 * 1000;
    yield prismaClient_1.default.token.create({ data: { userId, hashedToken, tokenExpire, name: 'email' } });
    return token;
});
exports.verifyEmail = verifyEmail;
const updatePassword = (newPassword, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield prismaClient_1.default.user.update({
        data: { password: newPassword },
        where: { id: userId },
    });
    const { password } = updatedUser, rest = __rest(updatedUser, ["password"]);
    return rest;
});
exports.updatePassword = updatePassword;
const getMyFollows = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const followers = yield prismaClient_1.default.follow.findMany({
        where: { followedId: userId },
    });
    const followings = yield prismaClient_1.default.follow.findMany({
        where: { followerId: userId },
    });
    return { followers, followings };
});
exports.getMyFollows = getMyFollows;
const verifyEmailAction = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.user.update({ data: { isEmailVerified: true }, where: { id: userId } });
});
exports.verifyEmailAction = verifyEmailAction;
