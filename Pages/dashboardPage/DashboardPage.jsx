import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../componet/Header/Header";
import "./DashboardPage.scss";

function DashboardPage({ history }) {
  const [canvases, setCanvases] = useState([]);
  const [newCanvasTitle, setNewCanvasTitle] = useState("");

  useEffect(() => {
    fetchCanvases();
  }, []);

  const fetchCanvases = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3000/canvases", {
        headers: { Authorization: token },
      });
      setCanvases(response.data);
      saveCanvasesToSession(response.data);
    } catch (error) {
      console.error("Error fetching canvases", error);
    }
  };

  const saveCanvasesToSession = (updatedCanvases) => {
    sessionStorage.setItem("canvases", JSON.stringify(updatedCanvases));
  };

  const handleCreateCanvas = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:3000/canvases",
        { title: newCanvasTitle },
        { headers: { Authorization: token } }
      );
      const updatedCanvases = [...canvases, response.data];
      setCanvases(updatedCanvases);
      saveCanvasesToSession(updatedCanvases);
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
      await axios.delete(`http://localhost:3000/canvases/${id}`, {
        headers: { Authorization: token },
      });
      const updatedCanvases = canvases.filter((canvas) => canvas.id !== id);
      setCanvases(updatedCanvases);
      saveCanvasesToSession(updatedCanvases);
    } catch (error) {
      console.error("Error deleting canvas", error);
    }
  };

  return (
    <div className="dashboard-page">
      <Header />
      <h2 className="dashboard-welcome">Welcome, User</h2>
      <div className="dashboard-container">
        <div className="create-canvas">
          <input
            className="create-canvas-input"
            type="text"
            value={newCanvasTitle}
            onChange={(e) => setNewCanvasTitle(e.target.value)}
            placeholder="New Canvas Title"
          />
        </div>
        <h2 className="old-projects-heading">Old Projects</h2>
        <div className="canvas-list">
          {canvases.map((canvas) => (
            <div key={canvas.id} className="canvas-item">
              <h3>{canvas.title}</h3>
              <div className="canvas-buttons">
                <button
                  className="edit-canvas-button"
                  onClick={() => handleEditCanvas(canvas.id)}
                >
                  Edit Canvas
                </button>
                <button
                  className="delete-canvas-button"
                  onClick={() => handleDeleteCanvas(canvas.id)}
                >
                  Delete Canvas
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
