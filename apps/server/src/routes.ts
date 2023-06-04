import { Application, ErrorRequestHandler } from 'express'
import createHttpError from 'http-errors'
import { auth } from 'middleware'
import { AuthRoute, NoteRoute, UserRoute } from 'route'
import { ZodError } from 'zod'

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  if (err instanceof ZodError) {
    res.status(400)
    res.json(err.issues)
  }
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token')
  }
  res.status(err?.statusCode ?? err?.code ?? 500)
  res.json({
    success: false,
    message: err.message ?? 'failed',
  })
}
export default function routes(app: Application) {
  app.use('/user', UserRoute)
  app.use('/note', auth(), NoteRoute)
  app.use('/auth', AuthRoute)
  app.use(() => {
    throw new createHttpError[404]()
  })
}
