import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import client from '../utils/prismaClient';
import { findUserById } from '../services/auth';

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async(userId, done) => {
  const user=await findUserById(userId as string);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: '/api/v1/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const { displayName, photos, emails, id } = profile;
      const user = await client.user.findFirst({
        where: { googleId: profile.id },
      });
      if (user) {
        done(null, user);
      } else {
        const user = await client.user.create({
          data: {
            firstName: displayName.split(' ')[0],
            lastName: displayName.split(' ')[1],
            email: emails?.[0].value as string,
            social: 'GOOGLE',
            googleId: id,
            profileImage: photos?.[0].value as string,
            isEmailVerified: true,
            phoneNumber:'none',
            phoneCountryCode:'none'
          },
        });
        done(null, user);
      }
    }
  )
);

