import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Important = () => {
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchImportant = async () => {
      try {
        const response = await axios.get("/v2/all-important-note");
        if (response.data) {
          setNotes(response.data.data.notes);
        } else {
          console.error("Notes data is not available in the response.");
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
        navigate("/login");
      }
    };
    fetchImportant();
  }, []);

  return (
    <div>
      <div className="px-4 py-1">
        <h1 className="text-xl font-bold">Important Task</h1>
      </div>
      <Card notes={notes} setNotes={setNotes} addIcon="hide" />
    </div>
  );
};

export default Important;
