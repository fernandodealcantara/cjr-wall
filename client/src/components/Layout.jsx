import { Outlet } from 'react-router-dom'
import CJR_Bricks from '../assets/Logo'
import UserButton from './UserButton'

export default function Layout() {
  return (
    <>
      <header className="p-[.8%] bg-[#DEDEDE] w-screen flex justify-between">
        <CJR_Bricks />
        <UserButton />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
