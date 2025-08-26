import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { config } from "../../config/environments";
import { User } from "../../models/user";
import { UserRole } from "../../modules/auth/auth.interface";

passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebookClientId!,
      clientSecret: config.facebookClientSecret!,
      callbackURL: config.facebookCallbackUrl!,
      profileFields: ["id", "emails", "name", "picture.type(large)"],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        let user = await User.findOne({ where: { email } });

        if (!user) {
          user = await User.create({
            email,
            facebookId: profile.id,
            verified: true,
            role: UserRole.PROFESSIONAL,   
            profile: {
               name: profile.name?.givenName || "",
               lastName: profile.name?.familyName || "", 
            }
          }, {
            include: ["profile"]
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
