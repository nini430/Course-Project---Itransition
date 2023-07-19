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
exports.unreactComment = exports.updateReactComment = exports.reactComment = exports.getReactionById = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const getReactionById = (reactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const reaction = yield prismaClient_1.default.commentReaction.findUnique({
        where: { id: reactionId },
    });
    return reaction;
});
exports.getReactionById = getReactionById;
const reactComment = (commentId, emoji, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const reaction = yield prismaClient_1.default.commentReaction.create({
        data: { name: emoji, commentId, userId },
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    profileImage: true,
                    id: true,
                },
            },
        },
    });
    return reaction;
});
exports.reactComment = reactComment;
const updateReactComment = (reactionId, emoji) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedReaction = yield prismaClient_1.default.commentReaction.update({
        data: { name: emoji },
        where: { id: reactionId },
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    id: true,
                    profileImage: true,
                },
            },
        },
    });
    return updatedReaction;
});
exports.updateReactComment = updateReactComment;
const unreactComment = (reactionId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.commentReaction.delete({ where: { id: reactionId } });
});
exports.unreactComment = unreactComment;
