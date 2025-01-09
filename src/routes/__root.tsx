import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Nav from "../components/Nav";
import Login from "@/components/Login";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const token = localStorage.getItem("admin")
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 8 * 60 * 60 * 1000, gcTime: 1000 * 60 * 60 * 24 } }
  })
  //const isLoggedIn = true

  return (
    <>
      {token !== null ? (
        <QueryClientProvider client={queryClient}>
          <div className={`relative flex bg-PaleNimbus text-RichBlack ${isSidebarOpen && 'overflow-hidden'}`}>
            <Nav setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
            <hr />
            <div className="container my-[80px] min-h-screen lg:my-10 mx-auto p-5">
              <Outlet />
            </div>
          </div>
          <TanStackRouterDevtools position="bottom-right" />
        </QueryClientProvider>
      ) : (
        <Login />
      )}
    </>
  );
}
