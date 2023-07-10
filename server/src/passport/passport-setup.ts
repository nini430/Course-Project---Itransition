import passport from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'


passport.serializeUser((user:any,done)=>{
    done(null,user.id);
})

passport.deserializeUser((userId,done)=>{
    done(null,)
})

passport.use(new GoogleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID as string,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL:'/api/v1/auth/google/callback'
},(accessToken,refreshToken,profile,done)=>{
       done(null,profile);
}))