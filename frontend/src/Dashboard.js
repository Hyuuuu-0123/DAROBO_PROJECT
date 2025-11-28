import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import API_URL from "./api";
import Rooms from "./Rooms";
import homeImg from "./robot-removebg-preview.png";
import logoHCMUTE from "./Logo-DH-Su-Pham-Ky-Thuat-TP-Ho-Chi-Minh-HCMUTE.webp";
import logokhoa from "./fie-removebg-preview.png";
import logoACIS from "./Logo_ACISLab.png";

// ================= ROBOT MAP COMPONENT =================
function RobotMap({ x, y, yaw, trajectory }) {
  const width = 700;
  const height = 490;

  const scaleX = (val) => (val + 5) / 10 * width;
  const scaleY = (val) => height - (val + 5) / 10 * height;

  return (
    <svg width={width} height={height} style={{ border: "2px solid #333", borderRadius: "12px" }}>
      <polyline
        points={trajectory.map(p => `${scaleX(p.x)},${scaleY(p.y)}`).join(" ")}
        fill="none"
        stroke="#4b6cb7"
        strokeWidth="3"
      />
      <g transform={`translate(${scaleX(x)},${scaleY(y)}) rotate(${(yaw * 180 / Math.PI) || 0})`}>
        <polygon points="-10,-7 10,0 -10,7" fill="#b92b27" />
      </g>
    </svg>
  );
}

