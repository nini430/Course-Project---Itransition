"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const authProtect_1 = __importDefault(require("../middleware/authProtect"));
const router = express_1.default.Router();
router.get('/:userId', user_1.getUserByIdHandler);
router.use(authProtect_1.default);
router.put('/:followerId/:followedId', user_1.toggleFollowUser);
exports.default = router;
