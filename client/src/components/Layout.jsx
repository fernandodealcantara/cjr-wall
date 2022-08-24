import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
        <header class="bg-indigo-500">
          <h1>Opa! Turu bom?</h1>
        </header>
        <main>
          <h1>Opa! Turu bom?</h1>
          <Outlet />
        </main>
    </>
  )
}
