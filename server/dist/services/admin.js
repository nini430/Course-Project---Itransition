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
exports.changeUsersRole = exports.sortUsers = exports.changeUsersStatus = exports.editUser = exports.filterUsers = exports.getAllUsers = void 0;
const commonQueryObjs_1 = require("../utils/commonQueryObjs");
const formatterFns_1 = require("../utils/formatterFns");
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const auth_1 = require("./auth");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prismaClient_1.default.user.findMany({
        select: commonQueryObjs_1.adminUser,
    });
    return (0, formatterFns_1.userTableFormatter)(users);
});
exports.getAllUsers = getAllUsers;
const filterUsers = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prismaClient_1.default.user.findMany({
        where: {
            OR: [
                { firstName: { contains: filter } },
                { lastName: { contains: filter } },
                { email: { contains: filter } },
            ],
        },
        select: commonQueryObjs_1.adminUser,
    });
    return (0, formatterFns_1.userTableFormatter)(users);
});
exports.filterUsers = filterUsers;
const sortUsers = (sortedCol, sortedDir) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prismaClient_1.default.user.findMany({
        orderBy: { [sortedCol]: sortedDir },
        select: commonQueryObjs_1.adminUser,
    });
    return (0, formatterFns_1.userTableFormatter)(users);
});
exports.sortUsers = sortUsers;
const editUser = (userId, inputs, oldPassword) => __awaiter(void 0, void 0, void 0, function* () {
    let newPassword;
    let { firstName, lastName, email, password } = inputs;
    if (inputs.password) {
        newPassword = yield (0, auth_1.hashPassword)(password);
    }
    const updatedUser = yield prismaClient_1.default.user.update({
        data: {
            firstName,
            lastName,
            email,
            password: newPassword ? newPassword : oldPassword,
        },
        where: { id: userId },
        select: commonQueryObjs_1.adminUser,
    });
    return (0, formatterFns_1.userTableFormatter)([updatedUser]);
});
exports.editUser = editUser;
const changeUsersStatus = (userIds, status) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.user.updateMany({
        data: { status },
        where: { id: { in: userIds } },
    });
});
exports.changeUsersStatus = changeUsersStatus;
const changeUsersRole = (userIds, role) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.user.updateMany({
        data: { role },
        where: { id: { in: userIds } },
    });
});
exports.changeUsersRole = changeUsersRole;
