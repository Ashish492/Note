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
    try {
      const result = await login(data).unwrap()
      if (result) {
        dispatch(setAuth({ token: result?.accessToken, user: result?.user }))
        navigate('/note')
      }
    } catch (error) {
      dispatch(
        setAlert({ message: 'password or email incorrect', type: 'error' }),
      )
    }
  }

  return (
    <>
      <LoginForm onHandleSubmit={handleSubmit} isLoading={isLoading} />
    </>
  )
}
export default Login
