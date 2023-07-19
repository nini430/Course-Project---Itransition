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
exports.unreactCommentReactionHandler = exports.addCommentReactionHandler = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const comment_1 = require("../services/comment");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const errorMessages_1 = __importDefault(require("../utils/errorMessages"));
const http_status_codes_1 = require("http-status-codes");
const commentReaction_1 = require("../services/commentReaction");
const addCommentReactionHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let reaction;
    const comment = yield (0, comment_1.findCommentById)(req.params.commentId);
    if (!comment) {
        return next(new errorResponse_1.default(errorMessages_1.default.notFound, http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    const myReaction = comment.reactions.find(item => item.user.id === req.user.id);
    if (myReaction) {
        reaction = yield (0, commentReaction_1.updateReactComment)(myReaction.id, req.body.emoji);
    }
    else {
        reaction = yield (0, commentReaction_1.reactComment)(req.params.commentId, req.body.emoji, req.user.id);
    }
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({ success: true, data: reaction, status: myReaction ? 'update' : 'create', reactionId: myReaction === null || myReaction === void 0 ? void 0 : myReaction.id });
}));
exports.addCommentReactionHandler = addCommentReactionHandler;
const unreactCommentReactionHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reaction = yield (0, commentReaction_1.getReactionById)(req.params.reactionId);
    if (!reaction) {
        return next(new errorResponse_1.default(errorMessages_1.default.notFound, http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    yield (0, commentReaction_1.unreactComment)(req.params.reactionId);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, reactionId: reaction.id, commentId: reaction.commentId });
}));
exports.unreactCommentReactionHandler = unreactCommentReactionHandler;
