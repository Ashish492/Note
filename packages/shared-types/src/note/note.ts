import { z } from 'zod'

export const NoteSchema = z.object({
  title: z.string({ required_error: 'title required' }).nonempty().trim(),
  user: z.string({ required_error: 'user id required' }),
  body: z.string({ required_error: 'body is required' }).nonempty().trim(),
  starred: z.boolean(),
  _id: z.string(),
})
export type Note = z.infer<typeof NoteSchema>
