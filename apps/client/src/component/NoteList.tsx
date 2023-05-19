import {
  FC,
  Fragment,
} from 'react'

import { SubmitHandler } from 'react-hook-form'
import { Note } from 'shared-types'

import { setAlert } from '../app/features/alert'
import { useUpdateNoteMutation } from '../app/features/note/noteSlice'
import { useAppDispatch } from '../hook'
import EditNote from './EditNote'
import NoteCard from './NoteCard'

type Props = {
  notes: Note[]
}
const NoteList: FC<Props> = ({ notes }) => {
  const dispatch = useAppDispatch()
  const onDelete = (id: string) => {}
  const onStarredClick = (id: String) => {}
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation()
  const editDataHandler = (id: string) => {
    let onSubmit: SubmitHandler<Pick<Note, 'title' | 'body'>> = data => {
      updateNote({ body: data, id })
      if (isSuccess)
        dispatch(setAlert({ message: 'note edited', type: 'success' }))
      if (isError)
        dispatch(setAlert({ message: (error as Error).message, type: 'error' }))
    }
    return onSubmit
  }

  return (
    <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
      <div className="-m-1 flex flex-wrap md:-m-2">
        {notes.map((note, key) => (
          <Fragment key={key}>
            <EditNote {...{ note }} onSubmit={editDataHandler(note._id)} />
            <NoteCard {...{ note, onDelete, onStarredClick }} key={key} />
          </Fragment>
        ))}
      </div>
    </div>
  )
}
export default NoteList
