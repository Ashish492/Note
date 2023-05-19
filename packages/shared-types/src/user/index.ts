import { z } from 'zod'

function validatePassword(password: string) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/
  return passwordRegex.test(password)
}
export const userSchema = z.object({
  _id: z.string({ required_error: 'id is required' }),
  email: z
    .string({ required_error: 'email is required' })
    .email({ message: 'require valid email' }),
  password: z
    .string({ required_error: 'password is required' })
    .refine(validatePassword, {
      message:
        'Password must contain at least 8 characters, including uppercase and lowercase letters, numbers, and special characters.',
    }),
  name:z.string({required_error:"name is required"})
})
export type User = z.infer<typeof userSchema>
