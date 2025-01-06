import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <main className="h-[1000px]">
      <div className="flex flex-row justify-between">
        <h3 className="text-xl text-black font-bold">Welcome back!</h3>
        <button className="bg-black font-bold p-2 px-3 rounded-md hover:bg-slate-800 text-green-300 hover:text-white transition duration-300">Log out</button>
      </div>
    </main>
  );
}
