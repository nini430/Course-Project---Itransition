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
exports.editCommentHandler = exports.removeCommentHandler = exports.addCommentHandler = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_codes_1 = require("http-status-codes");
const comment_1 = require("../services/comment");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const errorMessages_1 = __importDefault(require("../utils/errorMessages"));
const addCommentHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { input } = req.body;
    const newComment = yield (0, comment_1.addComment)({ text: input.text, image: input.image }, req.params.itemId, req.user.id);
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ success: true, data: newComment });
}));
exports.addCommentHandler = addCommentHandler;
const removeCommentHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield (0, comment_1.findCommentById)(req.params.commentId);
    if (!comment) {
        return next(new errorResponse_1.default(errorMessages_1.default.notFound, http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    yield (0, comment_1.removeComment)(req.params.commentId);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: 'comment_remove_success' });
}));
exports.removeCommentHandler = removeCommentHandler;
const editCommentHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { input } = req.body;
    const comment = yield (0, comment_1.findCommentById)(req.params.commentId);
    if (!comment) {
        return next(new errorResponse_1.default(errorMessages_1.default.notFound, http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    const updatedComment = yield (0, comment_1.editComment)(req.params.commentId, { text: input.text, image: input.image });
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: updatedComment, message: 'comment_update_success' });
}));
exports.editCommentHandler = editCommentHandler;
