import React, { useState } from "react";
import RobotDashboard from "./RobotDashboard"; // your improved robot panel
import Rooms from "./Rooms";                    // your rooms component
import homeImg from "./robot_model3.png";      // robot image

export default function AppDashboard() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* === TABS === */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("home")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "home" ? "#4b6cb7" : "#ccc",
            color: activeTab === "home" ? "#fff" : "#333",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab("main")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "main" ? "#4b6cb7" : "#ccc",
            color: activeTab === "main" ? "#fff" : "#333",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Main
        </button>
      </div>

      {/* === TAB CONTENT === */}
      <div>
        {activeTab === "home" && (
          <div style={{ textAlign: "center" }}>
            <h1 style={{ marginBottom: "10px" }}>My Robot Project</h1>
            <p style={{ marginBottom: "20px", color: "#555" }}>Created by: Your Name</p>
            <img
              src={homeImg}
              alt="Robot Model 3"
              style={{ maxWidth: "400px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
            />
          </div>
        )}

        {activeTab === "main" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
            <div>
              <RobotDashboard />
            </div>
            <div>
              <Rooms />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
