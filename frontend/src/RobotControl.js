import React, { useState } from "react";
import axios from "axios";
import API_URL from "./api";

export default function RobotControl() {
  const [linear, setLinear] = useState(0);
  const [angular, setAngular] = useState(0);
  const [status, setStatus] = useState("");

  const sendCommand = async () => {
    try {
      await axios.post(`${API_URL}/robot/cmd`, {
        linear,
        angular,
      });
      setStatus("Command sent!");
    } catch (error) {
      setStatus("ERROR sending command");
    }
  };

  return (
    <div style={{ padding: "20px", background: "#eef" }}>
      <h2>Robot Control Panel</h2>

      <div>
        <label>Linear Velocity (m/s): </label>
        <input
          type="number"
          value={linear}
          step="0.1"
          onChange={(e) => setLinear(parseFloat(e.target.value))}
        />
      </div>

      <div>
        <label>Angular Velocity (rad/s): </label>
        <input
          type="number"
          value={angular}
          step="0.1"
          onChange={(e) => setAngular(parseFloat(e.target.value))}
        />
      </div>

      <button
        onClick={sendCommand}
        style={{ marginTop: "10px", padding: "8px 20px" }}
      >
        Send Command
      </button>

      <p>{status}</p>

      <hr />

      <h3>Quick Controls</h3>

      <div>
        <button onClick={() => { setLinear(0.3); setAngular(0); sendCommand(); }}>Forward</button>
        <button onClick={() => { setLinear(-0.3); setAngular(0); sendCommand(); }}>Backward</button>
      </div>

      <div>
        <button onClick={() => { setLinear(0); setAngular(0.5); sendCommand(); }}>Left</button>
        <button onClick={() => { setLinear(0); setAngular(-0.5); sendCommand(); }}>Right</button>
      </div>

      <div>
        <button onClick={() => { setLinear(0); setAngular(0); sendCommand(); }}>STOP</button>
      </div>
    </div>
  );
}
