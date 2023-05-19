import { User } from 'shared-types'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { deleteCookie, saveToCookie } from '../../../utils'
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
      state.token = action.payload.token
      state.user = action.payload.user
      saveToCookie('token', action.payload.token!)
    },
    logOut: state => {
      state.token = null
      state.user = null
      deleteCookie('token')
    },
  },
  extraReducers: builder =>
    builder.addCase(checkLogin.fulfilled, (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.validLogin = true
    }),
})
export const checkLogin = createAsyncThunk<{
  token: string
  user: Omit<User, 'password'>
}>('auth/checkLogin', async (data, thunkApi) => {
  try {
    alert(1)
    const response = await fetch('http://localhost:5000/auth/refresh', {
      credentials: 'include',
    })
    if (response.status != 200) throw new Error(response.statusText)
    return await response.json()
  } catch (error) {
    thunkApi.dispatch(logOut)
    throw thunkApi.rejectWithValue((error as Error).message)
  }
})

export const authSelector = (state: RootState) => {
  return state.auth
}
export const { logOut, setAuth } = authSlice.actions
export const authReducer = authSlice.reducer
