import { Outlet } from 'react-router-dom'
import  CJR_Bricks  from '../assets/Logo'
import GoogleButton from './Google'

export default function Layout() {
  return (
    <>
        <header className="p-[.8%] bg-[#DEDEDE] w-screen flex justify-between">
          <CJR_Bricks />
          <GoogleButton />
        </header>
        <main>
          <Outlet />
        </main>
    </>
  )
}
