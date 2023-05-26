import { createUserHandler } from 'controller'
import { Router } from 'express'
import { bodyValidator } from 'middleware'
import { customRouteFunction } from 'utils'

import { userSchema } from '../../../../packages/shared-types/src'

const userRouter = Router()
userRouter.route('/').post(
  bodyValidator(
    userSchema.omit({
      _id: true,
    }),
  ),
  customRouteFunction(createUserHandler),
)
export default userRouter
