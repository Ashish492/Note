import { FC } from 'react'

import { Outlet } from 'react-router-dom'

import Alert from '../app/features/alert/Alert'
import { Footer, Navbar } from '../component'
import { useAppDispatch } from '../hook'

type Props = {}
const Layout: FC<Props> = props => {
  const dispatch = useAppDispatch()

  return (
    <>
      <Navbar />
      <Alert />
      <Outlet />
      <Footer />
    </>
  )
}
export default Layout
