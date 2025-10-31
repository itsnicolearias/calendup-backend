/* eslint-disable no-unsafe-optional-chaining */
import { Request, Response, NextFunction } from "express"
import { JwtPayload } from "jsonwebtoken";
import ProfileService from "./profile.service";
import { User } from "../../../models/user";

declare global {
  namespace Express {
    interface Request {
      myUser?: JwtPayload;
    }
  }
}


export const getAllProfiles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, size, all } = req.query;
    const allRecords: boolean = all === 'true';

    const profiles = await ProfileService.getAll(null, User, Number(page), Number(size), allRecords)
    res.json(profiles)
  } catch (error) {
    next(error)
  }
}

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req?.myUser?.userId;
    const profile = await ProfileService.getOneProfile(userId)
    res.json(profile)
  } catch (error) {
    next(error)
  }
}

export const createProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body
    const newProfile = await ProfileService.create(data)
    res.status(201).json(newProfile)
  } catch (error) {
    next(error)
  }
}

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req?.myUser?.userId;
    const data = req.body

    const updated = await ProfileService.updateProfile(data, userId)
    res.json(updated)
  } catch (error) {
    next(error)
  }
}

export const deleteProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.myUser?.userId;
    await ProfileService.delete({ profileId: id})
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}
