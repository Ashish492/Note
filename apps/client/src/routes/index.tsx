import { RouteObject } from 'react-router-dom'

import Auth from '../app/features/auth/Auth'
import {
  AddNotePages,
  HomePages,
  LoginPages,
  NotePages,
  RegisterPages,
  SingleNotePages,
} from '../pages'
import ErrorElement from './Error.pages'
import Layout from './Layout'

const children: RouteObject[] = [
  {
    element: <HomePages />,
    index: true,
  },
  {
    path: '/user',
    children: [
      {
        element: <LoginPages />,
        path: 'login',
      },
      {
        path: 'signup',
        element: <RegisterPages />,
      },
    ],
  },
  {
    path: 'note',
    element: <Auth />,
    children: [
      {
        index: true,
        element: <NotePages />,
      },
      {
        path: 'add',
        element: <AddNotePages />,
      },
      {
        path: ':id',
        element: <SingleNotePages />,
      },
    ],
  },
]
const route: RouteObject = {
  path: '/',
  element: <Layout />,
  children,
  errorElement: <ErrorElement />,
}
export default route
