import { Document, model, Schema } from 'mongoose'
import { Note } from 'shared-types'

export type NoteDocument = Note & Document
const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    starred: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    validateBeforeSave: true,
  },
)
export const NoteModel = model<NoteDocument>('note', noteSchema)
