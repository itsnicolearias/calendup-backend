import Boom from "@hapi/boom";
import { Profile } from "../../models/profile";
import BaseService from "../base/base.service";
import { User } from "../../models/user";
import { UserWithProfile } from "./profile.interface";

class ProfileService extends BaseService {
  constructor() {
    super(Profile);
  }

  async getAll(professionalId?: string | null, includeModel?: object, page?: number, size?: number, all?: boolean, where?: Record<string, unknown>, ): Promise<any> {
      try {
        return await super.getAll(professionalId, includeModel, page, size, all, where)
      } catch (error) {
        throw Boom.badRequest(error)
      }
  }

  async getOneProfile(userId :string): Promise<User> {
      try {
        const user = await User.findOne({
            where: { userId: userId},
            include: Profile
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