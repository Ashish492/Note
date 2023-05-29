import { User } from 'shared-types'

import * as toolkit from '@reduxjs/toolkit'

import { RootState } from '../../store'

export type Auth = {
  token: string | null
  validLogin: boolean
  user: Omit<User, 'password' | 'name'> | null
}
const initialState: Auth = {
  token: null,
  validLogin: !!localStorage.getItem('token'),
  user: null,
}
const authSlice = toolkit.createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (
      state,
      action: toolkit.PayloadAction<Omit<Auth, 'validLogin'>>,
    ) => {
      localStorage.setItem('token', action.payload.token!)
      state.token = action.payload.token
      state.user = action.payload.user
      state.validLogin = true
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    logOut: state => {
      localStorage.removeItem('token')
      state.token = null
      state.user = null
      state.validLogin = false
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
  extraReducers: builder => builder.addCase(validateJwt.fulfilled, () => {}),
})
export const validateJwt = toolkit.createAsyncThunk(
  'auth/validate',
  async (_data, thunkApi) => {
    // const response = thunkApi.dispatch(authApi.endpoints.getPayload.initiate())
    const token = localStorage.getItem('token')
    if (!token) thunkApi.dispatch(logOut)
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/payload`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const user = await response.json()
    console.log(user)

    if (response.ok) {
      thunkApi.dispatch(setAuth({ token: localStorage.getItem('token'), user }))
    }
  },
)
export const authSelector = (state: RootState) => {
  return state.auth
}
export const { logOut, setAuth, checkLogin, setUser } = authSlice.actions
export const authReducer = authSlice.reducer
