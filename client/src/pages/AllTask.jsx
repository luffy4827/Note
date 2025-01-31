import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { IoMdAddCircle } from "react-icons/io";
import Inputs from "../components/Inputs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllTask = () => {
  const [inputDiv, setInputDiv] = useState("hidden");

  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  // Fetch data from the server when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("/v2/get-all-notes");
        if (response.data && response.data.data.notes) {
          setNotes(response.data.data.notes);
          // console.log(response.data); // Check if notes are being fetched correctly
        } else {
          console.error("Notes data is not available in the response.");
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
        navigate("/login");
      }
    };

    fetchNotes();
  }, []);

  return (
    <>
      <div>
        <div className="w-full flex justify-between px-4 py-1 ">
          <h1 className="text-xl font-bold">All Task</h1>
          <button
            onClick={() => {
              setInputDiv("fixed");
            }}
          >
            <IoMdAddCircle className="text-4xl fill-gray-100 hover:fill-gray-400 transition-all duration-200" />
          </button>
        </div>
        <Card
          notes={notes}
          inputDiv={inputDiv}
          setNotes={setNotes}
          setInputDiv={setInputDiv}
        />
      </div>
      <Inputs inputDiv={inputDiv} setInputDiv={setInputDiv} />
    </>
  );
};

export default AllTask;
