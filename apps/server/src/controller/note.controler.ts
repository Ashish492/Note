import { deleteNote, findNotes, updateNote } from 'service'
import { Note } from 'shared-types'
import { CustomRouteFunction, JWTPayload } from 'types'

export const getNotes: CustomRouteFunction = async (req, response) => {
  const user = req.user as JWTPayload
  console.log(user)
  const notes = await findNotes({ user: user._id })
  console.log(notes)
  response.json(notes ?? [])
}
export const deleteNoteHandler: CustomRouteFunction<
  unknown,
  Pick<Note, '_id'>
> = async (req, res) => {
  const note = await deleteNote(req.params._id)
  res.json(note)
}
export const updateNoteHandler: CustomRouteFunction<
  Omit<Note, '_id' | 'user'>,
  Pick<Note, '_id'>
> = async (req, res) => {
  const note = await updateNote({ _id: req.params._id }, req.body)
  res.json(note)
}
export const createNoteHandler: CustomRouteFunction<
  Omit<Note, '_id' | 'starred'>
> = async (req, res) => {
  // const note = await insertNote(req.body)
  // res.json(note)
  res.status(500).json({ msg: 'internal server error' })
}
