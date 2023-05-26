import { FC } from 'react'

import { SubmitHandler } from 'react-hook-form'

import { Note } from '../../../../packages/shared-types/src'
import { setAlert } from '../app/features/alert'
import { authSelector } from '../app/features/auth/authSlice'
import { useAddNoteMutation } from '../app/features/note/noteSlice'
import { Loader, NoteForm } from '../component'
import { useAppDispatch, useAppSelector } from '../hook'

type Props = {}

const AddNote: FC<Props> = props => {
  const user = useAppSelector(authSelector).user
  const dispatch = useAppDispatch()
  const [addPost, { isError, isLoading, error, isSuccess }] =
    useAddNoteMutation()

  const onSubmit: SubmitHandler<Pick<Note, 'title' | 'body'>> = data => {
    if (!user) return
    addPost({ ...data, user: user._id })
    if (isSuccess)
      dispatch(setAlert({ message: 'note added', type: 'success' }))
    if (isError)
      dispatch(setAlert({ message: 'unable to add note', type: 'error' }))
  }
  return (
    <>
      <h4 className="mb-2 mt-0 text-2xl text-center font-medium leading-tight text-primary">
        Add post
      </h4>
      {isLoading && <Loader />}
      <NoteForm onSubmit={onSubmit} />
    </>
  )
}

export default AddNote
