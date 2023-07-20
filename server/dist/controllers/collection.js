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
exports.updateCollectionHandler = exports.getCollectionExtendedHandler = exports.updateCollectionImageHandler = exports.getCollectionById = exports.getMyCollectionsHandlerHandler = exports.removeCollectionHandler = exports.getTopLargestCollectionsHandler = exports.addCollectionHandler = exports.getCollectionTopics = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_codes_1 = require("http-status-codes");
const constants_1 = require("../utils/constants");
const collection_1 = require("../services/collection");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const errorMessages_1 = __importDefault(require("../utils/errorMessages"));
const getCollectionTopics = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ success: true, data: constants_1.COLLECTION_TOPICS });
}));
exports.getCollectionTopics = getCollectionTopics;
const addCollectionHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, topic, image } = req.body.input;
    const newCollection = yield (0, collection_1.addCollection)({ name, description, topic, image }, req.ownerId);
    yield (0, collection_1.addItemConfigs)(req.body.configs, newCollection === null || newCollection === void 0 ? void 0 : newCollection.id);
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ success: true, collection: newCollection });
}));
exports.addCollectionHandler = addCollectionHandler;
const getTopLargestCollectionsHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const topLargestCollections = yield (0, collection_1.getTopLargestCollections)();
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ success: true, data: topLargestCollections });
}));
exports.getTopLargestCollectionsHandler = getTopLargestCollectionsHandler;
const removeCollectionHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield (0, collection_1.findCollectionById)(req.params.collectionId);
    if (!collection) {
        return next(new errorResponse_1.default(errorMessages_1.default.notFound, http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    if (collection.authorId !== req.usser.id) {
        return next(new errorResponse_1.default(errorMessages_1.default.forbiddenOperation, http_status_codes_1.StatusCodes.FORBIDDEN));
    }
    yield (0, collection_1.removeCollection)(req.params.collectionId);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ success: true, message: 'deleted' });
}));
exports.removeCollectionHandler = removeCollectionHandler;
const getMyCollectionsHandlerHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, collection_1.getMyCollections)(req.params.authorId);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: user });
}));
exports.getMyCollectionsHandlerHandler = getMyCollectionsHandlerHandler;
const getCollectionById = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield (0, collection_1.findCollectionByIdExtended)(req.params.collectionId);
    if (!collection) {
        return next(new errorResponse_1.default(errorMessages_1.default.notFound, http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: collection });
}));
exports.getCollectionById = getCollectionById;
const updateCollectionImageHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield (0, collection_1.findCollectionById)(req.params.collectionId);
    if (!collection) {
        return next(new errorResponse_1.default(errorMessages_1.default.notFound, http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    const image = yield (0, collection_1.updateCollectionImage)(req.params.collectionId, req.body.image);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: image });
}));
exports.updateCollectionImageHandler = updateCollectionImageHandler;
const getCollectionExtendedHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const collectionDetails = yield (0, collection_1.getCollectionExtended)(req.params.collectionId);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ success: true, data: collectionDetails });
}));
exports.getCollectionExtendedHandler = getCollectionExtendedHandler;
const updateCollectionHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { configs, input } = req.body;
    const collection = yield (0, collection_1.findCollectionById)(req.params.collectionId);
    if (!collection) {
        return next(new errorResponse_1.default(errorMessages_1.default.notFound, http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    yield (0, collection_1.updateCollection)(collection.image, collection.id, configs, input);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: 'collection_updated' });
}));
exports.updateCollectionHandler = updateCollectionHandler;
