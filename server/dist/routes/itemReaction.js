"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authProtect_1 = __importDefault(require("../middleware/authProtect"));
const itemReaction_1 = require("../controllers/itemReaction");
const router = express_1.default.Router();
router.use(authProtect_1.default);
router.post('/:itemId', itemReaction_1.addReactionHandler);
router.delete('/:reactionId', itemReaction_1.unreactItemHandler);
exports.default = router;
