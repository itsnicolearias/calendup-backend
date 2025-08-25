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

         return await this.getOneProfile(userId)
      } catch (error) {
        throw Boom.badRequest(error)
      }
  }
}
  export default new ProfileService();