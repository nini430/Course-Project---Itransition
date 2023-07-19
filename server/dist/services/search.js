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
exports.getFullTextSearch = void 0;
const dbConnect_1 = __importDefault(require("../utils/dbConnect"));
const getFullTextSearch = (searchQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, dbConnect_1.default)();
    const userQuery = 'SELECT `id`,`firstName`,`lastName`,`profileImage`,`email` FROM user WHERE MATCH(firstName,lastName,email) AGAINST(? IN BOOLEAN MODE)';
    const collectionQuery = 'SELECT `id`,`name`,`topic`,`description`,`image` FROM collection WHERE MATCH(name,description) AGAINST(? IN BOOLEAN MODE)';
    const itemQuery = 'SELECT `id`,`name`,`tags`,`createdAt`,`updatedAt` FROM item WHERE MATCH(name,tags) AGAINST(? IN BOOLEAN MODE)';
    const commentQuery = 'SELECT `text` AS text,`name`,`tags`,`itemId`,`collectionId` FROM comment c JOIN item i ON c.itemId=i.id  WHERE MATCH(text) AGAINST(? IN BOOLEAN MODE)';
    const [userSearchItems] = yield db.execute(userQuery, [`*${searchQuery}*`]);
    const [collectionSearchItems] = yield db.execute(collectionQuery, [
        `*${searchQuery}*`,
    ]);
    const [itemSearchItems] = yield db.execute(itemQuery, [`*${searchQuery}*`]);
    const [commentSearchItems] = yield db.execute(commentQuery, [
        `*${searchQuery}*`,
    ]);
    return [
        { name: 'user', data: userSearchItems },
        { name: 'collection', data: collectionSearchItems },
        { name: 'item', data: itemSearchItems },
        { name: 'comment', data: commentSearchItems },
    ];
});
exports.getFullTextSearch = getFullTextSearch;
