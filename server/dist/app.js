"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const api_1 = __importDefault(require("./routes/api"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1', api_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
app.get('/*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'public', 'index.html'));
});
app.use(errorHandler_1.default);
exports.default = app;
