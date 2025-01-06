import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Nav from "../components/Nav";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {

  return (
    <>
      <div className="relative flex bg-PaleNimbus text-RichBlack">
        <Nav />
        <hr />
        <div className="container my-10 mx-auto p-5">
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
