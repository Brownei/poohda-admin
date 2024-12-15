import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="p-2 mt-5 w-full">
       <div className="p-2 mt-5 w-full text-center">
        <h3 className="text-2xl text-green-300">Welcome Home!</h3>
      </div>
    </div>
  )
}
