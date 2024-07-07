import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../componet/Header/Header";
import "./DashboardPage.scss";

function DashboardPage() {
  const [canvases, setCanvases] = useState([]);
  const [newCanvasTitle, setNewCanvasTitle] = useState("");

  const fetchCanvases = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3000/canvases", {
        headers: { Authorization: token },
      });
      setCanvases(response.data);
    } catch (error) {
      console.error("Error fetching canvases", error);
    }
  };

  useEffect(() => {
    fetchCanvases();
  }, []);

  const handleCreateCanvas = async () => {
    const token = sessionStorage.getItem("token");
    try {
      setCanvases([...canvases, response.data]);
      setNewCanvasTitle("");
    } catch (error) {
      console.error("Error creating canvas", error);
    }
  };

  const handleEditCanvas = (id) => {
    history.push(`/canvas/${id}`);

    console.log(`Edit canvas with id: ${id}`);
  };

  const handleDeleteCanvas = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/canvas/${id}`, {
        headers: { Authorization: token },
      });
      setCanvases(canvases.filter((canvas) => canvas.id !== id));
    } catch (error) {
      console.error("Error deleting canvas", error);
    }
  };

  return (
    <div className="dbp-container__create">
      <Header />
      <h2 className="dbp__welcome">Welcome, {"User"}</h2>
      <div className="dbp__container">
        <input
          className="dbp__create"
          type="text"
          value={newCanvasTitle}
          onChange={(e) => setNewCanvasTitle(e.target.value)}
          placeholder="New Canvas Title"
        />
        <button className="dbp__create-new" onClick={handleCreateCanvas}>
          Create a New Canvas
        </button>
        <h2>Old Projects</h2>
        <div>
          {canvases.map((canvas) => (
            <div key={canvas.id}>
              <h3>{canvas.title}</h3>
              <button onClick={() => handleEditCanvas(canvas.id)}>
                Edit Canvas
              </button>
              <button onClick={() => handleDeleteCanvas(canvas.id)}>
                Delete Canvas
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
