"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authProtect_1 = __importDefault(require("../middleware/authProtect"));
const commentReaction_1 = require("../controllers/commentReaction");
const router = express_1.default.Router();
router.use(authProtect_1.default);
router.post('/:commentId', commentReaction_1.addCommentReactionHandler);
router.delete('/:reactionId', commentReaction_1.unreactCommentReactionHandler);
exports.default = router;
