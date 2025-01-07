import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Nav from "../components/Nav";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <>
      <div className={`relative flex bg-PaleNimbus text-RichBlack ${isSidebarOpen && 'overflow-hidden'}`}>
        <Nav setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
        <hr />
        <div className="container my-[80px] min-h-screen lg:my-10 mx-auto p-5">
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
