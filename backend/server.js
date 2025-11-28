require('dotenv').config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const ROSLIB = require("roslib");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());

// ======================= LOGIN =======================
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, data) => {
        if (err) return res.json({ error: err });
        if (data.length > 0) {
            res.json({ success: true, message: "Login success" });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    });
});

// ======================= GET ROOMS =======================
app.get("/rooms", (req, res) => {
    const sql = "SELECT * FROM rooms";
    db.query(sql, (err, data) => {
        if (err) return res.json({ error: err });
        res.json(data);
    });
});

// ======================= VERIFY DELIVERY CODE =======================
app.post("/verify", (req, res) => {
    const { roomId, code } = req.body;

    const sql = "SELECT * FROM rooms WHERE id = ? AND pickup_code = ?";
    db.query(sql, [roomId, code], (err, result) => {
        if (err) return res.json({ error: err });

        if (result.length > 0) {
            res.json({ success: true, message: "Correct pickup code" });
        } else {
            res.json({ success: false, message: "Incorrect code" });
        }
    });
});

// ======================= ROBOT STATE =======================
let robotState = {
    x: 0.0,
    y: 0.0,
    yaw: 0.0,
    linear: 0.0,
    angular: 0.0
};

// ======================= CONNECT TO ROS 2 =======================
const ros = new ROSLIB.Ros({
    url: "ws://localhost:9090"  // rosbridge websocket
});

ros.on("connection", () => console.log("✅ Connected to ROS 2 WebSocket"));
ros.on("error", (err) => console.error("❌ Error connecting to ROS 2:", err));

// Subscribe to robot pose
const robotPose = new ROSLIB.Topic({
    ros: ros,
    name: "/robot/pose",
    messageType: "geometry_msgs/Pose" // adjust if different
});

robotPose.subscribe((msg) => {
    robotState.x = msg.position.x;
    robotState.y = msg.position.y;
    // simple yaw from quaternion (z only for 2D)
    robotState.yaw = msg.orientation.z;
});

// Subscribe to robot velocity
const robotVel = new ROSLIB.Topic({
    ros: ros,
    name: "/robot/cmd_vel",
    messageType: "geometry_msgs/Twist"
});

robotVel.subscribe((msg) => {
    robotState.linear = msg.linear.x;
    robotState.angular = msg.angular.z;
});

// ======================= SOCKET.IO LIVE UPDATES =======================
setInterval(() => {
    io.emit("robot_state", robotState);
}, 100); // update every 100ms

// ======================= HTTP ENDPOINTS =======================
// GET robot status
app.get("/robot/status", (req, res) => {
    res.json(robotState);
});

// POST robot velocity command (optional: also publish to ROS 2)
app.post("/robot/cmd_vel", (req, res) => {
    const { linear, angular } = req.body;

    if (linear === undefined || angular === undefined) {
        return res.status(400).json({ error: "Missing linear/angular fields" });
    }

    robotState.linear = linear;
    robotState.angular = angular;

    // publish to ROS 2 cmd_vel
    const cmdVelTopic = new ROSLIB.Topic({
        ros: ros,
        name: "/robot/cmd_vel",
        messageType: "geometry_msgs/Twist"
    });

    const twistMsg = new ROSLIB.Message({
        linear: { x: linear, y: 0.0, z: 0.0 },
        angular: { x: 0.0, y: 0.0, z: angular }
    });

    cmdVelTopic.publish(twistMsg);
    console.log("✅ cmd_vel published:", twistMsg);

    res.json({ success: true });
});

// ======================= START SERVER =======================
server.listen(4000, "0.0.0.0", () => {
    console.log("🚀 Server running on http://0.0.0.0:4000");
});
