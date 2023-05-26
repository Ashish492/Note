import { UserModel } from 'model'
import { runService } from 'utils'
import { User } from '../../../../packages/shared-types/src'
export const findByEmail = async (email: string) => UserModel.findOne({ email })
export const createUser = async (user: Omit<User, '_id'>) => {
  return runService(() => UserModel.create(user), 'unable to create user')
}
