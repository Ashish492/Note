import { NoteDocument, NoteModel } from 'model'
import { FilterQuery, UpdateQuery } from 'mongoose'
import { runService } from 'utils'

import { Note } from '../../../../packages/shared-types/src'

export const insertNote = async (note: Omit<Note, '_id' | 'starred'>) => {
  return runService(() => NoteModel.create(note), 'unable to add note')
}
export const deleteNote = async (id: string) => {
  return runService(
    async () => await NoteModel.findOneAndDelete({ _id: id }),
    'unable to delete note',
  )
}
export const updateNote = async (
  data: UpdateQuery<Note>,
  filter: FilterQuery<Note>,
) => {
  return runService(
    async () => await NoteModel.updateMany(filter, data, { new: true }),
  )
}
export const findNotes = async (filter: FilterQuery<NoteDocument>) => {
  return runService(async () => NoteModel.find(filter))
}
