import { FC } from 'react'

import { Outlet } from 'react-router-dom'

import Alert from '../app/features/alert/Alert'
import { Footer, Navbar } from '../component'

type Props = {}
const Layout: FC<Props> = props => {
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
