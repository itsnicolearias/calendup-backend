import passport from "passport";
import { Strategy as GoogleStrategy, Profile, StrategyOptions, VerifyCallback } from "passport-google-oauth20";
import { User } from "../../models/user"; 
import { config } from "../../config/environments";
import { UserRole } from "../../modules/auth/auth.interface";
import { CreateFreeSubscription } from "../../utils/createFreeSubscription";
import { newUsersNotification } from "../../utils/newUsersNotification";

const options: StrategyOptions = {
  clientID: config.googleClientId!,
  clientSecret: config.googleClientSecret!,
  callbackURL: config.googleCallbackUrl,
};

passport.use(
  new GoogleStrategy(options,
    async function (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
      try {
        let user = await User.findOne({ where: { googleId: profile.id } });

        if (!user) {
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

          const sub = await CreateFreeSubscription(user)
          await newUsersNotification(user.profile.name!, sub.freePlan.name, user.profile.lastName)
        }

        return done(null, user);
      } catch (error) {
        return done(error, undefined);
      }
    }
  )
);
