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
exports.toggleFollowUser = exports.getUserByIdHandler = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_codes_1 = require("http-status-codes");
const user_1 = require("../services/user");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const errorMessages_1 = __importDefault(require("../utils/errorMessages"));
const getUserByIdHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_1.getUserById)(req.params.userId);
    if (!user) {
        return next(new errorResponse_1.default(errorMessages_1.default.notFound, http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: user });
}));
exports.getUserByIdHandler = getUserByIdHandler;
const toggleFollowUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let followInstance;
    const doesFollow = yield (0, user_1.doesAlreadyFollow)(req.params.followerId, req.params.followedId);
    if (doesFollow) {
        yield (0, user_1.unfollowUser)(doesFollow.id);
        followInstance = doesFollow;
    }
    else {
        followInstance = yield (0, user_1.followUser)(req.params.followerId, req.params.followedId);
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: followInstance, status: doesFollow ? 'unfollow' : 'follow', follow: doesFollow === null || doesFollow === void 0 ? void 0 : doesFollow.id });
}));
exports.toggleFollowUser = toggleFollowUser;
