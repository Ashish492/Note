import createHttpError from 'http-errors'
import { isEmpty } from 'lodash'
import { Document } from 'mongoose'
import { deleteNote, findNotes, insertNote, updateNote } from 'service'
import { Note } from 'shared-types'
import { CustomRouteFunction, JWTPayload } from 'types'

export const getNotes: CustomRouteFunction = async (req, response) => {
  const user = req.user as JWTPayload
  const notes = await findNotes({ user: user._id })
  response.json(notes ?? [])
}
export const getNoteById: CustomRouteFunction<
  unknown,
  { _id: string }
> = async (req, res) => {
  const user = req.user as JWTPayload
  const note = await findNotes({ user: user._id, _id: req.params._id })

  if (isEmpty(note)) {
    throw new createHttpError[404]()
  }

  res.json((note as Document<Note>[])[0])
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
  const note = await updateNote(req.body, req.params._id)
  console.log(note)
  res.json(note)
}
export const createNoteHandler: CustomRouteFunction<
  Omit<Note, '_id' | 'starred'>
> = async (req, res) => {
  const note = await insertNote(req.body)
  res.json(note)
  // res.status(500).json({ msg: 'internal server error' })
}
