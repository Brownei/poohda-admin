import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { CiCircleQuestion } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import { FaClipboardList } from "react-icons/fa";
import { FaAssistiveListeningSystems } from "react-icons/fa";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function openSidebar() {
    setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);
  }

  return (
    <>
      <div className="relative flex h-[100vh] bg-black">
        {/* Hamburger Menu */}
        <div
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={openSidebar}
        >
          <h3 className="p-2 h-14 text-green-300 cursor-pointer text-2xl">
            {isSidebarOpen ? "✕" : "☰"}
          </h3>
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed md:hidden top-0 left-0 h-full bg-black border-r-2 border-green-300 shadow-lg transition-transform duration-300 z-40 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 mt-16 flex flex-col gap-8 text-md text-green-300">
            <Link
              className="flex flex-row w-20 justify-evenly items-center"
              to="/"
              activeProps={{
                className:
                  "font-bold bg-slate-300 w-28 rounded-md text-black text-nowrap px-1 py-2",
              }}
              activeOptions={{ exact: true }}
            >
              <IoHomeOutline /> Home
            </Link>
            <Link
              className="flex flex-row w-20 justify-evenly items-center"
              to="/about"
              activeProps={{
                className:
                  "font-bold w-28 bg-slate-300 rounded-md text-black text-nowrap px-1 py-2",
              }}
            >
              <CiCircleQuestion /> About
            </Link>
            <Link
              className="flex flex-row w-28 justify-evenly items-center"
              to="/addclothes"
              activeProps={{
                className:
                  "font-bold w-36 bg-slate-300 rounded-md text-black text-nowrap px-1 py-2",
              }}
            >
              <IoAddCircleOutline /> Add Clothes
            </Link>
            <Link
              className="flex flex-row w-28 gap-2 justify-evenly items-center"
              to="/viewclothes"
              activeProps={{
                className:
                  "font-bold w-36 bg-slate-300 rounded-md text-black text-nowrap px-1 py-2",
              }}
            >
              <CiViewList /> View Clothes
            </Link>
            <Link
              className="flex flex-row w-32 gap-2 justify-evenly items-center"
              to="/waitlist"
              activeProps={{
                className:
                  "font-bold w-36 bg-slate-300 rounded-md text-black text-nowrap px-1 py-2",
              }}
            >
              <FaClipboardList /> Check Waitlist
            </Link>
          </div>
        </div>

        {/* Tablet and Desktop Sidebar */}
        <div className="hidden md:flex p-2 justify-evenly gap-2 text-nowrap text-md flex-col text-green-300 mr-10 border-r-2 border-green-300">
          <Link
            className="flex flex-row gap-2 items-center"
            to="/"
            activeProps={{
              className:
                "font-bold bg-slate-300 rounded-md text-black text-nowrap px-1 py-2",
            }}
            activeOptions={{ exact: true }}
          >
            <IoHomeOutline /> Home
          </Link>
          <Link
            className="flex flex-row gap-2 items-center"
            to="/about"
            activeProps={{
              className:
                "font-bold bg-slate-300 rounded-md text-black text-nowrap px-1 py-2",
            }}
          >
            <CiCircleQuestion />
            About
          </Link>
          <Link
            className="flex flex-row gap-2 items-center"
            to="/addclothes"
            activeProps={{
              className:
                "font-bold bg-slate-300 rounded-md text-black text-nowrap px-1 py-2",
            }}
          >
            <IoAddCircleOutline />
            Add Clothes
          </Link>
          <Link
            className="flex flex-row gap-2 items-center"
            to="/viewclothes"
            activeProps={{
              className:
                "font-bold bg-slate-300 rounded-md text-black text-nowrap px-1 py-2",
            }}
          >
            <CiViewList />
            View Clothes
          </Link>
          <Link
            className="flex flex-row gap-2 items-center"
            to="/waitlist"
            activeProps={{
              className:
                "font-bold bg-slate-300 rounded-md text-black text-nowrap px-1 py-2",
            }}
          >
            <FaClipboardList />
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

