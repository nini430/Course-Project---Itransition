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
exports.changeUsersRoleHandler = exports.sortUsersHandler = exports.changeUsersStatusHandler = exports.editUserHandler = exports.filterUsersHandler = exports.getAllUsersHandler = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_codes_1 = require("http-status-codes");
const admin_1 = require("../services/admin");
const auth_1 = require("../services/auth");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const errorMessages_1 = __importDefault(require("../utils/errorMessages"));
const getAllUsersHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, admin_1.getAllUsers)();
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: users });
}));
exports.getAllUsersHandler = getAllUsersHandler;
const filterUsersHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filteredUsers = yield (0, admin_1.filterUsers)(req.body.filter);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ success: true, data: filteredUsers });
}));
exports.filterUsersHandler = filterUsersHandler;
const sortUsersHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { sortedCol, sortedDir } = req.body;
    const users = yield (0, admin_1.sortUsers)(sortedCol, sortedDir);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: users });
}));
exports.sortUsersHandler = sortUsersHandler;
const editUserHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, auth_1.findUserById)(req.params.userId);
    if (!user) {
        return next(new errorResponse_1.default(errorMessages_1.default.notFound, http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    const updatedUser = yield (0, admin_1.editUser)(req.params.userId, req.body.inputs, user.password);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ success: true, data: updatedUser });
}));
exports.editUserHandler = editUserHandler;
const changeUsersStatusHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, userIds } = req.body;
    yield (0, admin_1.changeUsersStatus)(userIds, status);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: 'users_updated' });
}));
exports.changeUsersStatusHandler = changeUsersStatusHandler;
const changeUsersRoleHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userIds, role } = req.body;
    yield (0, admin_1.changeUsersRole)(userIds, role);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: 'users_updated' });
}));
exports.changeUsersRoleHandler = changeUsersRoleHandler;
