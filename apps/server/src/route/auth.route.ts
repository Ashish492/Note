import { issueToken, loginHandler, validateToken } from 'controller'
import { Router } from 'express'
import { bodyValidator } from 'middleware'
import { customRouteFunction } from 'utils'

import { userSchema } from '../../../../packages/shared-types/src'

const authRouter = Router()
authRouter.route('/login').post(
  bodyValidator(
    userSchema.pick({
      email: true,
      password: true,
    }),
  ),
  customRouteFunction(loginHandler),
)
authRouter.route('/refresh').get(customRouteFunction(issueToken))
authRouter.route('/validate').get(customRouteFunction(validateToken))
export default authRouter
