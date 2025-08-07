// src/middlewares/validate.ts
import { ZodType } from "zod"
import { Request, Response, NextFunction } from "express"
import  Boom from "@hapi/boom"

export const validate = (schema: ZodType<any>, property: "body" | "query" | "params") => (req: Request, res: Response, next: NextFunction) => {
  try {
    req[property] = schema.parse(req[property])
    next()
  } catch (error) {
    throw Boom.badRequest("Validation Error", error.message);
  }
}
