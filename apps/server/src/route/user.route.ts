import { createUserHandler } from 'controller'
import { Router } from 'express'
import { bodyValidator } from 'middleware'
import { userSchema } from 'shared-types'
import { customRouteFunction } from 'utils'

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
