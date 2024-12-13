import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useState } from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function openSidebar() {
    setIsSidebarOpen(prevIsSidebarOpen => !prevIsSidebarOpen);
  }
  return (
    <>
      <div className="flex flex-row h-[100vh] bg-black">
        <div className="flex flex-col gap-4">
        <h3
          onClick={() => openSidebar()}
          className="p-2 h-14 mt-4 md:hidden text-green-300 cursor-pointer text-2xl lg:hidden"
        >
          ☰
        </h3>
        <div
          className={
            isSidebarOpen
              ? "p-2 flex flex-col gap-10 md:flex justify-evenly text-lg  text-green-300 w-1/3 lg:hidden"
              : "hidden"
          }
        >
          <Link
            to="/"
            activeProps={{
              className: "font-bold",
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{" "}
          <Link
            to="/about"
            activeProps={{
              className: "font-bold",
            }}
          >
            About
          </Link>
          <Link
            to="/addclothes"
            activeProps={{
              className: "font-bold",
            }}
          >
            Add Clothes
          </Link>
          <Link
            to="/viewclothes"
            activeProps={{
              className: "font-bold",
            }}
          >
            View Clothes
          </Link>
          <Link
            to="/waitlist"
            activeProps={{
              className: "font-bold",
            }}
          >
            Check Waitlist
          </Link>
        </div>
        </div>
        <div className="p-2 md:flex justify-evenly gap-2 text-lg flex-col text-green-300 mr-10 hidden">
          <Link
            to="/"
            activeProps={{
              className: "font-bold",
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{" "}
          <Link
            to="/about"
            activeProps={{
              className: "font-bold",
            }}
          >
            About
          </Link>
          <Link
            to="/addclothes"
            activeProps={{
              className: "font-bold",
            }}
          >
            Add Clothes
          </Link>
          <Link
            to="/viewclothes"
            activeProps={{
              className: "font-bold",
            }}
          >
            View Clothes
          </Link>
          <Link
            to="/waitlist"
            activeProps={{
              className: "font-bold",
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
  );
}
