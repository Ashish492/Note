import { FC, useEffect } from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../hook'
import { authSelector, validateJwt } from './authSlice'

type Props = {}

const Auth: FC<Props> = props => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(validateJwt())
  }, [])

  const auth = useAppSelector(authSelector)

  return <>{auth.validLogin ? <Outlet /> : <Navigate to="/user/login" />}</>
}

export default Auth
