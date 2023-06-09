import {
  FC,
  useEffect,
  useRef,
} from 'react'

import JoditEditor, { Jodit } from 'jodit-react'
import {
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import {
  Note,
  NoteSchema,
} from 'shared-types'
import {
  initTE,
  Input,
  Ripple,
} from 'tw-elements'

import { zodResolver } from '@hookform/resolvers/zod'

import Loader from './Loader'

type Props = {
  edit?: boolean
  note?: Pick<Note, 'title' | 'body'>
  onSubmit: SubmitHandler<Pick<Note, 'title' | 'body'>>
}

const NoteForm: FC<Props> = ({
  note = { title: '', body: '' },
  onSubmit,
  edit = true,
}) => {
  const editorRef = useRef<Jodit>(null!)
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Pick<Note, 'body' | 'title'>>({
    defaultValues: note,
    resolver: zodResolver(NoteSchema.pick({ body: true, title: true })),
  })
  useEffect(() => {
    initTE({ Input, Ripple })
  })
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: 'body',
    tabIndex: 1,
    height: '30vh',
  }

  return (
    <>
      <div className="grid min-h-[70vh] w-100  place-content-center  rounded-lg bg-white p-6 smax-w-mdhadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 bg-">
        <form onSubmit={handleSubmit(onSubmit)} className=" h-[50vh] w-[50vw]">
          <div className="relative mb-8" data-te-input-wrapper-init="">
            <input
              type="text"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleInput8"
              placeholder="Email address"
              {...register('title')}
            />
            <label
              htmlFor="exampleInput8"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            >
              title
            </label>
            {!!errors.title && (
              <div
                className="absolute w-full text-sm text-danger-600 peer-focus:text-primary dark:text-neutral-200 dark:peer-focus:text-primary"
                data-te-input-helper-ref=""
              >
                {errors.title.message}
              </div>
            )}
          </div>

          {/*Message textarea*/}
          <div className="relative mb-8">
            <JoditEditor
              value={getValues('body')}
              config={config}
              onChange={value => {
                setValue('body', value)
              }}
              onBlur={() => {
                trigger('body')
              }}
              ref={editorRef}
            />

            {!!errors.body && (
              <div
                className="absolute w-full text-sm text-danger-600 peer-focus:text-primary dark:text-neutral-200 dark:peer-focus:text-primary"
                data-te-input-helper-ref=""
              >
                {errors.body.message}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init=""
            data-te-ripple-color="light"
            aria-label="Close"
          >
            submit
            {isSubmitting && <Loader isButton={true} />}
          </button>
        </form>
      </div>
    </>
  )
}
export default NoteForm
