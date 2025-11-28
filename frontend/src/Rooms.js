import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "./api";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null); // for click feedback

  useEffect(() => {
    axios.get(`${API_URL}/rooms`).then((res) => {
      setRooms(res.data);
    }).catch(console.error);
  }, []);

  const handleRoomClick = (roomId) => {
    setActiveRoom(roomId); // highlight clicked room

    // Optional: perform additional action when clicked
    // axios.post(`${API_URL}/verify`, { roomId, code: "1234" })
    //   .then(res => console.log(res.data))
    //   .catch(console.error);
  };

  return (
    <div style={{ marginTop: "20px", padding: "20px" }}>
      <h2 style={{ marginBottom: "15px" }}>Available Rooms</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "15px",
        }}
      >
        {rooms.map((room) => (
          <div
            key={room.id}
            onClick={() => handleRoomClick(room.id)}
            style={{
              padding: "10px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
              backgroundColor: activeRoom === room.id ? "#4b6cb7" : "#f0f0f0",
              color: activeRoom === room.id ? "#fff" : "#000",
              textAlign: "center",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.2s all",
            }}
          >
            {room.room_name}
          </div>
        ))}
      </div>
    </div>
  );
}
