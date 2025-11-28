import { useNavigate } from "react-router-dom";
import logoHCMUTE from "./Logo-DH-Su-Pham-Ky-Thuat-TP-Ho-Chi-Minh-HCMUTE.webp";
import logokhoa from "./fie-removebg-preview.png";
import logoACIS from "./Logo_ACISLab.png";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#eef2f3" }}>
      {/* --- SIDEBAR --- */}
      <div
        style={{
          width: "250px",
          background: "#1f2428",
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          boxShadow: "4px 0 15px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>Menu</h2>

        <button
          style={{
            padding: "18px",
            background: "#2c3238",
            border: "none",
            borderRadius: "10px",
            color: "white",
            cursor: "pointer",
            fontSize: "18px",
            transition: "0.2s",
          }}
        >
          🏠 Home
        </button>

        <button
          style={{
            padding: "18px",
            background: "#2c3238",
            border: "none",
            borderRadius: "10px",
            color: "white",
            cursor: "pointer",
            fontSize: "18px",
            transition: "0.2s",
          }}
        >
          📌 Main
        </button>

        <button
          onClick={handleLogout}
          style={{
            marginTop: "auto",
            padding: "18px",
            background: "#b92b27",
            border: "none",
            borderRadius: "10px",
            color: "white",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          🔙 Logout
        </button>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div
        style={{
          flex: 1,
          backgroundImage: "url('/background.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          padding: "0",
          margin: "0",
        }}
      >
        {/* --- HEADER --- */}
        <div
          style={{
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
          }}
        >
          {/* LOGO TRÁI */}
          <div
            style={{
              position: "absolute",
              left: "40px",
              display: "flex",
              alignItems: "center",
              gap: "40px",
            }}
          >
            <img
              src={logoHCMUTE}
              alt="HCMUTE Logo"
              style={{ height: "80px", width: "auto", objectFit: "contain", borderRadius: "5px" }}
            />
            <img
              src={logokhoa}
              alt="Khoa Logo"
              style={{ height: "80px", width: "auto", objectFit: "contain", borderRadius: "5px" }}
            />
          </div>

          {/* TEXT GIỮA */}
          <div style={{ textAlign: "center" }}>
            <span style={{ display: "block", fontSize: "24px", fontWeight: 600, color: "#222" }}>
              HO CHI MINH UNIVERSITY OF TECHNOLOGY AND EDUCATION
            </span>
            <span style={{ display: "block", fontSize: "24px", fontWeight: 600, color: "#222" }}>
              FACULTY OF INTERNATIONAL AND EDUCATION
            </span>
            <span style={{ display: "block", fontSize: "24px", fontWeight: 600, color: "#222" }}>
              ADVANCED CONTROL INTELLIGENT SYSTEM LABORATORY
            </span>
          </div>

          {/* LOGO PHẢI */}
          <div
            style={{
              position: "absolute",
              right: "90px",
              display: "flex",
              alignItems: "center",
              height: "80px",
            }}
          >
            <img
              src={logoACIS}
              alt="ACIS Logo"
              style={{ height: "100%", width: "auto", objectFit: "contain" }}
            />
          </div>
        </div>

        {/* --- BODY GIỚI THIỆU --- */}
      </div>
    </div>
  );
}
