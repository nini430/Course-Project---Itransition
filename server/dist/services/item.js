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
exports.removeItems = exports.sortItem = exports.filterItem = exports.getMyItems = exports.editItem = exports.removeItem = exports.getItemByIdExtended = exports.getItemById = exports.getLatestItems = exports.getAllUniqueItemTags = exports.addItem = exports.initializeItemCreation = void 0;
const commonQueryObjs_1 = require("../utils/commonQueryObjs");
const formatterFns_1 = require("../utils/formatterFns");
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const initializeItemCreation = (collectionId) => __awaiter(void 0, void 0, void 0, function* () {
    let customItemFields = {};
    const integerFields = yield prismaClient_1.default.integerField.findMany({
        where: { collectionId },
    });
    const stringFields = yield prismaClient_1.default.stringField.findMany({
        where: { collectionId },
    });
    const booleanFields = yield prismaClient_1.default.booleanCheckboxField.findMany({
        where: { collectionId },
    });
    const multilineFields = yield prismaClient_1.default.multilineTextField.findMany({
        where: { collectionId },
    });
    const dateFields = yield prismaClient_1.default.dateField.findMany({
        where: { collectionId },
    });
    customItemFields['integer'] = integerFields;
    customItemFields['string'] = stringFields;
    customItemFields['boolean'] = booleanFields;
    customItemFields['multiline'] = multilineFields;
    customItemFields['date'] = dateFields;
    return customItemFields;
});
exports.initializeItemCreation = initializeItemCreation;
const addItem = (collectionId, input) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, tags, customFieldValues } = input;
    const newItem = yield prismaClient_1.default.item.create({
        data: {
            name,
            tags,
            customFieldValues,
            collectionId,
        },
    });
    return newItem;
});
exports.addItem = addItem;
const getAllUniqueItemTags = () => __awaiter(void 0, void 0, void 0, function* () {
    const tags = Array.from(new Set((yield prismaClient_1.default.item.findMany({ select: { tags: true } }))
        .map((item) => item.tags)
        .map((item) => item.split(','))
        .flat()));
    return tags;
});
exports.getAllUniqueItemTags = getAllUniqueItemTags;
const getLatestItems = () => __awaiter(void 0, void 0, void 0, function* () {
    const latestItems = yield prismaClient_1.default.item.findMany({
        take: 5,
        orderBy: { updatedAt: 'desc' },
        include: {
            collection: {
                include: {
                    author: {
                        select: commonQueryObjs_1.simpleUser,
                    },
                },
            },
        },
    });
    return latestItems;
});
exports.getLatestItems = getLatestItems;
const getItemById = (itemId) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield prismaClient_1.default.item.findUnique({
        where: { id: itemId },
        include: { collection: { select: { authorId: true } } },
    });
    return item;
});
exports.getItemById = getItemById;
const getItemByIdExtended = (itemId) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield prismaClient_1.default.item.findUnique({
        where: { id: itemId },
        include: {
            collection: {
                include: {
                    author: {
                        select: commonQueryObjs_1.simpleUser,
                    },
                },
            },
            comments: {
                include: {
                    author: {
                        select: commonQueryObjs_1.simpleUser,
                    },
                    reactions: {
                        include: {
                            user: {
                                select: commonQueryObjs_1.simpleUser,
                            },
                        },
                    },
                },
            },
            reactions: {
                include: {
                    user: {
                        select: commonQueryObjs_1.simpleUser,
                    },
                },
            },
        },
    });
    return item;
});
exports.getItemByIdExtended = getItemByIdExtended;
const removeItem = (itemId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.item.delete({ where: { id: itemId } });
});
exports.removeItem = removeItem;
const removeItems = (itemIds) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.item.deleteMany({ where: { id: { in: itemIds } } });
});
exports.removeItems = removeItems;
const editItem = (input, itemId) => __awaiter(void 0, void 0, void 0, function* () {
    const { customFieldValues, name, tags } = input;
    const updatedItem = yield prismaClient_1.default.item.update({
        data: { name, tags, customFieldValues },
        where: { id: itemId },
    });
    return updatedItem;
});
exports.editItem = editItem;
const getMyItems = (collectionId) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield prismaClient_1.default.item.findMany({
        where: { collectionId },
        include: {
            collection: {
                include: {
                    author: {
                        select: commonQueryObjs_1.simpleUser
                    }
                }
            },
            reactions: {
                include: {
                    user: {
                        select: commonQueryObjs_1.simpleUser,
                    },
                },
            },
            comments: {
                include: {
                    author: {
                        select: commonQueryObjs_1.simpleUser,
                    },
                },
            },
        },
    });
    return (0, formatterFns_1.itemTableFormatter)(items);
});
exports.getMyItems = getMyItems;
const filterItem = (filter, collectionId) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield prismaClient_1.default.item.findMany({
        where: {
            OR: [
                { name: { contains: filter } },
                { tags: { contains: filter } },
            ],
            collectionId
        },
        include: {
            collection: {
                include: {
                    author: {
                        select: {
                            firstName: true,
                            lastName: true,
                            profileImage: true,
                            id: true
                        }
                    }
                }
            },
            reactions: {
                include: {
                    user: {
                        select: commonQueryObjs_1.simpleUser
                    }
                }
            },
            comments: {
                include: {
                    author: {
                        select: commonQueryObjs_1.simpleUser
                    }
                }
            }
        }
    });
    return (0, formatterFns_1.itemTableFormatter)(items);
});
exports.filterItem = filterItem;
const sortItem = (sortCol, sortDir, collectionId) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield prismaClient_1.default.item.findMany({ where: {
            collectionId,
        }, include: {
            collection: {
                include: {
                    author: {
                        select: commonQueryObjs_1.simpleUser
                    }
                }
            },
            comments: {
                include: {
                    author: {
                        select: commonQueryObjs_1.simpleUser
                    }
                }
            },
            reactions: {
                include: {
                    user: {
                        select: commonQueryObjs_1.simpleUser
                    }
                }
            }
        },
        orderBy: {
            [sortCol]: sortDir
        }
    });
    return (0, formatterFns_1.itemTableFormatter)(items);
});
exports.sortItem = sortItem;
