import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import useClothesStore from "../store";

export const Route = createFileRoute("/addclothes")({
  component: RouteComponent,
});

function RouteComponent({ clothes }) {
  const [file, setFile] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [colour, setColour] = useState("");

  const addClothes = useClothesStore((state) => state.addClothes);

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  function handleSubmit(e) {
    e.preventDefault();
    addClothes(file, name, description, size, colour);
    setName("");
    setDescription("");
    setSize("");
    setColour("");
    console.log("Form submitted:", name, description, size, colour);
  }

  return (
    <>
      <div className="w-full overflow-x-scroll">
        <div className="p-2 mt-5 w-full text-center">
          <h3 className="text-2xl text-green-300">Add Clothes</h3>
        </div>
        <div className="flex flex-col justify-around items-center md:flex-row">
          <form
            className="bg-slate-800  m-4 p-4 h-96 w-[60vw] rounded-md flex flex-col md:max-w-[60vw] sm:max-w-[60vw] lg:max-w-[40vw]"
            onSubmit={handleSubmit}
          >
            <input type="file" onChange={handleChange} />
            <label>Product Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <label>Size:</label>
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="">Select size</option>
              <option value="XS">Extra Small</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">Extra Large</option>
            </select>
            <br />
            <label>Colour:</label>
            <input
              type="text"
              value={colour}
              onChange={(e) => setColour(e.target.value)}
            />
            <br />
            {/* <input
              type="submit"
              value="Submit"
              className="bg-green-300 rounded-md w-50 cursor-pointer text-black"
              onSubmit={}
            /> */}
            <button
              type="submit"
              /* onClick={() => addClothes(file, name, description, size, colour)} */
              className="bg-green-300 rounded-md border-black w-20 cursor-pointer text-black"
            >
              Submit
            </button>
          </form>
          <div className="p-2 mt-5 w-52 rounded-md m-4 bg-slate-800 flex flex-col justify-center items-center">
           <span className="font-bold text-green-300">Preview</span> 
            <img src={file} width={200} height={50} />
            <h4>Name: {name}</h4>
            <p>Description: {description}</p>
            <p>Size: {size}</p>
            <p>Colour: {colour}</p>
          </div>
        </div>
      </div>
    </>
  );
}
