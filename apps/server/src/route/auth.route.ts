import { issueToken, loginHandler } from 'controller'
import { Router } from 'express'
import { bodyValidator } from 'middleware'
import { userSchema } from 'shared-types'
import { customRouteFunction } from 'utils'

const authRouter = Router()
authRouter.route('/login').post(
  bodyValidator(
    userSchema.omit({
      _id: true,
      name: true,
    }),
  ),
  customRouteFunction(loginHandler),
)
authRouter.route('/refresh').get(customRouteFunction(issueToken))
export default authRouter
