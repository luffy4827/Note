import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";

const Card = (props) => {
  const { notes, setNotes } = props;

  const handleComplete = async (id, completed) => {
    try {
      const response = await axios.put(`/v2/update-comp-note/${id}`, {});
      // console.log(response.data);

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, completed: !completed } : note
        )
      );
      toast.success(`${response.data.message}`);
    } catch (error) {
      console.error(error);
      toast.error("Sorry something went wrong...");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/v2/delete-note/${id}`, {});
      // console.log(response.data);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      toast.success(`${response.data.message}`);
    } catch (error) {
      console.error(error);
      toast.error("Sorry something went wrong...");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-3 p-4">
      {notes.length > 0 ? (
        notes.map((item, i) => (
          <div
            key={i}
            className="flex flex-col justify-between bg-gray-800 rounded-lg p-4"
          >
            <div className="">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-gray-300 my-2">{item.description}</p>
            </div>
            <div className="mt-4 w-full flex justify-between">
              <button
                className={`cursor-pointer ${
                  item.completed === true ? "bg-emerald-500" : "bg-red-400"
                } p-2 rounded-lg font-semibold flex-1`}
                onClick={() => handleComplete(item._id, item.completed)}
              >
                {item.completed === true ? (
                  <p className="font-semibold text-lg cursor-pointer">
                    Completed
                  </p>
                ) : (
                  <p className="font-semibold text-lg cursor-pointer">
                    Incomplete
                  </p>
                )}
              </button>
              <div className="flex justify-around flex-1 text-xl">
                <button>
                  <FaRegHeart className="fill-red-500 cursor-pointer" />
                </button>
                <button>
                  <FaEdit className="cursor-pointer" />
                </button>
                <button onClick={() => handleDelete(item._id)}>
                  <MdDelete className="cursor-pointer" />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No notes available</p>
      )}

      {props.addIcon === "hide" ? null : (
        <button
          onClick={() => {
            props.setInputDiv("fixed");
          }}
          className="flex flex-col justify-center items-center bg-gray-800 rounded-lg p-4"
        >
          <IoMdAddCircle className="text-6xl mt-5" />
          <h3 className="text-xl font-bold mt-3"> Add Tasks</h3>
        </button>
      )}
    </div>
  );
};

export default Card;
