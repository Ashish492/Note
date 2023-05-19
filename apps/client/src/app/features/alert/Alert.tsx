import {
  FC,
  useEffect,
} from 'react'

import {
  Alert as twAlert,
  initTE,
} from 'tw-elements'

import { useAppSelector } from '../../../hook'
import { selectAlert } from './alertSlice'

type Props = {}

const Alert: FC<Props> = props => {
  const alert = useAppSelector(selectAlert)
  const alertClass = {
    success: 'bg-success-100  text-success-700',
    error: 'bg-danger-100  text-danger-700',
  }
  useEffect(() => {
    initTE({ twAlert })
  })
  if (alert.open)
    return (
      <>
        <div
          data-te-alert-init
          data-te-alert-show
          className={`${
            alertClass[alert.type]
          } mb-3 inline-flex w-full items-center rounded-lg  px-6 py-5 text-base `}
          role="alert"
        >
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          {alert.message}
          <button
            type="button"
            className="ml-auto box-content rounded-none border-none p-1 text-warning-900 opacity-50 hover:text-warning-900 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
            data-te-alert-dismiss
            aria-label="Close"
          >
            <span className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
        </div>
      </>
    )
  return <></>
}

export default Alert
