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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const auth_1 = require("../services/auth");
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((userId, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, auth_1.findUserById)(userId);
    done(null, user);
}));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/v1/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    const { displayName, photos, emails, id } = profile;
    const user = yield prismaClient_1.default.user.findFirst({
        where: { googleId: profile.id },
    });
    if (user) {
        done(null, user);
    }
    else {
        const user = yield prismaClient_1.default.user.create({
            data: {
                firstName: displayName.split(' ')[0],
                lastName: displayName.split(' ')[1],
                email: emails === null || emails === void 0 ? void 0 : emails[0].value,
                social: 'GOOGLE',
                googleId: id,
                profileImage: photos === null || photos === void 0 ? void 0 : photos[0].value,
                isEmailVerified: true,
            },
        });
        done(null, user);
    }
})));
