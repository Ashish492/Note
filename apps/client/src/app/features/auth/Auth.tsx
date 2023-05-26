import { FC } from 'react'

import {
  Navigate,
  Outlet,
} from 'react-router-dom'

import {
  useAppDispatch,
  useAppSelector,
} from '../../../hook'
import {
  authSelector,
  checkLogin,
} from './authSlice'

type Props = {}

const Auth: FC<Props> = props => {
  const dispatch = useAppDispatch()
  dispatch(checkLogin())
  const auth = useAppSelector(authSelector)
  return <>{auth.validLogin ? <Outlet /> : <Navigate to="/user/login" />}</>
}

export default Auth
