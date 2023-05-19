import { compare, genSalt, hashSync } from 'bcrypt'
import config from 'config'
import { Document, model, Schema } from 'mongoose'
import { User } from 'shared-types'

export type UserDocument = User &
  Document & {
    comparePassword: (candidatePassword: string) => Promise<boolean>
  }
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)
// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  const user = this as unknown as UserDocument
  if (!user.isModified('password')) {
    return next()
  }
  const salt = await genSalt(config.get<number>('saltWorkFactor'))
  const hash = await hashSync(user.password, salt)
  user.password = hash
  return next()
})
// eslint-disable-next-line func-names
userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  const user = this as UserDocument
  return compare(candidatePassword, user.password).catch(() => false)
}
export const UserModel = model<UserDocument>('user', userSchema)
