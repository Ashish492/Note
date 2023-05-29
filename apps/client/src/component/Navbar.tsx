import { FC } from 'react'

import { NavLink, useNavigate } from 'react-router-dom'

import { setAlert } from '../app/features/alert'
import { useLogoutMutation } from '../app/features/auth/authApiSlice'
import { authSelector, logOut } from '../app/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../hook'

type Props = {}
const Navbar: FC<Props> = () => {
  const auth = useAppSelector(authSelector)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [logOutApi, { data, isSuccess, isError }] = useLogoutMutation()
  const handleLogout = async () => {
    const data = await logOutApi().unwrap()
    if (isSuccess) {
      dispatch(logOut())
      navigate('/user/login')
    }
    if (isError) {
      dispatch(setAlert({ message: 'unable to logout', type: 'error' }))
    }
  }
  const publicPath = [
    {
      path: '/user/login',
      title: 'login',
    },
    {
      path: '/user/signup',
      title: 'signup',
    },
  ]
  const ProtectedRoute = [
    {
      path: '/note',
      title: 'Note',
    },
    {
      path: '/note/add',
      title: 'AddNote',
    },
  ]
  type NavBar = { title: string; path: string }
  const generateNav = (routes: NavBar[]) =>
    routes.map((route, index) => (
      <li className="my-4 lg:my-0 lg:pr-2" data-te-nav-item-ref="" key={index}>
        <NavLink
          className="opacity-60 text-white disabled:text-black/30 lg:px-2 [&.active]:font-extrabold dark:[&.active]:text-neutral-400"
          to={route.path}
          data-te-nav-link-ref=""
        >
          {route.title}
        </NavLink>
      </li>
    ))
  return (
    <>
      {/* Main navigation container */}
      <nav
        className="relative flex w-full flex-wrap items-center justify-between bg-neutral-900 py-2 text-neutral-200 shadow-lg lg:flex-wrap lg:justify-start lg:py-4"
        data-te-navbar-ref=""
      >
        <NavLink
          className="absolute pr-2 text-xl font-semibold text-white"
          to="/"
        >
          <img
            src="/logo.png"
            height="120"
            width="100"
            className="drop-shadow-lg"
          />
        </NavLink>
        <div className="ml-[8vw] flex w-full flex-wrap items-center justify-between px-3">
          {/* Hamburger button for mobile view */}

          <button
            className="ml-5 block border-0 bg-transparent px-2 text-neutral-200 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 lg:hidden"
            type="button"
            data-te-collapse-init=""
            data-te-target="#navbarSupportedContent4"
            aria-controls="navbarSupportedContent4"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* Hamburger icon */}
            <span className="[&>svg]:w-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
          {/* Collapsible navigation container */}
          <div
            className="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
            id="navbarSupportedContent4"
            data-te-collapse-item=""
          >
            {/* Navbar title */}

            {/* Left navigation links */}

            <ul
              className="list-style-none flex flex-col pl-0 lg:flex-row w-full"
              data-te-navbar-nav-ref=""
            >
              {auth.validLogin
                ? generateNav(ProtectedRoute)
                : generateNav(publicPath)}
              {auth.validLogin && (
                <li
                  className="my-4 lg:my-0 lg:pr-2 grow grid justify-end"
                  data-te-nav-item-ref=""
                >
                  <button
                    onClick={handleLogout}
                    className="opacity-60 text-white disabled:text-black/30 lg:px-2 [&.active]:font-extrabold dark:[&.active]:text-neutral-400 grow"
                    data-te-nav-link-ref=""
                  >
                    logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
export default Navbar
