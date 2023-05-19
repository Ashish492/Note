import { Application, NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { auth } from 'middleware'
import { AuthRoute, NoteRoute, UserRoute } from 'route'

export default function routes(app: Application) {
  app.use('/user', UserRoute)
  app.use('/note', auth(), NoteRoute)
  app.use('/auth', AuthRoute)
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound())
  })
}
