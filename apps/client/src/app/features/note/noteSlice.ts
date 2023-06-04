import { Note } from 'shared-types'

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
      getNoteById: builder.query<Note, Note['_id']>({
        query: id => `/note/${id}`,
        keepUnusedDataFor: 6000,
        providesTags: (_result, _err, args) => [{ type: 'note', id: args }],
      }),
      addNote: builder.mutation<Note, Pick<Note, 'body' | 'title' | 'user'>>({
        query: note => ({
          url: '/note',
          body: note,
          method: 'post',
        }),
        invalidatesTags: [{ type: 'note', id: 'LIST' }],
      }),
      deleteNote: builder.mutation<Note, Note['_id']>({
        query: note => ({
          url: `/note/${note}`,
          method: 'delete',
        }),
        invalidatesTags: (result, error, arg) => [{ type: 'note', id: arg }],
      }),
      updateNote: builder.mutation<
        Note,
        { body: Partial<Omit<Note, '_id' | 'user'>>; id: string }
      >({
        query: ({ body, id }) => ({
          url: `/note/${id}`,
          body,
          method: 'PATCH',
        }),
        invalidatesTags: (_result, _error, arg) => [
          { type: 'note', id: arg.id },
        ],
      }),
    }),
  })
export const {
  useGetNoteByIdQuery,
  useAddNoteMutation,
  useDeleteNoteMutation,
  useGetNoteQuery,
  useUpdateNoteMutation,
} = noteApi
