import { Mutex } from 'async-mutex'

import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  retry,
} from '@reduxjs/toolkit/query/react'

import { RootState } from '../../store'
import { Auth, logOut, setAuth } from '../auth/authSlice'

// create a new mutex
const mutex = new Mutex()
const baseQuery = retry(
  fetchBaseQuery({
    baseUrl: `http://localhost:5000`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  { maxRetries: 1 },
)
const baseQueryWithReAuth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  console.log(result?.error?.status)
  console.log(result)

  if (result?.error?.status === 401) {
    console.log('sending refresh token')
    // send refresh token to get new access token
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshResult = await baseQuery(
          '/auth/refresh',
          api,
          extraOptions,
        )

        if (refreshResult?.data) {
          const credentials = refreshResult.data as Omit<Auth, 'validLogin'>

          // store the new token
          api.dispatch(setAuth(credentials))
          // retry the original query with new access token
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(logOut())
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}
export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: builder => ({}),
})
