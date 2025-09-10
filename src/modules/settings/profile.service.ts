import Boom from "@hapi/boom";
import { Profile } from "../../models/profile";
import BaseService from "../base/base.service";
import { User } from "../../models/user";
import { IProfileService, UserWithProfile } from "./profile.interface";
import { AppointmentType } from "../../models/appointment_type";

class ProfileService extends BaseService<Profile> implements IProfileService {
  constructor() {
    super(Profile);
  }

  async getOneProfile(userId :string): Promise<User> {
      try {
        const user = await User.findOne({
            where: { userId: userId},
            include: [Profile, AppointmentType]
        })

        if (!user) {
            throw Boom.notFound("User not found");
        }

        return user;
      } catch (error) {
        throw Boom.badRequest(error)
      }
  }

  async updateProfile(body: UserWithProfile, userId: string): Promise<User> {
      try {
         const user = await Profile.findOne({
            where: { userId: userId }
         })
         if (!user) {
            throw Boom.notFound("Profile not found");
        }

         await user.update(body)

         /*if (profile.profile.name && profile.profile.lastName && profile.profile.jobTitle && profile.profile.availability && profile.profile.city && profile.profile.country && profile.profile.province){
          await user.update({profileCompleted: true})
         }*/

         const requiredFields = [
          "name",
          "lastName",
          "jobTitle",
          "availability",
          "city",
          "country",
          "province",
        ];

        const completedFields = requiredFields.filter((field) => !!user[field as keyof Profile]);
        const progress = Math.round((completedFields.length / requiredFields.length) * 100);

        await user.update({
          profileProgress: progress,
          profileCompleted: completedFields.length === requiredFields.length,
        });

        const profile = await this.getOneProfile(userId)

        return profile;
      } catch (error) {
        throw Boom.badRequest(error)
      }
  }
}
  export default new ProfileService();