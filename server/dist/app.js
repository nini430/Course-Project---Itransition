"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_handlebars_1 = require("express-handlebars");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const api_1 = __importDefault(require("./routes/api"));
require("./passport/passport-setup");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const authProtect_1 = __importDefault(require("./middleware/authProtect"));
const passport_1 = __importDefault(require("passport"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ limit: '10mb', extended: true }));
const corsOptions = { origin: true, credentials: true };
app.use((0, cors_1.default)(corsOptions));
app.options('*', (0, cors_1.default)(corsOptions));
app.use((0, morgan_1.default)('dev'));
app.use((0, express_session_1.default)({
    secret: 'lala',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.engine('handlebars', (0, express_handlebars_1.engine)());
app.set('view engine', 'handlebars');
app.use('/api/v1', api_1.default);
app.get('/api/v1/test', authProtect_1.default, (req, response) => {
    return response
        .status(200)
        .json({ success: true, data: 'test_success', user: req.user });
});
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
app.get('/*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'public', 'index.html'));
});
app.use(errorHandler_1.default);
exports.default = app;
