import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutComponent,
})

function AboutComponent() {
  return (
    <div className="p-2 mt-5 w-full bg-slate-900 mr-6">
      <h3>About</h3>
    </div>
  )
}
