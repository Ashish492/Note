import { FC } from 'react'

import { SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { User } from 'shared-types'

import { setAlert } from '../app/features/alert'
import { setAuth } from '../app/features/auth/authSlice'
import { useLoginMutation } from '../app/features/user'
import { LoginForm } from '../component'

type Props = {}

const Login: FC<Props> = props => {
  const navigate = useNavigate()
  const [login, { isError, isSuccess, data: result }] = useLoginMutation()
  const handleSubmit: SubmitHandler<Omit<User, '_id' | 'name'>> = data => {
    login(data)
    if (isError) {
      setAlert({ message: '', type: 'error' })
    }
      if (isSuccess) {
        if(result)
      setAuth({ token: result?.accessToken, user: result?.user })
      navigate('/note')
    }
  }
  return (
    <>
      <LoginForm onHandleSubmit={handleSubmit} />
    </>
  )
}

export default Login
