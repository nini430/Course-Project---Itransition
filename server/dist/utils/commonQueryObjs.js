"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminUser = exports.simpleUser = void 0;
const simpleUser = {
    firstName: true,
    lastName: true,
    id: true,
    profileImage: true,
};
exports.simpleUser = simpleUser;
const adminUser = {
    id: true,
    firstName: true,
    lastName: true,
    email: true,
    role: true,
    status: true,
    profileImage: true,
    password: false,
    createdAt: true,
    collections: true,
    followedIds: { include: { followed: true, follower: true } },
    followerIds: { include: { followed: true, follower: true } },
};
exports.adminUser = adminUser;
