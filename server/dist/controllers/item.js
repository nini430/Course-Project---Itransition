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
exports.removeItemsHandler = exports.sortItemHandler = exports.filterItemHandler = exports.getMyItemsHandler = exports.editItemHandler = exports.removeItemHandler = exports.getItemByIdExtendedHandler = exports.getLatestItemsHandler = exports.getUniqueItemTagsHandler = exports.addItemHandler = exports.initializeItemCreationHandler = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_codes_1 = require("http-status-codes");
const item_1 = require("../services/item");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const errorMessages_1 = __importDefault(require("../utils/errorMessages"));
const initializeItemCreationHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const itemConfigFields = yield (0, item_1.initializeItemCreation)(req.params.collectionId);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ success: true, data: itemConfigFields });
}));
exports.initializeItemCreationHandler = initializeItemCreationHandler;
const addItemHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, tags, customFieldValues } = req.body;
    const newItem = yield (0, item_1.addItem)(req.params.collectionId, {
        name,
        tags,
        customFieldValues,
    });
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ success: false, data: newItem });
}));
exports.addItemHandler = addItemHandler;
const getUniqueItemTagsHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tags = yield (0, item_1.getAllUniqueItemTags)();
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: tags });
}));
exports.getUniqueItemTagsHandler = getUniqueItemTagsHandler;
const getLatestItemsHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const latestItems = yield (0, item_1.getLatestItems)();
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ success: true, data: latestItems });
}));
exports.getLatestItemsHandler = getLatestItemsHandler;
const getItemByIdExtendedHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield (0, item_1.getItemByIdExtended)(req.params.itemId);
    if (!item) {
        return next(new errorResponse_1.default(errorMessages_1.default.notFound, http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: item });
}));
exports.getItemByIdExtendedHandler = getItemByIdExtendedHandler;
const removeItemHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield (0, item_1.getItemById)(req.params.itemId);
    if (!item) {
        return next(new errorResponse_1.default(errorMessages_1.default.notFound, http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    if ((item === null || item === void 0 ? void 0 : item.collection.authorId) !== req.user.id) {
        return next(new errorResponse_1.default(errorMessages_1.default.forbiddenOperation, http_status_codes_1.StatusCodes.FORBIDDEN));
    }
    yield (0, item_1.removeItem)(item.id);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ success: true, data: 'item_remove_success' });
}));
exports.removeItemHandler = removeItemHandler;
const removeItemsHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, item_1.removeItems)(req.body.itemIds);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: 'items_delete_success' });
}));
exports.removeItemsHandler = removeItemsHandler;
const editItemHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, tags, customFieldValues } = req.body.input;
    const item = yield (0, item_1.getItemById)(req.params.itemId);
    if (!item) {
        return next(new errorResponse_1.default(errorMessages_1.default.notFound, http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    const updatedItem = yield (0, item_1.editItem)({ name, tags, customFieldValues }, req.params.itemId);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ success: true, data: updatedItem });
}));
exports.editItemHandler = editItemHandler;
const getMyItemsHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield (0, item_1.getMyItems)(req.params.collectionId);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: items });
}));
exports.getMyItemsHandler = getMyItemsHandler;
const filterItemHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield (0, item_1.filterItem)(req.body.filter, req.params.collectionId);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: items });
}));
exports.filterItemHandler = filterItemHandler;
const sortItemHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield (0, item_1.sortItem)(req.body.sortedCol, req.body.sortedDir, req.params.collectionId);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: items });
}));
exports.sortItemHandler = sortItemHandler;
