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
exports.getReactionById = exports.unreactItem = exports.updateReaction = exports.addReaction = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const addReaction = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, userId, itemId } = input;
    const reaction = yield prismaClient_1.default.itemReaction.create({
        data: { name: name, userId, itemId },
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
exports.addReaction = addReaction;
const getReactionById = (reactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const reaction = yield prismaClient_1.default.itemReaction.findUnique({ where: { id: reactionId } });
    return reaction;
});
exports.getReactionById = getReactionById;
const updateReaction = (reactionId, name) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedReaction = yield prismaClient_1.default.itemReaction.update({
        data: { name },
        where: { id: reactionId },
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
    return updatedReaction;
});
exports.updateReaction = updateReaction;
const unreactItem = (reactionId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.itemReaction.delete({ where: { id: reactionId } });
});
exports.unreactItem = unreactItem;
