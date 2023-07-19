"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEmailMail = exports.generatePasswordMail = void 0;
const generatePasswordMail = ({ email, firstName, lastName, token, userId }) => {
    return {
        from: process.env.EMAIL_FROM,
        subject: 'Reset Password',
        to: email,
        template: 'email',
        context: {
            title: `Reset Password for ${firstName} ${lastName}`,
            message: 'You requested password reset, please follow',
            linkMessage: 'this link',
            extra: 'if this wasnot you, we should increase your security',
            link: `${process.env.MY_APP}/reset-password/${token}?userId=${userId}`,
        }
    };
};
exports.generatePasswordMail = generatePasswordMail;
const generateEmailMail = ({ email, firstName, lastName, token, userId }) => {
    return {
        from: process.env.EMAIL_FROM,
        subject: 'Verify Email',
        to: email,
        template: 'email',
        context: {
            title: `Email Verification for ${firstName} ${lastName}`,
            message: 'You are about to verify your email, please follow',
            linkMessage: 'this link',
            extra: 'if this wasnot you, we should increase your security',
            link: `${process.env.MY_APP}/verify-email/${token}?userId=${userId}`
        }
    };
};
exports.generateEmailMail = generateEmailMail;
