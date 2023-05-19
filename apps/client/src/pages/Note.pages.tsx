import { FC } from 'react'

import { useGetNoteQuery } from '../app/features/note/noteSlice'
import {
  Loader,
  NoteList,
} from '../component'

type Props = {}

const Note: FC<Props> = props => {
  const { data, isLoading } = useGetNoteQuery()
  return <>{isLoading ? <Loader /> : <NoteList notes={data!} />}</>
}

export default Note
