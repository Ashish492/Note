import config from 'config'
import createHttpError from 'http-errors'
import { omit } from 'lodash'
import { findByEmail } from 'service'
import { User } from 'shared-types'
import { CustomRouteFunction } from 'types'
import { signJWT, verifyJwt } from 'utils'

export const loginHandler: CustomRouteFunction<
  Pick<User, 'email' | 'password'>
> = async (req, res) => {
  // validate  the user's password

  try {
    const user = await findByEmail(req.body.email)
    if (!user) throw new Error()
    if (!user.comparePassword(req.body.password)) throw new Error('')
    const payload = omit(user, ['password', 'name'])
    const accessToken = await signJWT(payload, {
      expiresIn: config.get('accessTokenTtl'),
    })
    const refreshToken = await signJWT(payload, {
      expiresIn: config.get('refreshTokenTtl'),
    })
    res.cookie('refreshToken', refreshToken, {
      signed: true,
      httpOnly: true,
    })
    res.send({ accessToken, user: payload })
  } catch (error) {
    throw createHttpError(401, 'invalid email or password')
  }

  res.send
}
export const issueToken: CustomRouteFunction = async (req, res) => {
  const { refreshToken } = req.signedCookies
  console.log(refreshToken)
  if (!refreshToken) throw new createHttpError[401]()
  const { decoded, valid } = await verifyJwt(refreshToken)
  if (valid && decoded) {
    const user = await findByEmail(decoded.email)
    if (user) {
      const accessToken = signJWT(decoded, {
        algorithm: 'RS256',
        expiresIn: config.get('accessTokenTtl'),
      })
      return res.json({ token: accessToken, user: decoded })
    }
  }
  throw new createHttpError[401]()
}
