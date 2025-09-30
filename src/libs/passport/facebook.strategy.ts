import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { config } from "../../config/environments";
import { User } from "../../models/user";
import { UserRole } from "../../modules/auth/auth.interface";
import { CreateFreeSubscription } from "../../utils/createFreeSubscription";
import { newUsersNotification } from "../../utils/newUsersNotification";
import { accountActivatedTemplate } from "../../templates/auth/accountActivated";
import { sendEmailGoogle } from "../gmail";

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

          const sub = await CreateFreeSubscription(user);

          await sendEmailGoogle({
              to: user.email, 
              subject: 'Tu cuenta ha sido activada exitosamente 📅', 
              html: accountActivatedTemplate()
          })

          await newUsersNotification(user.profile.name!, sub.freePlan.name, user.profile.lastName)
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