// ================= DASHBOARD =================
export default function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("home");
  const [robot, setRobot] = useState({ x: 0, y: 0, yaw: 0, linear: 0, angular: 0 });
  const [trajectory, setTrajectory] = useState([]);
  const [linear, setLinear] = useState(0);
  const [angular, setAngular] = useState(0);

  const btnStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#182848",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  };

  // ================= SOCKET.IO =================
  useEffect(() => {
    const socket = io(API_URL);
    socket.on("robot_state", (data) => {
      setRobot(data);
      setTrajectory(prev => [...prev.slice(-100), { x: data.x, y: data.y }]);
    });
    return () => socket.disconnect();
  }, []);

  const quickCmd = (v, w) => {
    axios.post(`${API_URL}/robot/cmd_vel`, { linear: v, angular: w });
  };

  // ================= JSX =================
  return (
    <div style={{ display: "flex", height: "100vh", background: "#eef2f3" }}>
      {/* --- SIDEBAR --- */}
      <div style={{
        width: "250px",
        background: "#1f2428",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        boxShadow: "4px 0 15px rgba(0,0,0,0.3)",
      }}>
        <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>Menu</h2>
        <button onClick={() => setActiveTab("home")}
          style={{
            padding: "18px",
            background: activeTab === "home" ? "#4b6cb7" : "#2c3238",
            border: "none",
            borderRadius: "10px",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
          }}>🏠 Home</button>
        <button onClick={() => setActiveTab("main")}
          style={{
            padding: "18px",
            background: activeTab === "main" ? "#4b6cb7" : "#2c3238",
            border: "none",
            borderRadius: "10px",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
          }}>📌 Main</button>
        <button onClick={onLogout}
          style={{
            marginTop: "auto",
            padding: "18px",
            background: "#b92b27",
            border: "none",
            borderRadius: "10px",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
          }}>🔙 Logout</button>
      </div>

      {/* --- MAIN AREA --- */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* --- HEADER --- */}
        <div style={{
          width: "100%",
          padding: "20px 40px",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(6px)",
          borderBottom: "1px solid rgba(200,200,200,0.6)",
          boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}>
          <div style={{ position: "absolute", left: "40px", display: "flex", alignItems: "center", gap: "40px" }}>
            <img src={logoHCMUTE} style={{ height: "80px" }} alt="" />
            <img src={logokhoa} style={{ height: "80px" }} alt="" />
          </div>
          <div style={{ textAlign: "center" }}>
            <span style={{ display: "block", fontSize: "22px", fontWeight: 600, fontFamily: "Times New Roman, serif" }}>
              HO CHI MINH UNIVERSITY OF TECHNOLOGY AND EDUCATION
            </span>
            <span style={{ display: "block", fontSize: "22px", fontWeight: 600, fontFamily: "Times New Roman, serif" }}>
              FACULTY OF INTERNATIONAL AND EDUCATION
            </span>
            <span style={{ display: "block", fontSize: "22px", fontWeight: 600, fontFamily: "Times New Roman, serif" }}>
              ADVANCED CONTROL INTELLIGENT SYSTEM LABORATORY
            </span>
          </div>
          <div style={{ position: "absolute", right: "90px", height: "80px", display: "flex", alignItems: "center" }}>
            <img src={logoACIS} style={{ height: "100%" }} alt="" />
          </div>
        </div>

        {/* --- BODY CONTENT --- */}
        <div style={{ padding: "25px", overflowY: "auto", flex: 1 }}>
          {/* --- HOME TAB --- */}
          {activeTab === "home" && (
            <div style={{ textAlign: "center", fontSize: "30px", fontWeight: 600, fontFamily: "Times New Roman, serif" }}>
              <h1>Design and development of a differential-drive two-wheels robot for mapping and path trajectory planning</h1>
              <div style={{ display: "flex", alignItems: "flex-start", margin: "50px", gap: "50px" }}>
                <img src={homeImg} alt="Robot Model" style={{ maxWidth: "800px", borderRadius: "12px" }} />
                <table style={{ textAlign: "left", fontSize: "30px", fontWeight: 600, fontFamily: "Times New Roman, serif", borderSpacing: "20px 10px" }}>
                  <tbody>
                    <tr><td>Lecturer: Ph.D Tran Manh Son</td></tr>
                    <tr><td>1. Nguyen Huynh Duc Anh</td><td>- 22151005</td></tr>
                    <tr><td>2. Ngo Gia Huy</td><td>- 22151017</td></tr>
                    <tr><td>3. Le Dinh Duc Vinh</td><td>- 22151045</td></tr>
                    <tr><td>ROBOT FUNCTIONALITY</td></tr>
                    <tr><td>- Navigate predefined paths</td></tr>
                    <tr><td>- Mapping and trajectory planning</td></tr>
                    <tr><td>- Obstacle detection and avoidance</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* --- MAIN TAB --- */}
          {activeTab === "main" && (
            <div style={{ display: "flex", gap: "30px"}}>
              {/* LEFT COLUMN */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1, height: "100%" }}>
                {/* Orientation + Velocity + Rooms */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px", overflowY: "auto" }}>
                  <h2>Orientation🎯</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "15px", marginBottom: "20px" }}>
                    {[
                      { label: "X", value: robot.x },
                      { label: "Y", value: robot.y },
                      { label: "Yaw", value: robot.yaw }
                    ].map(stat => (
                      <div key={stat.label} style={{ padding: "15px", borderRadius: "12px", backgroundColor: "#f0f4f8", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", textAlign: "center", fontWeight: "600" }}>
                        <p style={{ marginBottom: "5px" }}>{stat.label}</p>
                        <p style={{ fontSize: "18px" }}>{typeof stat.value === "number" ? stat.value.toFixed(3) : stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <h2>Velocity🚀</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "15px", marginBottom: "20px" }}>
                    {[
                      { label: "Linear Vel", value: robot.linear + " m/s" },
                      { label: "Angular Vel", value: robot.angular + " rad/s" }
                    ].map(stat => (
                      <div key={stat.label} style={{ padding: "15px", borderRadius: "12px", backgroundColor: "#f0f4f8", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", textAlign: "center", fontWeight: "600" }}>
                        <p style={{ marginBottom: "5px" }}>{stat.label}</p>
                        <p style={{ fontSize: "18px" }}>{typeof stat.value === "number" ? stat.value.toFixed(3) : stat.value}</p>
                      </div>
                    ))}
                  </div>

                  
                </div>

                {/* Control Panel at bottom */}
                <div style={{ marginTop: "auto" }}>
                  <h2>Robot Control Panel</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "80px 80px 80px", gridTemplateRows: "80px 80px 80px", justifyContent: "center", gap: "10px" }}>
                    <div></div>
                    <button onClick={() => quickCmd(0.3, 0)} style={{ ...btnStyle, width: "60px", height: "60px" }}>W</button>
                    <div></div>

                    <button onClick={() => quickCmd(0, 1.0)} style={{ ...btnStyle, width: "60px", height: "60px" }}>A</button>
                    <button onClick={() => quickCmd(0, 0)} style={{ ...btnStyle, width: "60px", height: "60px", backgroundColor: "#b92b27" }}>S</button>
                    <button onClick={() => quickCmd(0, -1.0)} style={{ ...btnStyle, width: "60px", height: "60px" }}>D</button>

                    <div></div>
                    <button onClick={() => quickCmd(-0.3, 0)} style={{ ...btnStyle, width: "60px", height: "60px" }}>X</button>
                    <div></div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
                <Rooms />
                <h2>Robot Trajectory Map</h2>
                <RobotMap x={robot.x} y={robot.y} yaw={robot.yaw} trajectory={trajectory} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
