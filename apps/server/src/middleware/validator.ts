import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodError } from 'zod'

export const validate =
  (schema: AnyZodObject) =>
  // eslint-disable-next-line consistent-return
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      next()
    } catch (e: any) {
      if (e instanceof ZodError) {
        res.status(500).json(e.errors)
      }
    }
  }
export function bodyValidator(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.strict().parseAsync(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(500).json(error.errors)
      }
      throw error
    }
  }
}
