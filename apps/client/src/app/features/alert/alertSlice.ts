/* eslint-disable no-param-reassign */
import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

import { AlertType } from '../../../types'
import { RootState } from '../../store'

const initialState: AlertType = {
  type: 'success',
  message: '',
  open: false,
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<Omit<AlertType, 'open'>>) => ({
      ...action.payload,
      open: true,
    }),
    hideAlert: state => ({
      ...state,
      message: '',
      open: false,
    }),
  },
})
export const selectAlert = (state: RootState) => state.alert
export const alertReducer = alertSlice.reducer
const { setAlert, hideAlert } = alertSlice.actions
export { hideAlert, setAlert }
