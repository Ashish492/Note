import { Note } from '../../../../../../packages/shared-types/src'
import { apiSlice } from '../api/apiSlice'

const noteApi = apiSlice
  .enhanceEndpoints({ addTagTypes: ['note'] })
  .injectEndpoints({
    endpoints: builder => ({
      getNote: builder.query<Note[], void>({
        query: () => '/note',
        keepUnusedDataFor: 30,
        providesTags: result =>
          result
            ? [
                { type: 'note', id: 'LIST' },
                ...result.map(note => ({
                  type: 'note' as const,
                  id: note._id,
                })),
              ]
            : [{ type: 'note', id: 'LIST' }],
      }),
      addNote: builder.mutation<Note, Pick<Note, 'body' | 'title' | 'user'>>({
        query: note => ({
          url: '/note',
          body: note,
          method: 'post',
        }),
        invalidatesTags: [{ type: 'note', id: 'LIST' }],
      }),
      deleteNote: builder.mutation<Note, Pick<Note, '_id'>>({
        query: note => ({
          url: `/post/${note._id}`,
          method: 'delete',
        }),
        invalidatesTags: (result, error, arg) => [
          { type: 'note', id: arg._id },
        ],
      }),
      updateNote: builder.mutation<
        Note,
        { body: Omit<Note, 'starred' | '_id' | 'user'>; id: string }
      >({
        query: ({ body, id }) => ({
          url: `/post/${id}`,
          body,
          method: 'patch',
        }),
        invalidatesTags: (result, error, arg) => [{ type: 'note', id: arg.id }],
      }),
    }),
  })
export const {
  useAddNoteMutation,
  useDeleteNoteMutation,
  useGetNoteQuery,
  useUpdateNoteMutation,
} = noteApi
