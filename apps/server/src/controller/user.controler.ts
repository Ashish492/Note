import { createUser } from 'service'
import { User } from 'shared-types'
import { CustomRouteFunction } from 'types'
export const createUserHandler: CustomRouteFunction<Omit<User, '_id'>> = async (
  req,
  res,
) => {
  const user = await createUser(req.body)
  res.json(user)
}
export const getUserByEmailHandler: CustomRouteFunction = async (req, res) => {}
