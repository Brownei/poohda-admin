import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/waitlist")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2 mt-5 w-full mr-6">
      {" "}
      <div className="p-2 mt-6 w-full text-left">
        <h3 className="text-xl text-black font-bold ml-16">Waitlist</h3>
      </div>
    </div>
  );
}
