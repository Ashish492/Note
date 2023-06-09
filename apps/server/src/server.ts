import { json, urlencoded } from 'body-parser'
import config from 'config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, ErrorRequestHandler } from 'express'
import helmet from 'helmet'
import { initializePassport } from 'middleware'
import morgan from 'morgan'
import { ZodError } from 'zod'

import routes from './routes'

const app: Application = express()
app.use(
  cors({
    // origin: 'http://localhost:5173', // Replace with the actual origin that should be allowed
    // credentials: true, // Enable credentials (e.g., cookies, authorization headers)
    // methods: ['GET', 'HEAD', 'PUT', 'patch', 'POST', 'DELETE'],
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'PUT', 'UPDATE', 'PATCH', 'DELETE'],
    // preflightContinue: true,
  }),
)
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cookieParser(config.get('cookieSecret')))
app.use(morgan('dev'))
app.use(helmet())
app.use(initializePassport())
const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
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
routes(app)
app.use(errorHandler)
export default app
