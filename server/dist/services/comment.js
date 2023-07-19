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
exports.editComment = exports.removeComment = exports.findCommentById = exports.addComment = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const common_1 = require("./common");
const addComment = (input, itemId, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, image } = input;
    let uploadedImage;
    if (image) {
        uploadedImage = yield (0, common_1.uploadImage)(image);
    }
    const comment = yield prismaClient_1.default.comment.create({
        data: {
            text,
            itemId,
            authorId,
            image: uploadedImage ? uploadedImage : null,
        },
        include: {
            author: {
                select: {
                    firstName: true,
                    lastName: true,
                    profileImage: true,
                    id: true,
                },
            },
            reactions: {
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
            },
        },
    });
    return comment;
});
exports.addComment = addComment;
const findCommentById = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield prismaClient_1.default.comment.findUnique({
        where: { id: commentId },
        include: {
            reactions: {
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
            },
        },
    });
    return comment;
});
exports.findCommentById = findCommentById;
const removeComment = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.comment.delete({ where: { id: commentId } });
});
exports.removeComment = removeComment;
const editComment = (commentId, input) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('anu saertod aq???');
    const { text, image } = input;
    console.log(image);
    let updatedImage;
    if (image && image.name === 'deleted') {
        updatedImage = undefined;
    }
    else if (image && image.name === 'cloudinary') {
        console.log('????????');
        updatedImage = image.value;
    }
    else if (image && image.name === 'base64') {
        console.log('base64');
        updatedImage = yield (0, common_1.uploadImage)(image.value);
    }
    const updatedComment = yield prismaClient_1.default.comment.update({
        data: { text, image: updatedImage },
        where: { id: commentId },
        include: {
            author: {
                select: {
                    firstName: true,
                    lastName: true,
                    id: true,
                    profileImage: true,
                },
            },
            reactions: {
                include: {
                    user: {
                        select: {
                            firstName: true,
                            lastName: true,
                            id: true,
                            profileImage: true
                        }
                    }
                }
            }
        },
    });
    return updatedComment;
});
exports.editComment = editComment;
