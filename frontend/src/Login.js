

import React, { useState } from "react";
import axios from "axios";
import logoHCMUTE from "./hcmute_logo.png";
import backgroundImg from "./background2.jpeg";
import API_URL from "./api";

export default function Login({ onLoginSuccess }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = async () => {
    if (!user || !pass) {
      setMessage("❌ Please enter username and password");
      setSuccess(false);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${API_URL}/login`, {
        username: user,
        password: pass,
      });

      if (res.data.success) {
        setMessage("✅ Login successful!");
        setSuccess(true);

        if (typeof onLoginSuccess === "function") onLoginSuccess();
      } else {
        setMessage("❌ Wrong username or password!");
        setSuccess(false);
        setPass(""); 
      }
    } catch (err) {
      setMessage("❌ Server error — cannot connect to backend");
      setSuccess(false);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${backgroundImg}) center/cover no-repeat`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 255)",
          padding: "40px 30px",
          borderRadius: "20px",
          width: "350px",
          textAlign: "center",
          boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Logo */}
        <img
          src={logoHCMUTE}
          alt="HCMUTE Logo"
          style={{
            width: "250px",
            marginBottom: "10px",
          }}
        />

        <h2
          style={{
            marginBottom: "25px",
            fontSize: "28px",
            fontWeight: "700",
            color: "#333",
            letterSpacing: "1px",
          }}
        >
          LOGIN
        </h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            width: "90%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            width: "90%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(90deg, #4b6cb7, #182848)",
            color: "white",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "700",
            transition: "0.3s",
            opacity: loading ? 0.7 : 1,
          }}
          onMouseOver={(e) => (e.target.style.opacity = loading ? 0.7 : 0.85)}
          onMouseOut={(e) => (e.target.style.opacity = loading ? 0.7 : 1)}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Message */}
        {message && (
          <p
            style={{
              marginTop: "15px",
              fontWeight: "600",
              color: success ? "green" : "#ff3333",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
