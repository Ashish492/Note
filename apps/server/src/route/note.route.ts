import {
  createNoteHandler,
  deleteNoteHandler,
  getNotes,
  updateNoteHandler,
} from 'controller'
import { Router } from 'express'
import { bodyValidator } from 'middleware'
import { NoteSchema } from 'shared-types'
import { customRouteFunction } from 'utils'

const noteRouter = Router()
noteRouter
  .route('/')
  .get(customRouteFunction(getNotes))
  .patch(
    bodyValidator(NoteSchema.partial().omit({ _id: true })),
    customRouteFunction(updateNoteHandler),
  )
  .post(
    bodyValidator(
      NoteSchema.omit({
        _id: true,
        starred: true,
      }),
    ),
    customRouteFunction(createNoteHandler),
  )
noteRouter.route(':_id').delete(customRouteFunction(deleteNoteHandler))
export default noteRouter
