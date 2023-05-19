import { User } from 'shared-types'

import { apiSlice } from '../api/apiSlice'

export const userApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['user'] })
  .injectEndpoints({
    endpoints: builder => ({
      addUser: builder.mutation<User, Omit<User, '_id'>>({
        query: user => ({
          url: '/user',
          body: user,
          method: 'post',
        }),
        invalidatesTags: [{ type: 'user', id: 'LIST' }],
      }),
      login: builder.mutation<
        {
          accessToken: string
          user: Pick<User, '_id' | 'email'>
        },
        Omit<User, '_id' | 'name'>
      >({
        query: user => ({
          url: '/user',
          body: user,
          method: 'post',
        }),
        invalidatesTags: [{ type: 'user', id: 'LIST' }],
      }),
    }),
  })
export const { useLoginMutation, useAddUserMutation } = userApi
