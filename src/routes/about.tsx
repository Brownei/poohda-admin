import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});

function AboutComponent() {
  return (
    <div className="w-full flex flex-col ml-16">
      <div className="p-2 w-[80vw]">
        <div className="p-2 mt-6 w-full text-left">
          <h3 className="text-xl text-black font-bold">About</h3>
        </div>
      </div>
      <span className="text-black">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis
        accusamus excepturi quis tempora nobis distinctio animi in, ratione
        dignissimos nesciunt quisquam asperiores recusandae reprehenderit quos
        nulla natus perferendis officiis hic?
      </span>
    </div>
  );
}
