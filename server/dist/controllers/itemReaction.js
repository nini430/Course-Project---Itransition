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
exports.unreactItemHandler = exports.addReactionHandler = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const item_1 = require("../services/item");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const errorMessages_1 = __importDefault(require("../utils/errorMessages"));
const http_status_codes_1 = require("http-status-codes");
const itemReaction_1 = require("../services/itemReaction");
const addReactionHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let reaction;
    const { name } = req.body.input;
    const item = yield (0, item_1.getItemByIdExtended)(req.params.itemId);
    if (!item) {
        return next(new errorResponse_1.default(errorMessages_1.default.notFound, http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    const myReaction = item.reactions.find((item) => item.userId === req.user.id);
    if (myReaction) {
        reaction = yield (0, itemReaction_1.updateReaction)(myReaction.id, name);
    }
    else {
        reaction = yield (0, itemReaction_1.addReaction)({
            name,
            itemId: req.params.itemId,
            userId: req.user.id,
        });
    }
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({
        success: true,
        data: reaction,
        status: myReaction ? 'update' : 'create',
        reactionId: myReaction === null || myReaction === void 0 ? void 0 : myReaction.id
    });
}));
exports.addReactionHandler = addReactionHandler;
const unreactItemHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const itemReaction = yield (0, itemReaction_1.getReactionById)(req.params.reactionId);
    if (!itemReaction) {
        return next(new errorResponse_1.default(errorMessages_1.default.notFound, http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    yield (0, itemReaction_1.unreactItem)(itemReaction.id);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, reactionId: itemReaction.id });
}));
exports.unreactItemHandler = unreactItemHandler;
