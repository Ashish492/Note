import config from 'config'
import { add } from 'date-fns'
import createHttpError from 'http-errors'
import { omit, pick } from 'lodash'
import { findByEmail } from 'service'
import { User } from 'shared-types'
import { CustomRouteFunction } from 'types'
import { decodedPayload, signJWT, verifyJwt } from 'utils'

export const loginHandler: CustomRouteFunction<
  Pick<User, 'email' | 'password'>
> = async (req, res) => {
  // validate  the user's password
  try {
    const user = await findByEmail(req.body.email)
    if (!user) throw new Error()
    if (!user.comparePassword(req.body.password)) throw new Error('')
    const payload = pick(user.toObject(), ['_id', 'email'])

    const accessToken = await signJWT(payload, {
      expiresIn: config.get('accessTokenTtl'),
    })
    const refreshToken = await signJWT(payload, {
      expiresIn: config.get('refreshTokenTtl'),
    })

    res.cookie('refreshToken', refreshToken, {
      signed: true,
      httpOnly: true,
      expires: add(new Date(), {
        years: 1,
      }),
    })
    res.send({ accessToken, user: payload })
  } catch (error) {
    throw createHttpError(403, 'invalid email or password')
  }
}
export const issueToken: CustomRouteFunction = async (req, res) => {
  const { refreshToken } = req.signedCookies

  if (!refreshToken) throw new createHttpError[403]()
  const { decoded, valid } = await verifyJwt(refreshToken)
  if (valid && decoded) {
    const user = await findByEmail(decoded.email)
    if (user) {
      let payload = pick(user?.toObject(), ['email', '_id'])
      const accessToken = await signJWT(payload, {
        algorithm: 'RS256',
        expiresIn: config.get('accessTokenTtl'),
      })
      return res.json({
        token: accessToken,
        user: omit(payload, ['iat', 'exp']),
      })
    }
  }
  throw new createHttpError[403]()
}
export const logOut: CustomRouteFunction = async (req, res) => {
  res.clearCookie('refreshToken')
  res.json({ success: true, msg: 'logout successfully' })
}
export const validateToken: CustomRouteFunction = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7) // Remove 'Bearer ' from the beginning of the header value
    let payload = await verifyJwt(token)
    if (payload.valid) {
      res.json(payload.decoded)
    } else {
      throw new createHttpError[401]()
    }
  } else {
    // No Bearer token found in the headers
    throw new createHttpError[403]()
  }
}
export const getPayload: CustomRouteFunction = async (req, res) => {
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7)

    // Remove 'Bearer ' from the beginning of the header value
    let payload = await decodedPayload(token)

    res.json(omit(payload, ['iat', 'exp']))
  } else {
    // No Bearer token found in the headers
    throw new createHttpError[403]()
  }
}
