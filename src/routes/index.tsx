import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="p-2 mt-5 w-full">
      <h3>Welcome Home!</h3>
    </div>
  )
}
