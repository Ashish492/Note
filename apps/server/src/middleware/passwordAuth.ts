import config from 'config'
import createHttpError from 'http-errors'
import passport from 'passport'
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'
import { findByEmail } from 'service'
import { CustomRouteFunction, JWTPayload } from 'types'

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get('publicKey'),
  algorithms: ['RS256'],
}
passport.use(
  new Strategy(options, async (payload: JWTPayload, done) => {
    try {
      const user = await findByEmail(payload.email)
      if (user) {
        return done(null, payload)
      }
      throw new Error()
    } catch (error) {
      return done(new createHttpError[401]('unauthorize'), false)
    }
  }),
)
export function initializePassport() {
  return passport.initialize()
}
export function auth() {
  const middleware: CustomRouteFunction = (req, res, next) => {
    return passport.authenticate(
      'jwt',
      {
        session: false,
      },
      (err: unknown, user: unknown) => {
        if (err) {
          res.status(401).json({
            message: 'unauthorize',
          })
          // next()
        }
        if (!user) {
          res.status(401).json({
            message: 'unauthorize',
          })
        } else {
          req.user = user!
          next()
        }
      },
    )(req, res, next)
  }
  return middleware
  // return passport.authenticate('jwt', { session: false })
}
export default passport
