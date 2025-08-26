import passport from "passport";
import { Strategy as GoogleStrategy, Profile, StrategyOptionsWithRequest, VerifyCallback } from "passport-google-oauth20";
import { User } from "../../../models/user"; 
import { config } from "../../../config/environments";
import { Request } from "express";
import { UserRole } from "../../../modules/auth/auth.interface";

const options: StrategyOptionsWithRequest = {
  clientID: config.googleClientId!,
  clientSecret: config.googleClientSecret!,
  callbackURL: config.googleCallbackUrl,
  passReqToCallback: true,
};

passport.use(
  new GoogleStrategy(options,
    async function (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
      try {
        // Buscar usuario por Google ID
        let user = await User.findOne({ where: { googleId: profile.id } });

        if (!user) {
          // Si no existe, crearlo
          user = await User.create({
            googleId: profile.id,
            email: profile.emails?.[0]?.value,
            verified: true,
            role: UserRole.PROFESSIONAL,     
            profile: {
               name: profile.name?.givenName,
               lastName: profile.name?.familyName, 
            }
          }, {
            include: ["profile"]
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, undefined);
      }
    }
  )
);
