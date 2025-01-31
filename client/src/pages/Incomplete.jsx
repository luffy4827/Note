import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Incomplete = () => {
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchIncomplete = async () => {
      try {
        const response = await axios.get("/v2/all-incomp-note");
        if (response.data && response.data.data && response.data.data.notes) {
          setNotes(response.data.data.notes);
        } else {
          console.error("Notes data is not available in the response.");
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
        navigate("/login");
      }
    };
    fetchIncomplete();
  }, []);

  return (
    <div>
      <div className="px-4 py-1">
        <h1 className="text-xl font-bold">Incomplete Tasks</h1>
      </div>
      <Card notes={notes} setNotes={setNotes} addIcon="hide" />
    </div>
  );
};

export default Incomplete;
