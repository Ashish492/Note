import { FC } from 'react'

import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom'

const ErrorElement: FC = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return <>{page(error.status, error.data)}</>
  }

  return <>{page(500, (error as Error).message)}</>
}
function page(statusCode: number | string, msg: string) {
  const navigate = useNavigate()
  return (
    <>
      {/* component */}
      <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
        <h1 className="font-extrabold tracking-widest text-white text-9xl">
          {statusCode}
        </h1>
        <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
          {msg}
        </div>
        <button className="mt-5" onClick={() => navigate(-1)}>
          <a className="relative hover:underline inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring cursor-pointer">
            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current text-xl">
              Go Back
            </span>
          </a>
        </button>
      </main>
    </>
  )
}
export default ErrorElement
