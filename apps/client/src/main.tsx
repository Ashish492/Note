import './index.css'

import * as ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { store } from './app'
import { checkLogin } from './app/features/auth/authSlice'
import route from './routes'

store.dispatch(checkLogin())
const router = createBrowserRouter([route])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
