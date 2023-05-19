import { UserModel } from 'model'
import { User } from 'shared-types'
import { runService } from 'utils'

export const findByEmail = async (email: string) => UserModel.findOne({ email })
export const createUser = async (user: Omit<User, '_id'>) => {
  return runService(() => UserModel.create(user), 'unable to create user')
}
