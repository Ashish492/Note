import config from 'config'
import jwt from 'jsonwebtoken'

import { JWTPayload } from '../types'

export const signJWT = async (
  object: Record<string, unknown>,
  options?: jwt.SignOptions,
) =>
  jwt.sign(object, config.get<string>('privateKey'), {
    ...options,
    algorithm: 'RS256',
  })
export const verifyJwt = async (token: string) => {
  try {
    const decoded = (await jwt.verify(token, config.get<string>('publicKey'), {
      algorithms: ['RS256'],
    })) as JWTPayload
    return { decoded, expired: false, valid: true }
  } catch (error: unknown) {
    return {
      valid: false,
      expired: (<Error>error).message === 'jwt expired',
      decoded: null,
    }
  }
}
