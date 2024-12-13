import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
    <div className='flex flex-row h-[100vh] bg-black'>
      <div className="p-2 flex justify-evenly gap-2 text-lg flex-col text-green-300 mr-10">
        <Link
          to="/"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{' '}
        <Link
          to="/about"
          activeProps={{
            className: 'font-bold',
          }}
        >
          About
        </Link>
        <Link
          to="/addclothes"
          activeProps={{
            className: 'font-bold',
          }}
        >
          Add Clothes
        </Link>
        <Link
          to="/viewclothes"
          activeProps={{
            className: 'font-bold',
          }}
        >
          View Clothes
        </Link>
        <Link
          to="/waitlist"
          activeProps={{
            className: 'font-bold',
          }}
        >
         Check Waitlist
        </Link>
      </div>
      <hr />
      <Outlet />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
