import { FC } from 'react'

type Props = {
  isButton?: boolean
}

const Loader: FC<Props> = ({ isButton = false }) => {
  return (
    <>
      <div className={` ${isButton ? '' : 'flex justify-center mt-4'}`}>
        <div
          className={`ml-4 ${
            isButton ? 'w-4 h-4' : 'w-8 h-8 text-primary-700'
          } inline-block   animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    </>
  )
}

export default Loader
