import {
  FC,
  useEffect,
} from 'react'

import { SubmitHandler } from 'react-hook-form'
import { Note } from 'shared-types'
import {
  initTE,
  Modal,
} from 'tw-elements'

import NoteForm from './NoteForm'

type Props = {
  note: Note

  onSubmit: SubmitHandler<Pick<Note, 'title' | 'body'>>
}
const EditNote: FC<Props> = ({ note, onSubmit }) => {
  useEffect(() => {
    initTE({ Modal })
  }, [])

  return (
    <>
      {
        <div
          data-te-modal-init=""
          className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLgLabel"
          aria-modal="true"
        >
          <div
            data-te-modal-dialog-ref
            className="pointer-events-none relative w-auto  translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px]  "
          >
            <div className="pointer-events-auto relative flex w-full h-[90vh] flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
              <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50 ">
                {/*Modal title*/}
                <h5
                  className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200 h-100"
                  id="exampleModalLgLabel"
                >
                  Edit notes
                </h5>
                {/*Close button*/}
                <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  data-te-modal-dismiss=""
                  aria-label="Close"
                  id="editClose"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {/*Modal body*/}
              <div className="relative">
                <NoteForm {...{ note, onSubmit, edit: true }} />
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
export default EditNote
