// src/middlewares/validate.ts
import { ZodType } from "zod"
import { Request, Response, NextFunction } from "express"
import  Boom from "@hapi/boom"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validate = (schema: ZodType<any>, property: "body" | "query" | "params") => (req: Request, _res: Response, next: NextFunction) => {
  try {
    req[property] = schema.parse(req[property])
    next()
  } catch (error) {
    throw Boom.badRequest("Validation Error", error.message);
  }
}
