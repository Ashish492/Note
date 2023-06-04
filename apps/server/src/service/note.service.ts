import { NoteDocument, NoteModel } from 'model'
import { FilterQuery, UpdateQuery } from 'mongoose'
import { runService } from 'utils'

import { Note } from '../../../../packages/shared-types/src'

export const insertNote = async (note: Omit<Note, '_id' | 'starred'>) => {
  console.log(note)

  return runService(() => NoteModel.create(note), 'unable to add note')
}
export const deleteNote = async (id: string) => {
  return runService(
    async () => await NoteModel.findByIdAndDelete(id),
    'unable to delete note',
  )
}
export const updateNote = async (data: UpdateQuery<Note>, id: string) => {
  return runService(
    async () => await NoteModel.findByIdAndUpdate(id, data, { new: true }),
  )
}
export const findNotes = async (filter: FilterQuery<NoteDocument>) => {
  return runService(async () => NoteModel.find(filter))
}
