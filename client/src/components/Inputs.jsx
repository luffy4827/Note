import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";

const Inputs = ({ inputDiv, setInputDiv }) => {
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    try {
      const response = await axios.post("/v2/create-note", data);
      toast.success("Note created successfully");
      // console.log("Success: ", response.data);
      setData({
        title: "",
        description: "",
      });
      setInputDiv("hidden");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Note Creation failed.");
        console.error("Error:", error.response.data);
      } else {
        toast.error("An unexpected error occurred.");
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      <div
        className={`${inputDiv} left-0 top-0 opacity-80 bg-gray-800 h-screen w-full`}
      ></div>
      <div
        className={`${inputDiv} left-0 top-0 h-screen w-full flex justify-center items-center`}
      >
        <div className="w-2/6 bg-gray-900 p-4 rounded-lg">
          <div className="flex justify-between items-center text-2xl font-semibold px-2 py-1">
            <p className="text-xl">Note</p>
            <IoCloseSharp
              onClick={() => {
                setInputDiv("hidden");
              }}
              className="cursor-pointer"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              name="title"
              className="px-3 py-2 rounded w-full bg-gray-700 placeholder:font-bold"
              value={data.title}
              onChange={(e) => {
                setData({ ...data, title: e.target.value });
              }}
            />
            <textarea
              name="description"
              placeholder="Description"
              rows={10}
              className="px-3 py-2 rounded w-full bg-gray-700 my-3 placeholder:font-bold"
              id=""
              value={data.description}
              onChange={(e) => {
                setData({ ...data, description: e.target.value });
              }}
            ></textarea>
            <button
              type="submit"
              className="px-3 py-2 bg-sky-500 rounded-lg font-semibold"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Inputs;
