import { User } from 'shared-types'

import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

import { RootState } from '../../store'

export type Auth = {
  token: string | null
  validLogin: boolean
  user: Omit<User, 'password' | 'name'> | null
}
const initialState: Auth = {
  token: null,
  validLogin: false,
  user: null,
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<Omit<Auth, 'validLogin'>>) => {
      alert('called')
      localStorage.setItem('token', action.payload.token!)
      console.log(action.payload)
      state.token = action.payload.token
      state.user = action.payload.user
      state.validLogin = true
    },
    logOut: state => {
      state.token = null
      state.user = null
      state.validLogin = false
      localStorage.removeItem('token')
    },
    checkLogin: state => {
      const token = localStorage.getItem('token')
      if (token) {
        state.token = token
        state.validLogin = true
      } else {
        state.token = null
        state.validLogin = false
      }
    },
  },
})

export const authSelector = (state: RootState) => {
  return state.auth
}
export const { logOut, setAuth,checkLogin } = authSlice.actions
export const authReducer = authSlice.reducer
