import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/viewclothes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="p-2 mt-5 w-full mr-6">View Clothes</div>
}
