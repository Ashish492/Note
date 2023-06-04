import { FC, memo, useEffect } from 'react'

import { SubmitHandler } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Note } from 'shared-types'
import { initTE, Modal } from 'tw-elements'

import { setAlert } from '../app/features/alert'
import {
  useDeleteNoteMutation,
  useGetNoteByIdQuery,
  useUpdateNoteMutation,
} from '../app/features/note/noteSlice'
import { EditNote, Loader } from '../component'
import { useAppDispatch } from '../hook'

type Props = {}
const SingleNote: FC<Props> = props => {
  useEffect(() => {
    initTE({ Modal })
  }, [])
  const { id } = useParams()
  if (!id) {
    throw new Response('data not found', { status: 404 })
  }
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [deleteData, deleteResult] = useDeleteNoteMutation()
  const [updateNote, { isLoading: editLoading }] = useUpdateNoteMutation()
  const { data, isLoading, isError, error } = useGetNoteByIdQuery(id)
  const deleteNote = async (id: string) => {
    try {
      let res = await deleteData(id).unwrap()
      console.log(res)
      dispatch(setAlert({ message: 'note deleted', type: 'success' }))
      navigate('/note')
    } catch (error) {
      dispatch(setAlert({ message: 'unable to delete note', type: 'error' }))
    }
  }
  if (isError) {
    throw error
  }
  if (isLoading || deleteResult.isLoading || editLoading) {
    return <Loader />
  }
  const editNote: SubmitHandler<
    Omit<Note, '_id' | 'starred' | 'user'>
  > = async body => {
    try {
      const close = document.getElementById('editClose')
      close?.click()
      await updateNote({ body, id }).unwrap()
      dispatch(setAlert({ message: 'note updated', type: 'success' }))
    } catch (error) {
      dispatch(setAlert({ message: 'unable to update note', type: 'error' }))
    } finally {
    }
  }
  if (data)
    return (
      <div className="container mx-auto">
        <EditNote note={data} onSubmit={editNote} />
        <h4 className="text-2xl font-medium leading-tight text-center mt-2">
          {data?.title}
        </h4>
        <div>
          <div
            className="prose lg:prose-xl"
            dangerouslySetInnerHTML={{ __html: data.body }}
          ></div>
        </div>

        <div aira-aria-labelledby="action" className="flex justify-start">
          <button
            type="button"
            className="inline-block rounded-full border-2 border-danger-700 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            data-te-ripple-init
            onClick={() => {
              deleteNote(data._id)
            }}
          >
            delete
          </button>
          <button
            type="button"
            className="ml-6 inline-block rounded-full border-2 border-warning-700 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            data-te-ripple-init
            data-te-toggle="modal"
            data-te-target="#exampleModal"
          >
            edit
          </button>
        </div>
      </div>
    )
  return <></>
}
export default memo(SingleNote)
