import { apiSlice } from '../api'

const authApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Auth'] })
  .injectEndpoints({
    endpoints: builder => ({
      logout: builder.mutation<any, void>({
        query: () => ({
          url: `/auth/logout`,

          method: 'post',
        }),
      }),
    }),
  })
export const { useLogoutMutation } = authApi
export { authApi }
