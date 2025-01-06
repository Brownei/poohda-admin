import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { useClothesStore } from "../hooks/use-store";
import { FaRegTrashAlt } from "react-icons/fa";

export const Route = createFileRoute("/viewclothes")({
  component: RouteComponent,
});

function RouteComponent() {
  const { clothes } = useClothesStore(); // For mapping clothes in the store and displayig it in this component

  const deleteClothes = useClothesStore((state) => state.deleteClothes); // Bringing the delete clothes function from the store
  function deleteCloth(clothId) {
    deleteClothes(clothId);
  }
  return (
    <div className="p-2 mt-5 w-full mr-6">
      {" "}
      <div className="p-2 mt-5 w-full text-left">
        <h3 className="text-xl text-black font-bold ml-16">View Clothes</h3>
        <div className="flex flex-wrap items-center justify-center overflow-y-scroll h-[80vh]">
          {clothes.map((cloth) => (
            <div className=" mt-5 w-52 rounded-md m-4 h-[fit-content] bg-slate-800 flex flex-col justify-center items-center">
              <img
                src={cloth.picture}
                alt="Image of clothing item"
                className="rounded-t-md"
              />
              <div className="flex flex-col mt-3 mb-3">
                <span>Name: {cloth.name}</span>
                <span>Price: ₦{cloth.price}</span>
                <span>Desc: {cloth.description}</span>
                <span>Size: {cloth.size}</span>
                <span>Colour: {cloth.color}</span>
                <span className="cursor-pointer mt-3 flex flex-row  justify-center">
                  <FaRegTrashAlt onClick={() => { deleteCloth(cloth.id) }} color="red" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
