import React, { useState } from "react";
import axios from "axios";
import API_URL from "./api";

export default function Verify() {
  const [roomId, setRoomId] = useState("");
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const verifyCode = async () => {
    const res = await axios.post(`${API_URL}/verify`, {
      roomId,
      code
    });

    setMsg(res.data.message);
  };

  return (
    <div style={{ 
      background: "rgba(150, 200, 120, 255)",
      marginTop: "20px" }}>
      <h2>Verify Pickup Code</h2>

      <input
        placeholder="Room ID"
        onChange={(e) => setRoomId(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        placeholder="Pickup Code"
        onChange={(e) => setCode(e.target.value)}
        style={{ marginRight: "10px" }}
      />

      <button onClick={verifyCode}>Verify</button>
      <p>{msg}</p>
    </div>
  );
}

