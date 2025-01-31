import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Completed = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const response = await axios.get("/v2/all-completed-note");
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
    fetchCompleted();
  }, []);

  return (
    <div>
      <div className="px-4 py-1">
        <h1 className="text-xl font-bold">Completed Tasks</h1>
      </div>
      <Card notes={notes} setNotes={setNotes} addIcon="hide" />
    </div>
  );
};

export default Completed;
