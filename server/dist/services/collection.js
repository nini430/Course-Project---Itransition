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
exports.updateCollection = exports.getCollectionExtended = exports.updateCollectionImage = exports.findCollectionByIdExtended = exports.getMyCollections = exports.removeCollection = exports.findCollectionById = exports.getTopLargestCollections = exports.addItemConfigs = exports.addCollection = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const common_1 = require("./common");
const addCollection = (input, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, description, topic, image } = input;
    if (image) {
        image = yield (0, common_1.uploadImage)(image);
    }
    try {
        const newCollection = yield prismaClient_1.default.collection.create({
            data: { name, description, topic, image, authorId },
        });
        return newCollection;
    }
    catch (err) {
        console.log(err);
    }
});
exports.addCollection = addCollection;
const addItemConfigs = (itemConfigs, collectionId) => __awaiter(void 0, void 0, void 0, function* () {
    for (const fields in itemConfigs) {
        const actualValues = Object.values(itemConfigs[fields]);
        yield Promise.all(actualValues.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            yield prismaClient_1.default[fields].create({
                data: { name: item, collectionId },
            });
        })));
    }
});
exports.addItemConfigs = addItemConfigs;
const getTopLargestCollections = () => __awaiter(void 0, void 0, void 0, function* () {
    const largestCollections = yield prismaClient_1.default.collection.findMany({
        take: 5,
        orderBy: { items: { _count: 'desc' } },
        include: {
            items: true,
            author: {
                select: {
                    firstName: true,
                    lastName: true,
                    id: true,
                    profileImage: true,
                },
            },
        },
    });
    return largestCollections;
});
exports.getTopLargestCollections = getTopLargestCollections;
const getMyCollections = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const collectionsInfo = yield prismaClient_1.default.user.findUnique({
        where: { id: userId },
        select: {
            collections: {
                include: {
                    items: { select: { name: true } },
                    author: {
                        select: {
                            firstName: true,
                            lastName: true,
                            role: true,
                            profileImage: true,
                            id: true,
                        },
                    },
                },
            },
        },
    });
    return collectionsInfo;
});
exports.getMyCollections = getMyCollections;
const findCollectionById = (collectionId) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield prismaClient_1.default.collection.findUnique({
        where: { id: collectionId },
    });
    return collection;
});
exports.findCollectionById = findCollectionById;
const findCollectionByIdExtended = (collectionId) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield prismaClient_1.default.collection.findUnique({
        where: { id: collectionId },
        include: {
            items: true,
            author: {
                select: {
                    firstName: true,
                    lastName: true,
                    id: true,
                    profileImage: true,
                    collections: { select: { name: true } },
                },
            },
        },
    });
    return collection;
});
exports.findCollectionByIdExtended = findCollectionByIdExtended;
const removeCollection = (collectionId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.collection.delete({ where: { id: collectionId } });
});
exports.removeCollection = removeCollection;
const updateCollectionImage = (collectionId, imageBase64) => __awaiter(void 0, void 0, void 0, function* () {
    const image = yield (0, common_1.uploadImage)(imageBase64);
    yield prismaClient_1.default.collection.update({
        data: { image },
        where: { id: collectionId },
    });
    return image;
});
exports.updateCollectionImage = updateCollectionImage;
const getCollectionExtended = (collectionId) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield prismaClient_1.default.collection.findUnique({
        where: { id: collectionId },
        select: { name: true, description: true, topic: true, image: true },
    });
    const integerField = yield prismaClient_1.default.integerField.findMany({
        where: { collectionId },
    });
    const dateField = yield prismaClient_1.default.dateField.findMany({
        where: { collectionId },
    });
    const multilineTextField = yield prismaClient_1.default.multilineTextField.findMany({
        where: { collectionId },
    });
    const booleanCheckboxField = yield prismaClient_1.default.booleanCheckboxField.findMany({
        where: { collectionId },
    });
    const stringField = yield prismaClient_1.default.stringField.findMany({
        where: { collectionId },
    });
    return {
        collection,
        integerField,
        dateField,
        multilineTextField,
        booleanCheckboxField,
        stringField,
    };
});
exports.getCollectionExtended = getCollectionExtended;
const updateConfig = (configs) => __awaiter(void 0, void 0, void 0, function* () {
    for (const fields in configs) {
        yield Promise.all(configs[fields].map((item) => __awaiter(void 0, void 0, void 0, function* () {
            yield prismaClient_1.default[fields].update({
                data: { name: item.name },
                where: { id: item.id },
            });
        })));
    }
});
const updateCollection = (collectionImage, collectionId, configs, input) => __awaiter(void 0, void 0, void 0, function* () {
    let updatedImage = collectionImage;
    if (input.image) {
        updatedImage = yield (0, common_1.uploadImage)(input.image);
    }
    yield prismaClient_1.default.collection.update({
        data: {
            image: updatedImage,
            description: input.description,
            topic: input.topic,
            name: input.name,
        },
        where: { id: collectionId },
    });
    yield updateConfig(configs);
});
exports.updateCollection = updateCollection;
