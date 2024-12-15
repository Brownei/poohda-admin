import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/viewclothes")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2 mt-5 w-full mr-6">
      {" "}
      <div className="p-2 mt-5 w-full text-center">
        <h3 className="text-2xl text-green-300">View Clothes</h3>
      </div>
    </div>
  );
}
