"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authProtect_1 = __importDefault(require("../middleware/authProtect"));
const comment_1 = require("../controllers/comment");
const router = express_1.default.Router();
router.use(authProtect_1.default);
router.post('/:itemId', comment_1.addCommentHandler);
router.put('/:commentId', comment_1.editCommentHandler);
router.delete('/:commentId', comment_1.removeCommentHandler);
exports.default = router;
