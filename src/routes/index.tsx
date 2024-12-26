import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="w-full flex justify-center">
      <div className="p-2 w-[80vw] ">
        <div className="p-2 mt-6 w-full text-left flex flex-row justify-between">
          <h3 className="text-xl text-black font-bold">Welcome back!</h3>
          <button className="bg-black font-bold p-2 px-3 rounded-md hover:bg-slate-800 text-green-300 hover:text-white transition duration-300">Log out</button>
        </div>
      </div>
    </div>
  );
}
