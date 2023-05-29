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

  const onSubmit: SubmitHandler<Pick<Note, 'title' | 'body'>> = async data => {
    console.log(user)

    if (!user) {
      dispatch(setAlert({ message: 'unable to add note', type: 'error' }))
      return
    }
    try {
      await addPost({ ...data, user: user._id }).unwrap()
      dispatch(setAlert({ message: 'note added', type: 'success' }))
    } catch (error) {
      dispatch(setAlert({ message: 'unable to add note', type: 'error' }))
      return
    }
  }
  return (
    <>
      {isLoading && (
        <div className="grid place-content-center mt-2">
          <Loader isButton={false} />{' '}
        </div>
      )}
      <NoteForm onSubmit={onSubmit} />
    </>
  )
}

export default AddNote
