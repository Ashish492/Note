import { FC } from 'react'

import { SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { setAlert } from '../app/features/alert'
import { setAuth } from '../app/features/auth/authSlice'
import { useLoginMutation } from '../app/features/user'
import { LoginForm } from '../component'
import { LoginI } from '../component/LoginForm'
import { useAppDispatch } from '../hook'

type Props = {}
const Login: FC<Props> = props => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [login, { isError, isSuccess, data: result, error, isLoading }] =
    useLoginMutation()
  const handleSubmit: SubmitHandler<LoginI> = async data => {
    console.log(data)

    data.remember
      ? localStorage.setItem('email', data.email)
      : localStorage.removeItem('email')
    delete data.remember
    await login(data)
    if (isError) {
      console.log(error)

      dispatch(
        setAlert({
          message: (error as any)?.data?.message ?? 'server error',
          type: 'error',
        }),
      )
    }
    if (isSuccess) {
      if (result) setAuth({ token: result?.accessToken, user: result?.user })
      navigate('/note')
    }
  }
  return (
    <>
      <LoginForm onHandleSubmit={handleSubmit} isLoading={isLoading} />
    </>
  )
}
export default Login
