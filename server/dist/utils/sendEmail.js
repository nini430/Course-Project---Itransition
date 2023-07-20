"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const sendEmail = (mailOptions) => {
    const transporter = nodemailer_1.default.createTransport({
        service: process.env.EMAIL_SERVICE_NAME,
        auth: {
            user: process.env.EMAIL_SERVICE_AUTH,
            pass: process.env.EMAIL_SERVICE_PASSWORD
        }
    });
    const hbsOptions = {
        viewEngine: {
            extName: '.handlebars',
            partialsDir: path_1.default.resolve('./templates'),
            defaultLayout: false,
        },
        viewPath: path_1.default.resolve('./templates'),
        extName: '.handlebars',
    };
    transporter.use('compile', (0, nodemailer_express_handlebars_1.default)(hbsOptions));
    transporter.sendMail(mailOptions);
};
exports.default = sendEmail;
