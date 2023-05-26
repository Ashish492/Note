import { omit } from 'lodash'
import { createUser } from 'service'
import { User } from 'shared-types'
import { CustomRouteFunction } from 'types'

export const createUserHandler: CustomRouteFunction<Omit<User, '_id'>> = async (
  req,
  res,
) => {
  let user = await createUser(req.body)

  res.json(omit(user!, ['password', '_v']))
}
export const getUserByEmailHandler: CustomRouteFunction = async (req, res) => {}
