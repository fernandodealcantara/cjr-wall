import { Outlet } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import LoginButton from './LoginButton'
import UserInformation from './UserInformation'
import { useAuth } from '../contexts/AuthContext'
import Spinner from './Spinner'
import { Link } from 'react-router-dom'

export default function Layout() {
  const { user } = useAuth()

  return (
    <>
      <header className="h-12 p-[.5%] bg-[#DEDEDE] flex items-center justify-between w-[100vw]">
        <Link to="/">
          <img src={Logo} className="h-9 w-auto" />
        </Link>
        {user === null ? (
          <Spinner />
        ) : user ? (
          <UserInformation />
        ) : (
          <LoginButton />
        )}
      </header>
      <main className='w-[100vw]' >
        <Outlet />
      </main>
    </>
  )
}
